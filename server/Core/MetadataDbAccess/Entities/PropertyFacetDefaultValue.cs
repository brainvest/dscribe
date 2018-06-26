using System.ComponentModel.DataAnnotations.Schema;

namespace Brainvest.Dscribe.MetadataDbAccess.Entities
{
	public class PropertyFacetDefaultValue
	{
		public int Id { get; set; }

		public int FacetDefinitionId { get; set; }
		[ForeignKey(nameof(FacetDefinitionId))]
		public PropertyFacetDefinition FacetDefinition { get; set; }

		public int GeneralUsageCategoryId { get; set; }
		[ForeignKey(nameof(GeneralUsageCategoryId))]
		public PropertyGeneralUsageCategory GeneralUsageCategory { get; set; }

		public int? AppTypeId { get; set; }
		[ForeignKey(nameof(AppTypeId))]
		public AppType AppType { get; set; }

		public int? AppInstanceId { get; set; }
		[ForeignKey(nameof(AppInstanceId))]
		public AppInstance AppInstance { get; set; }

		public string DefaultValue { get; set; }
	}
}