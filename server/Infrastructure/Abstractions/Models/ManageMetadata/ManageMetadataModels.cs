using System.Collections.Generic;

namespace Brainvest.Dscribe.Abstractions.Models.ManageMetadata
{
	public class EntityMetadataModel
	{
		public int? BaseEntityId { get; set; }
		public string CodePath { get; set; }
		public string DisplayNamePath { get; set; }
		public int Id { get; set; }
		public string Name { get; set; }
		public string SchemaName { get; set; }
		public string SingularTitle { get; set; }
		public string PluralTitle { get; set; }
		public int EntityGeneralUsageCategoryId { get; set; }
	}

	public class PropertyMetadataModel
	{
		public int? DataTypeId { get; set; }
		public int? DataTypeEntityId { get; set; }
		public int? ForeignKeyPropertyId { get; set; }
		public int Id { get; set; }
		public int? InversePropertyId { get; set; }
		public bool IsNullable { get; set; }
		public string Name { get; set; }
		public string Title { get; set; }
		public int PropertyGeneralUsageCategoryId { get; set; }
		public int EntityId { get; set; }
	}

	public class PropertyMetadataRequestModel
	{
		public int EntityId { get; set; }
	}

	public class MetadataBasicInfoModel
	{
		public IEnumerable<FacetDefinitionModel> PropertyFacetDefinitions { get; set; }
		public IEnumerable<FacetDefinitionModel> EntityFacetDefinitions { get; set; }
		public Dictionary<string, Dictionary<string, string>> DefaultPropertyFacetValues { get; set; }
		public Dictionary<string, Dictionary<string, string>> DefaultEntityFacetValues { get; set; }
		public IEnumerable<GeneralUsageCategoryModel> PropertyGeneralUsageCategories { get; set; }
		public IEnumerable<GeneralUsageCategoryModel> EntityGeneralUsageCategories { get; set; }
		public IEnumerable<DataTypeModel> DataTypes { get; set; }
		public IEnumerable<FacetTypeModel> FacetTypes { get; set; }
	}

	public class LocalFacetsModel
	{
		/// <summary>
		/// Key to first Dictionary is: Type/Property Name, Key to the second is: FacetName
		/// </summary>
		public Dictionary<string, Dictionary<string, string>> LocalFacets { get; set; }
	}

	public class SaveLocalFacetRequest
	{
		public string EntityName { get; set; }
		public string PropertyName { get; set; }
		public string FacetName { get; set; }
		public string Value { get; set; }
		public bool ClearLocalValue { get; set; }
	}

	public class PropertyFacetValuesRequest
	{
		public string EntityName { get; set; }
	}

	public class FacetDefinitionModel
	{
		public int Id { get; set; }
		public string Name { get; set; }
		public string DataType { get; set; }
	}

	public class GeneralUsageCategoryModel
	{
		public int Id { get; set; }
		public string Name { get; set; }
	}

	public class DataTypeModel
	{
		public int Id { get; set; }
		public string Identifier { get; set; }
		public string Name { get; set; }
	}

	public class FacetTypeModel
	{
		public int Id { get; set; }
		public string Identifier { get; set; }
		public string Name { get; set; }
	}
}