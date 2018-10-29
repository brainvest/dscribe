using Brainvest.Dscribe.Abstractions.Models.ManageMetadata;
using Brainvest.Dscribe.MetadataDbAccess;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace Brainvest.Dscribe.Runtime.Validations
{
	public static class MetadataValidationLogic
	{
		public static async Task<string> GetTypesValidation(MetadataDbContext dbContext)
		{
			if (!await dbContext.Entities.AnyAsync()) return "Entity list is empty.";
			return string.Empty;
		}
		public static async Task<string> AddEntityValidation(EntityMetadataModel model, MetadataDbContext dbContext)
		{
			return await Task.FromResult(string.Empty);
		}
		public static async Task<string> EditEntityValidation(EntityMetadataModel model, MetadataDbContext dbContext)
		{
			if (!await dbContext.Entities.AnyAsync(x => x.Id == model.Id))
			{
				return "Entity not found";
			}
			return string.Empty;
		}
		public static async Task<string> DeleteEntityValidation(EntityMetadataModel model, MetadataDbContext dbContext)
		{
			if (await dbContext.Properties.AnyAsync(x => x.EntityId == model.Id))
			{
				return "The selected entity has referenced to one or more properties.";
			}
			if (!await dbContext.Entities.AnyAsync(x => x.Id == model.Id))
			{
				return "The selected entity is not exist";
			}
			return string.Empty;
		}
		public static async Task<string> GetPropertiesValidation(PropertyMetadataRequestModel model, MetadataDbContext dbContext)
		{
			if (!await dbContext.Entities.AnyAsync(x => x.Id == model.EntityId))
			{
				return "Entity not found";
			}
			return string.Empty;
		}
		public static async Task<string> GetPropertyForEditValidation(AddNEditPropertyInfoRequest model, MetadataDbContext dbContext)
		{
			if (!await dbContext.Properties.AnyAsync(x => x.Id == model.PropertyId))
			{
				return "Property not found";
			}
			return string.Empty;
		}
		public static async Task<string> AddPropertyValidation(AddNEditPropertyMetadataModel model, MetadataDbContext dbContext)
		{
			if (!await dbContext.Entities.AnyAsync(x => x.Id == model.OwnerEntityId))
			{
				return "Entity not found";
			}
			return string.Empty;
		}
		public static async Task<string> EditPropertyValidation(AddNEditPropertyMetadataModel model, MetadataDbContext dbContext)
		{
			if (!await dbContext.Properties.AnyAsync(x => x.Id == model.Id))
			{
				return "Property not found";
			}
			return string.Empty;
		}
		public static async Task<string> DeletePropertyValidation(PropertyMetadataModel model, MetadataDbContext dbContext)
		{
			if (!await dbContext.Properties.AnyAsync(x => x.Id == model.Id))
			{
				return "Property not found";
			}
			return string.Empty;
		}
		public static async Task<string> GetBasicInfoValidation(MetadataDbContext dbContext)
		{
			return await Task.FromResult(string.Empty);
		}
		public static async Task<string> GetTypeFacetsValidation(MetadataDbContext dbContext)
		{
			return await Task.FromResult(string.Empty);
		}
		public static async Task<string> GetPropertyFacetsValidation(PropertyFacetValuesRequest model, MetadataDbContext dbContext)
		{
			return await Task.FromResult(string.Empty);
		}
		public static async Task<string> SaveTypeLocalFacetValueValidation(SaveLocalFacetRequest model, MetadataDbContext dbContext)
		{
			return await Task.FromResult(string.Empty);
		}
		public static async Task<string> SavePropertyLocalFacetValueValidation(SaveLocalFacetRequest model, MetadataDbContext dbContext)
		{
			return await Task.FromResult(string.Empty);
		}
		public static async Task<string> GetAllPropertyNamesValidation(MetadataDbContext dbContext)
		{
			return await Task.FromResult(string.Empty);
		}
	}
}
