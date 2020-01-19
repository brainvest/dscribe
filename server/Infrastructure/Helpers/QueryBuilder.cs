using Brainvest.Dscribe.Abstractions.Metadata;
using Brainvest.Dscribe.Abstractions.Models;
using Brainvest.Dscribe.Abstractions.Models.ReadModels;
using Brainvest.Dscribe.Helpers.SpecializedTuples;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;

namespace Brainvest.Dscribe.Helpers
{
	public static class QueryBuilder
	{
		public static IQueryable<TEntity> SortQuery<TEntity>(IOrderRequest request, IQueryable<TEntity> query, IEntityTypeMetadata entityTypeMetadata)
			where TEntity : class
		{
			var ordered = false;
			if (request.Order != null)
			{
				foreach (var order in request.Order)
				{
					query = query.Order(order.PropertyName, order.IsDescending, ordered);
					ordered = true;
				}
			}
			if (!ordered)
			{
				query = query.Order(entityTypeMetadata.GetPrimaryKey().Name, true, ordered);
			}
			return query;
		}

		public static IQueryable<TEntity> PageQuery<TEntity>(IPageRequest request, IQueryable<TEntity> query)
			where TEntity : class
		{
			if (request.StartIndex.HasValue && request.StartIndex.Value > 0)
			{
				query = query.Skip(request.StartIndex.Value);
			}
			query = query.Take(Math.Min(request.Count ?? 100, 100));
			return query;
		}

		public static IQueryable<TEntity> CreateSelectQuery<TEntity>(IFilterModel<TEntity> request, DbContext context)
			where TEntity : class
		{
			IQueryable<TEntity> query = context.Set<TEntity>();
			if (request?.Filters != null)
			{
				foreach (var filter in request.Filters)
				{
					query = query.Where(filter);
				}
			}
			return query;
		}

		public static IQueryable GroupQuery<TEntity>(IGroupingRequest request, IQueryable<TEntity> query, out System.Type grouppedItemType) where TEntity : class
		{
			var entityParam = Expression.Parameter(typeof(TEntity), "r");
			var groupExpressions = request.GroupBy.Select(g => ExpressionBuilder.Path(g.PropertyName, entityParam)).ToList();
			if (!groupExpressions.Any())
			{
				groupExpressions.Add(Expression.Lambda(Expression.Constant(1), entityParam));
			}
			var groupByExpression = CreateDynamicSelect(query, entityParam, groupExpressions);
			var keyType = groupByExpression.GetType().GetTypeInfo().GetGenericArguments().Single().GetTypeInfo().GetGenericArguments().Last();
			var groupByMethod = typeof(Queryable).GetTypeInfo().GetMethods().Single(x => x.Name == nameof(Queryable.GroupBy) && x.GetParameters().Length == 2)
				.MakeGenericMethod(typeof(TEntity), keyType);
			var groupped = groupByMethod.Invoke(null, new object[] { query, groupByExpression });
			var itemType = groupped.GetType().GetTypeInfo().GetGenericArguments().Single();
			var grouppedParam = Expression.Parameter(itemType);
			var selectExpression = typeof(QueryBuilder).GetTypeInfo().GetMethod(nameof(CreateDynamicSelect), BindingFlags.Static | BindingFlags.NonPublic).MakeGenericMethod(itemType)
				.Invoke(null, new object[]{ groupped, grouppedParam,
				request.GroupBy.Select((x, i) => ExpressionBuilder.Path($"Key.Item{i+1}" , grouppedParam))
				.Union((request.Aggregations?? Enumerable.Empty<AggregationInfo>()).Select(x => ExpressionBuilder.GetSimpleAggregate(x, grouppedParam))) });
			var resultType = selectExpression.GetType().GetTypeInfo().GetGenericArguments().Single().GetTypeInfo().GetGenericArguments().Last();
			var selectedMethod = typeof(Queryable).GetTypeInfo().GetMethods().Single(x => x.Name == nameof(Queryable.Select) &&
					x.GetParameters()[1].ParameterType.GetTypeInfo().GetGenericArguments().Single().GetTypeInfo().GetGenericArguments().Length == 2)
				.MakeGenericMethod(itemType, resultType);
			var result = selectedMethod.Invoke(null, new object[] { groupped, selectExpression }) as IQueryable<object>;
			grouppedItemType = resultType;
			return result;
		}

		private static LambdaExpression CreateDynamicSelect<TInput>(IQueryable<TInput> query, ParameterExpression param, IEnumerable<LambdaExpression> propertySelectors)
		{
			var selectors = propertySelectors.ToList();
			var tupleType = STuple.GetTupleType(selectors.Select(x => x.ReturnType).ToArray());
			var binds = selectors.Select((x, i) => Expression.Bind(tupleType.GetTypeInfo().GetProperty($"Item{i + 1}"), x.Body)).ToList();
			var init = Expression.MemberInit(Expression.New(tupleType), binds);
			return Expression.Lambda(init, param);
		}

		public static Expression<Func<TEntity, IdAndNameResponseItem<Tkey>>> GetIdAndNameSelectionExpression<TEntity, Tkey>(IEntityTypeMetadata entityTypeMetadata)
		{
			var param = Expression.Parameter(typeof(TEntity), "s");
			var entityIdExpression = Expression.Property(param, entityTypeMetadata.GetPrimaryKey().Name); //TODO:Hardcoded Primary key name
			var idType = entityIdExpression.Type;
			var modelType = typeof(IdAndNameResponseItem<>).MakeGenericType(idType);
			var idAssignment = Expression.Bind(modelType.GetProperty(nameof(IdAndNameResponseItem<Tkey>.Id)), entityIdExpression);
			var displayNamePath = entityTypeMetadata.DisplayNameProperty;
			if (string.IsNullOrWhiteSpace(displayNamePath))
			{
				displayNamePath = nameof(IdAndNameResponseItem<Tkey>.Id);
			}
			Expression path = param;
			foreach (var part in displayNamePath.Split('.'))
			{
				path = Expression.Property(path, part);
			}
			if (path.Type != typeof(string))
			{
				var type = path.Type;
				if (type != typeof(double) && type != typeof(double?) && type != typeof(decimal) && type != typeof(decimal?))
				{
					path = Expression.Convert(path, typeof(decimal?));
					type = typeof(decimal?);
				}
				if (type.IsValueType && !type.IsGenericType)
				{
					type = typeof(Nullable<>).MakeGenericType(type);
					path = Expression.Convert(path, type);
				}
				path = Expression.Call(path, type.GetMethod(nameof(Object.ToString), Type.EmptyTypes));
			}
			var nameAssignment = Expression.Bind(typeof(NameResponseItem).GetProperty(nameof(NameResponseItem.DisplayName)), path);
			var selection = Expression.MemberInit(Expression.New(modelType), idAssignment, nameAssignment);
			return Expression.Lambda<Func<TEntity, IdAndNameResponseItem<Tkey>>>(selection, param);
		}

		public static LambdaExpression GetExpressionValueSelection<TEntity, TKey>(IEnumerable<PropertyInfoModel> properties)
		{
			var param = Expression.Parameter(typeof(TEntity), "s");
			var entityIdExpression = Expression.Property(param, nameof(IdAndNameResponseItem<TKey>.Id)); //TODO:Hardcoded Primary key name
			var idType = entityIdExpression.Type;
			var types = new List<Type> { idType };
			var selectionExpressions = new List<Expression> { entityIdExpression };
			foreach (var property in properties)
			{
				Expression body;
				if (property.LambdaExpression != null)
				{
					body = ReplaceParameters(property.LambdaExpression, param).Body;
				}
				else
				{
					Expression path = param;
					foreach (var part in property.Name.Split('.'))
					{
						path = Expression.Property(path, part);
					}
					body = path;
				}
				var type = body.Type;
				if (type.IsValueType && (!type.IsGenericType || type.GetGenericTypeDefinition() != typeof(Nullable<>)))
				{
					type = typeof(Nullable<>).MakeGenericType(type);
				}
				types.Add(type);
				selectionExpressions.Add(body);
			}
			var tupleType = STuple.GetTupleType(types.ToArray());
			var binds = selectionExpressions.Select((x, i) => Expression.Bind(tupleType.GetProperty("Item" + (i + 1)), x)).ToList();
			var selection = Expression.MemberInit(Expression.New(tupleType), binds);
			return Expression.Lambda(selection, param);
		}

		public static LambdaExpression ReplaceParameters(this LambdaExpression expression, params ParameterExpression[] parameters)
		{
			var visitor = new ParameterReplacer(parameters);
			return visitor.Visit(expression) as LambdaExpression;
		}

		public class IdsContainer<TKey> 
		{
			public TKey[] Ids;
		}

		public static Expression<Func<TEntity, bool>> FilterByIds<TEntity, TKey>(TKey[] ids, IEntityTypeMetadata entityTypeMetadata)
		{
			var param = Expression.Parameter(typeof(TEntity), "i");
			var containsMethod = typeof(Enumerable).GetMethods().Single(x => x.Name == nameof(Enumerable.Contains) && x.GetParameters().Length == 2);
			containsMethod = containsMethod.MakeGenericMethod(typeof(TKey));
			var property = Expression.Property(param, entityTypeMetadata.GetPrimaryKey().Name);
			var idsExp = Expression.Field(Expression.Constant(new IdsContainer<TKey> { Ids = ids }), nameof(IdsContainer<TKey>.Ids));
			var call = Expression.Call(containsMethod, idsExp, property);
			var lambda = Expression.Lambda<Func<TEntity, bool>>(call, param);
			return lambda;
		}

		public static Expression<Func<TEntity, bool>> FilterByDisplayName<TEntity>(string start, string displayNameProperty)
		{
			var param = Expression.Parameter(typeof(TEntity), "x");
			var startsWithMethod = typeof(string).GetMethods().Single(x => x.Name == nameof(String.StartsWith) && x.GetParameters().Length == 1 && x.GetParameters().Single().ParameterType == typeof(string));
			Expression path = param;
			foreach (var part in displayNameProperty.Split('.'))
			{
				path = Expression.Property(path, part);
			}
			var startExp = Expression.Constant(start);
			var call = Expression.Call(path, startsWithMethod, startExp);
			var lambda = Expression.Lambda<Func<TEntity, bool>>(call, param);
			return lambda;
		}

		public static IQueryable<T> Order<T>(this IQueryable<T> query, string propertyName, bool isDescending, bool alreadySorted)
		{
			var methodName = alreadySorted ? "ThenBy" : "OrderBy";
			if (isDescending)
			{
				methodName += "Descending";
			}
			var method = typeof(Queryable).GetMethods(BindingFlags.Public | BindingFlags.Static)
				.Single(x => x.Name == methodName && x.GetParameters().Count() == 2);
			var param = Expression.Parameter(typeof(T), "x");
			var property = Expression.Property(param, propertyName);
			var lambda = Expression.Lambda(property, param);
			method = method.MakeGenericMethod(typeof(T), lambda.ReturnType);
			var sorted = method.Invoke(null, new object[] { query, lambda });
			return sorted as IQueryable<T>;
		}

	}
}