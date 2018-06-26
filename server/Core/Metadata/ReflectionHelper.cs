using Brainvest.Dscribe.Abstractions.Metadata;
using Brainvest.Dscribe.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Brainvest.Dscribe.Metadata
{
	public static class ReflectionHelper
	{
		public static void FillFacetsDictionary<TOwner>(Dictionary<int, Facet> dictionary
			, IEnumerable<IDBFacetDefinition> dbDefinitions, Type baseFacetType)
		{
			var PropertiesByName = typeof(TOwner).GetProperties(System.Reflection.BindingFlags.Static | System.Reflection.BindingFlags.Public)
				.Where(x => x.Name.EndsWith(nameof(Facet)) && typeof(Facet).IsAssignableFrom(x.PropertyType))
				.ToDictionary(x => x.Name.Substring(0, x.Name.Length - 5), x => x.GetValue(null, null) as Facet);
			dictionary.Clear();
			foreach (var definition in dbDefinitions)
			{
				dictionary.Add(definition.Id, PropertiesByName.GetOrDefault(definition.Name) ?? CreateFacet(baseFacetType, definition));
			}
		}

		private static Dictionary<FacetDataType, Type> _facetTypeMap = new Dictionary<FacetDataType, Type>
		{
			{ FacetDataType.Bool, typeof(bool) },
			{ FacetDataType.Int, typeof(int) },
			{ FacetDataType.String, typeof(string) }
		};

		private static Facet CreateFacet(Type baseFacetType, IDBFacetDefinition definition)
		{
			return Activator.CreateInstance(baseFacetType.MakeGenericType(_facetTypeMap[definition.FacetTypeId])
				, definition.Name, null, null) as Facet;
		}
	}
}