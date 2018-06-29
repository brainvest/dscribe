using Brainvest.Dscribe.Abstractions;
using Brainvest.Dscribe.Abstractions.Metadata;
using Brainvest.Dscribe.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using System.Text;

namespace Brainvest.Dscribe.Runtime
{
	public class BusinessReflector : IBusinessReflector
	{
		private IMetadataCache _metadata;
		private Dictionary<string, Type> _typename2Type;

		public BusinessReflector(IMetadataCache metadata)
		{
			_metadata = metadata;
			_typename2Type = new Dictionary<string, Type>()
			{
				{ "int", typeof(int) },
				{ "long", typeof(long) },
				{ "byte", typeof(byte) },
				{ "decimal", typeof(decimal) },
				{ "bool", typeof(bool) }
			};
		}

		public void RegisterAssembly(Assembly assembly)
		{
			foreach (var type in assembly.GetTypes())
			{
				if (_metadata.TryGetEntity(type.Name) != null)
				{
					_typename2Type.Add(type.Name, type);
				}
			}
		}

		public LambdaExpression GetPropetyExpression(Type entityType, string propertyName, params ParameterExpression[] parameters)
		{
			var expression = _metadata[entityType.Name]?.GetProperty(propertyName)?.GetDefiningExpression(this);
			if (expression != null && parameters?.Any() == true)
			{
				return expression.ReplaceParameters(parameters);
			}
			return expression;
		}

		public Type GetType(string typeName)
		{
			var isnullable = typeName.EndsWith("?");
			if (isnullable)
			{
				typeName = typeName.Substring(0, typeName.Length - 1);
			}
			var type = _typename2Type[typeName];
			if (isnullable)
			{
				type = typeof(Nullable<>).MakeGenericType(type);
			}
			return type;
		}
	}
}