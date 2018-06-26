using Brainvest.Dscribe.Abstractions;
using System;
using System.Collections.Generic;
using System.Reflection;
using System.Text;

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
	}
}