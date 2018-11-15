using Brainvest.Dscribe.Abstractions;
using Brainvest.Dscribe.Abstractions.Metadata;
using Brainvest.Dscribe.Abstractions.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Brainvest.Dscribe.Runtime.ObjectGraphHandling
{
	public class HeavyOrmObjectGraphHandler : IObjectGraphHandler
	{
		private readonly IImplementationsContainer _implementations;
		private readonly IEntityHandler _entityHandler;

		public HeavyOrmObjectGraphHandler(IImplementationsContainer implementations, IEntityHandler entityHandler)
		{
			_implementations = implementations;
			_entityHandler = entityHandler;
		}

		public async Task<ActionResult<object>> Add(ManageEntityRequest request)
		{
			using (var repository = _implementations.RepositoryFactory())
			{
				var map = new Dictionary<string, object>();
				var result = await AddRecursive(request, repository, map, "");
				await _entityHandler.SaveChanges(repository);
				return map[""];
			}
		}

		private async Task<ActionResult<object>> AddRecursive(ManageEntityRequest request, IDisposable repository, Dictionary<string, object> map, string currentObjectPath)
		{
			var entityType = _implementations.Metadata[request.EntityTypeName];
			var prop = entityType.GetAllProperties().First();
			object entity;
			if (!entityType.NotMapped())
			{
				var result = await _entityHandler.Add(request, repository);
				entity = result.Value;
			}
			else
			{
				entity = Activator.CreateInstance(_implementations.Reflector.GetType(request.EntityTypeName));
			}
			if (map.TryGetValue(currentObjectPath, out var existingValue))
			{
				existingValue.GetType().GetMethod("Add").Invoke(existingValue, new object[] { entity });
			}
			map.Add(currentObjectPath, entity);
			foreach (var pair in map)
			{
				if (!currentObjectPath.StartsWith(pair.Key))
				{
					continue;
				}
				var typeMetadata = _implementations.Metadata[pair.Value.GetType().Name];
				foreach (var property in typeMetadata.GetAllProperties())
				{
					var path = JoinPath(pair.Key, property.Name);
					if (path == currentObjectPath)
					{
						SetPropertyValue(pair.Value, property, entity);
					}
				}
			}
			foreach (var propertyMetadata in entityType.GetAllProperties())
			{
				var propertyPath = JoinPath(currentObjectPath, propertyMetadata.Name);
				if (map.TryGetValue(propertyPath, out var val))
				{
					SetPropertyValue(entity, propertyMetadata, val);
				}
				if (propertyMetadata.HideInInsert())
				{
					continue;
				}
				var value = (request.Entity as JObject)[propertyMetadata.Name];
				//if (propertyMetadata.DataType == DataTypes.NavigationEntity)
				//{
				//	var relatedEntity = await AddRecursive(new ManageEntityRequest
				//	{
				//		EntityTypeName = propertyMetadata.EntityTypeName,
				//		Entity = value
				//	}, repository, map, propertyPath);
				//}
				if (propertyMetadata.DataType == DataTypes.NavigationList)
				{
					map.Add(propertyPath, Activator.CreateInstance(typeof(HashSet<>).MakeGenericType(_implementations.Reflector.GetType(propertyMetadata.EntityTypeName))));
					if (!(value is IEnumerable collection))
					{
						continue;
					}
					foreach (var item in collection)
					{
						await AddRecursive(new ManageEntityRequest
						{
							EntityTypeName = propertyMetadata.EntityTypeName,
							Entity = item
						}, repository, map, propertyPath);
					}
				}
			}
			return map[currentObjectPath];
		}

		private static void SetPropertyValue(object entity, IPropertyMetadata propertyMetadata, object newValue)
		{
			var property = entity.GetType().GetProperty(propertyMetadata.Name);
			if (propertyMetadata.DataType == Abstractions.Metadata.DataTypes.NavigationEntity)
			{
				property.SetValue(entity, newValue);
			}
			else if (propertyMetadata.DataType == Abstractions.Metadata.DataTypes.NavigationList)
			{
				var collection = property.GetValue(entity);
				if (collection == null)
				{
					var itemType = property.PropertyType.GetGenericArguments().Single(); // extract T from ICollection<T> property {get; set;}
					collection = Activator.CreateInstance(typeof(HashSet<>).MakeGenericType(itemType));
					property.SetValue(entity, collection);
				}
				collection.GetType().GetMethod("Add").Invoke(collection, new object[] { newValue });
				if (propertyMetadata.InverseProperty != null)
				{
					var inserse = newValue.GetType().GetProperty(propertyMetadata.InverseProperty.Name);
					inserse.SetValue(newValue, entity);
				}
			}
			else
			{
				throw new NotImplementedException();
			}
		}

		private static string JoinPath(string part1, string part2)
		{
			if (string.IsNullOrWhiteSpace(part1) || string.IsNullOrWhiteSpace(part2)
					|| part1.EndsWith(".") || part2.StartsWith("."))
			{
				return part1 + part2;
			}
			return part1 + "." + part2;
		}

		public async Task<ActionResult<object>> Edit(ManageEntityRequest request)
		{
			using (var repository = _implementations.RepositoryFactory())
			{
				var result = await _entityHandler.Edit(request, repository);
				await _entityHandler.SaveChanges(repository);
				return result;
			}
		}

		public async Task<ActionResult<object>> Delete(ManageEntityRequest request)
		{
			using (var repository = _implementations.RepositoryFactory())
			{
				var result = await _entityHandler.Delete(request, repository);
				await _entityHandler.SaveChanges(repository);
				return result;
			}
		}
	}
}