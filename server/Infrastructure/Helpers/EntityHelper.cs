using Brainvest.Dscribe.Abstractions;
using Brainvest.Dscribe.Abstractions.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Linq;
using System.Reflection;

namespace Brainvest.Dscribe.Helpers
{
	public class EntityHelper
	{
		IImplementationsContainer _implementationsContainer;
		public EntityHelper(IImplementationsContainer implementationsContainer)
		{
			_implementationsContainer = implementationsContainer;
		}

		public void CopyPropertyValues<TEntity>(TEntity source, TEntity dest)
		{
			var properties = _implementationsContainer.Metadata[source.GetType().Name]
				.GetAllProperties();
			foreach (var property in properties)
			{
				if (property.IsExpression)
				{
					continue;
				}
				var prop = dest.GetType().GetTypeInfo().GetProperty(property.Name);
				if (prop == null || !prop.CanWrite || !prop.CanRead || property.IsReadOnlyInEdit())
				{
					continue;
				}
				prop.SetValue(dest, prop.GetValue(source));
			}
		}

		public object GetPrimaryKey<TEntity>(TEntity entity)
		{
			//TODO: this is not fast (or is it?) and does not handle composite PKs
			var pkName = _implementationsContainer.Metadata[typeof(TEntity).Name].GetPrimaryKey().Name;
			return entity.GetType().GetTypeInfo().GetProperty(pkName).GetValue(entity);
		}

		public static object CreateGenericObject(ManageEntityRequest request, Type entityType)
		{
			var entity = ConvertDeserializedObjectToStaticType(request.Entity, entityType);
			var r = typeof(ManageEntityRequest<>).MakeGenericType(entityType).GetConstructors().First().Invoke(new object[] { entity });
			return r;
		}

		public static object ConvertDeserializedObjectToStaticType(object deserialized, Type entityType)
		{
			if (entityType.IsAssignableFrom(deserialized.GetType()))
			{
				return deserialized;
			}
			if (!(deserialized is JObject jEntity))
			{
				jEntity = JObject.Parse(JsonConvert.SerializeObject(deserialized));
			}
			var toObjectMethod = typeof(JObject).GetMethods(BindingFlags.FlattenHierarchy | BindingFlags.Instance | BindingFlags.Public)
				.Single(x => x.Name == nameof(JObject.ToObject) && x.GetGenericArguments().Length == 1 && x.GetParameters().Length == 0);
			toObjectMethod = toObjectMethod.MakeGenericMethod(entityType);
			var entity = toObjectMethod.Invoke(jEntity, null);
			return entity;
		}
	}
}