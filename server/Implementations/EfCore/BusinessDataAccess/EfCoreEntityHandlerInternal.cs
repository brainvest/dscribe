using Brainvest.Dscribe.Abstractions;
using Brainvest.Dscribe.Abstractions.Models;
using Brainvest.Dscribe.Abstractions.Models.ReadModels;
using Brainvest.Dscribe.Helpers;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace Brainvest.Dscribe.Implementations.EfCore.BusinessDataAccess
{
	public class EfCoreEntityHandlerInternal
	{
		private IImplementationsContainer _implementationsContainer;
		private IEntityValidator _validator;
		private EntityHelper _entityHelper;

		public EfCoreEntityHandlerInternal(
			IImplementationsContainer implementationsContainer,
			IEntityValidator validator,
			EntityHelper entityHelper)
		{
			_implementationsContainer = implementationsContainer;
			_validator = validator;
			_entityHelper = entityHelper;
		}

		private void CheckMigrations()
		{
			if (!_implementationsContainer.InstanceInfo.MigrateDatabase)
			{
				return;
			}
			if (_implementationsContainer.MigrationsExecuted)
			{
				return;
			}
			lock (_implementationsContainer)
			{
				if (_implementationsContainer.MigrationsExecuted)
				{
					return;
				}
				EfCoreHelper.PerformMigrations(() => _implementationsContainer.GetBusinessRepository() as DbContext);
			}
		}

		private async Task<DbContext> GetReadBusinessDbContext()
		{
			CheckMigrations();
			var dbContext = _implementationsContainer.GetBusinessRepository() as DbContext;
			return await Task.FromResult(dbContext);
		}

		private DbContext GetWriteBusinessDbContext()
		{
			CheckMigrations();
			return _implementationsContainer.GetBusinessRepository() as DbContext;
		}

		internal async Task<int> CountByFilterInternal<TEntity>(EntityListRequest<TEntity> request)
	where TEntity : class
		{
			using (var context = await GetReadBusinessDbContext())
			{
				var query = QueryBuilder.CreateSelectQuery(request, context);
				return await query.CountAsync();
			}
		}

		internal async Task<IEnumerable> GetByFilterInternal<TEntity>(EntityListRequest<TEntity> request)
			where TEntity : class
		{
			var metadata = _implementationsContainer.Metadata.Get<TEntity>();
			using (var context = await GetReadBusinessDbContext())
			{
				var query = QueryBuilder.CreateSelectQuery(request, context);
				query = QueryBuilder.SortQuery(request, query, metadata);
				query = QueryBuilder.PageQuery(request, query);
				return await query.ToListAsync();
			}
		}

		internal async Task<int> CountGroupsInternal<TEntity>(GrouppedListRequest<TEntity> request)
			where TEntity : class
		{
			using (var context = await GetReadBusinessDbContext())
			{
				var original = QueryBuilder.CreateSelectQuery(request, context);
				var query = QueryBuilder.GroupQuery(request, original, out var grouppedItemType);

				var countMethod = typeof(EntityFrameworkQueryableExtensions).GetMethods()
					.Single(x => x.Name == nameof(EntityFrameworkQueryableExtensions.CountAsync) && x.GetParameters().Length == 1);
				countMethod = countMethod.MakeGenericMethod(grouppedItemType);
				var task = countMethod.Invoke(null, new object[] { query }) as Task<int>;
				return await task;
			}
		}

		internal async Task<IEnumerable> GetGrouppedInternal<TEntity>(GrouppedListRequest<TEntity> request)
			where TEntity : class
		{
			using (var context = await GetReadBusinessDbContext())
			{
				var original = QueryBuilder.CreateSelectQuery(request, context);
				var query = QueryBuilder.GroupQuery(request, original, out var grouppedItemType);
				//query = SortQuery(request, query);
				//query = PageQuery(request, query);
				var toListMethod = typeof(EntityFrameworkQueryableExtensions).GetMethods()
					.Single(x => x.Name == nameof(EntityFrameworkQueryableExtensions.ToListAsync) && x.GetParameters().Length == 1);
				toListMethod = toListMethod.MakeGenericMethod(grouppedItemType);
				var task = toListMethod.Invoke(null, new object[] { query }) as Task<IEnumerable>;
				return await task;
			}
		}

		internal async Task<ExpressionValueResponse<TKey>> GetExpressionValueInternal<TEntity, TKey>(int[] ids, IEnumerable<PropertyInfoModel> properties)
	where TEntity : class
		{
			var metadata = _implementationsContainer.Metadata.Get<TEntity>();
			using (var context = await GetReadBusinessDbContext())
			{
				IQueryable<TEntity> query = context.Set<TEntity>();
				if (ids != null) //TODO: Dangerous
				{
					var keys = new TKey[ids.Length];
					for (var i = 0; i < ids.Length; i++)
					{
						keys[i] = (TKey)Convert.ChangeType(ids[i], typeof(TKey)); //TODO:Boxing/Unboxing
					}
					query = query.Where(QueryBuilder.FilterByIds<TEntity, TKey>(keys, metadata));
				}
				PrepareExpressions(typeof(TEntity).Name, properties);
				var selectExpression = QueryBuilder.GetExpressionValueSelection<TEntity, TKey>(properties);
				var selectMethod = typeof(Queryable).GetMethods()
					.Single(x => x.Name == nameof(Queryable.Select) && x.GetParameters().Last().ParameterType.GenericTypeArguments.Single().GenericTypeArguments.Length == 2);
				selectMethod = selectMethod.MakeGenericMethod(typeof(TEntity), selectExpression.ReturnType);
				var selected = selectMethod.Invoke(null, new object[] { query, selectExpression });
				var toListMethod = typeof(EntityFrameworkQueryableExtensions).GetMethods()
					.Single(x => x.Name == nameof(EntityFrameworkQueryableExtensions.ToListAsync) && x.IsGenericMethodDefinition);
				toListMethod = toListMethod.MakeGenericMethod(selectExpression.ReturnType);
				var selectionTask = toListMethod.Invoke(null, new object[] { selected, null }) as Task;
				await selectionTask;
				var selectionResult = selectionTask.GetType().GetProperty("Result").GetValue(selectionTask) as IEnumerable;
				Tuple<string, PropertyInfo, Dictionary<TKey, object>>[] props = null;
				PropertyInfo keyProp = null;
				foreach (var row in selectionResult)
				{
					if (props == null)
					{
						props = properties.Select((x, i) =>
							Tuple.Create(x.Name, row.GetType().GetProperty($"Item{i + 2}"), new Dictionary<TKey, object>()))
							.ToArray();
						keyProp = row.GetType().GetProperty("Item1");
					}
					var key = (TKey)keyProp.GetValue(row);
					foreach (var p in props)
					{
						var value = p.Item2.GetValue(row);
						p.Item3.Add(key, value);
					}
				}
				var result = new ExpressionValueResponse<TKey>
				{
					PropertyValues = props.ToDictionary(x => x.Item1, x => x.Item3),
					EntityTypeName = typeof(TEntity).Name
				};
				return result;
			}
		}

		private void PrepareExpressions(string typeName, IEnumerable<PropertyInfoModel> properties)
		{
			var entityMetadata = _implementationsContainer.Metadata[typeName];
			foreach (var property in properties)
			{
				var propertyMetadata = entityMetadata.GetProperty(property.Name);
				if (propertyMetadata == null)
				{
					continue;
				}
				property.LambdaExpression = propertyMetadata.GetDefiningExpression(_implementationsContainer.Reflector);
			}
		}

		internal async Task<IEnumerable<NameResponseItem>> GetIdAndNameInternal<TEntity, Tkey>(int[] ids)
	where TEntity : class
		{
			var metadata = _implementationsContainer.Metadata.Get<TEntity>();
			using (var context = await GetReadBusinessDbContext())
			{
				IQueryable<TEntity> query = context.Set<TEntity>();
				if (ids != null) //TODO: Dangerous
				{
					var keys = new Tkey[ids.Length];
					for (var i = 0; i < ids.Length; i++)
					{
						keys[i] = (Tkey)Convert.ChangeType(ids[i], typeof(Tkey)); //TODO:Boxing/Unboxing
					}
					query = query.Where(QueryBuilder.FilterByIds<TEntity, Tkey>(keys, metadata));
				}
				IQueryable<NameResponseItem> selected =
					query.Select(QueryBuilder.GetIdAndNameSelectionExpression<TEntity, Tkey>(_implementationsContainer.Metadata.Get<TEntity>()));
				return await selected.ToListAsync();
			}
		}

		internal async Task<IEnumerable<NameResponseItem>> GetAutocompleteItemsInternal<TEntity, Tkey>(string queryText)
	where TEntity : class
		{
			var metadata = _implementationsContainer.Metadata.Get<TEntity>();
			var displayNameProperty = metadata.DisplayNameProperty;
			if (string.IsNullOrWhiteSpace(displayNameProperty))
			{
				throw new Exception($"DisplayName for type {typeof(TEntity)} is not defined");
			}
			using (var context = await GetReadBusinessDbContext())
			{
				IQueryable<TEntity> query = context.Set<TEntity>();
				if (!string.IsNullOrWhiteSpace(queryText))
				{
					query = query.Where(QueryBuilder.FilterByDisplayName<TEntity>(queryText, displayNameProperty));
				}
				IQueryable<NameResponseItem> selected =
					query.Select(QueryBuilder.GetIdAndNameSelectionExpression<TEntity, Tkey>(metadata));
				selected = selected.OrderBy(x => x.DisplayName).Take(100);
				return await selected.ToListAsync();
			}
		}

		internal async Task<Result<object>> AddInternal<TEntity>(ManageEntityRequest<TEntity> request
			, DbContext dbContext, IActionContextInfo actionContext)
			where TEntity : class
		{
			try
			{
				var validationResult = _validator.Validate(request.Entity, ActionTypeEnum.Insert, actionContext);
				if (validationResult?.IsValid == false)
				{
					return validationResult;
				}

				var set = dbContext.Set<TEntity>();
				await set.AddAsync(request.Entity);
				return request.Entity;
			}
			catch (Exception ex)
			{
				return ex;
			}
		}

		internal async Task<Result<object>> EditInternal<TEntity>(ManageEntityRequest<TEntity> request
			, DbContext dbContext, IActionContextInfo actionContext)
			where TEntity : class
		{
			try
			{
				// var validationResult = _validator.Validate(request.Entity, ActionTypeEnum.Update, actionContext);
				//if (validationResult?.IsValid == false)
				//{
				//	return new BadRequestObjectResult(validationResult);
				//}

				var set = dbContext.Set<TEntity>();
				var existing = await set.FindAsync(_entityHelper.GetPrimaryKey(request.Entity));
				_entityHelper.CopyPropertyValues(request.Entity, existing);
				return existing;
			}
			catch (Exception ex)
			{
				return ex;
			}
		}

		internal async Task<Result<object>> DeleteInternal<TEntity>(ManageEntityRequest<TEntity> request
			, DbContext dbContext, IActionContextInfo actionContext)
		where TEntity : class
		{
			try
			{
				//var validationResult = _validator.Validate(request.Entity, ActionTypeEnum.Delete, actionContext);
				//if (validationResult?.IsValid == false)
				//{
				//	return validationResult;
				//}
				var set = dbContext.Set<TEntity>();
				var entity = await set.FindAsync(_entityHelper.GetPrimaryKey(request.Entity));
				set.Remove(entity);
				return request.Entity;
			}
			catch (Exception ex)
			{
				return ex;
			}
		}
	}
}