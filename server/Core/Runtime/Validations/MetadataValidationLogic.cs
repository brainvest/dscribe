using Brainvest.Dscribe.Abstractions;
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
			if (!await dbContext.EntityTypes.AnyAsync())
			{
				//return "Entity list is empty.";
			}
			return string.Empty;
		}

		public static async Task<string> AddEntityTypeValidation(EntityTypeModel model, MetadataDbContext dbContext, IImplementationsContainer implementationsContainer)
		{
			if (await dbContext.EntityTypes.AnyAsync(x => x.Name == model.Name && x.AppTypeId == implementationsContainer.InstanceInfo.AppTypeId))
			{
				return $"Another entity with name: \"{ model.Name }\" is already defiend.";
			}
			return await Task.FromResult(string.Empty);
		}

		public static async Task<string> EditEntityTypeValidation(EntityTypeModel model, MetadataDbContext dbContext)
		{
			if (!await dbContext.EntityTypes.AnyAsync(x => x.Id == model.Id))
			{
				return "Entity not found";
			}
			return string.Empty;
		}

		public static async Task<string> DeleteEntityValidation(EntityTypeModel model, MetadataDbContext dbContext)
		{
			if (await dbContext.Properties.AnyAsync(x => x.OwnerEntityTypeId == model.Id))
			{
				return "The selected entity has referenced to one or more properties.";
			}
			if (!await dbContext.EntityTypes.AnyAsync(x => x.Id == model.Id))
			{
				return "The selected entity is not exist";
			}

			var relativeProperty = await dbContext.Properties.Where(x => x.DataEntityTypeId == model.Id).Include(x => x.OwnerEntityType).ToListAsync();
			if (relativeProperty.Any())
			{
				return "The selected entity is navigated to '" + relativeProperty.FirstOrDefault().Name +
					@"' in entity '" + relativeProperty.FirstOrDefault().OwnerEntityType.Name + "'";
			}
			return string.Empty;
		}

		public static async Task<string> GetPropertiesValidation(EntityTypeDetailsRequest model, MetadataDbContext dbContext)
		{
			if (!await dbContext.EntityTypes.AnyAsync(x => x.Id == model.EntityTypeId))
			{
				return "Entity not found";
			}
			return string.Empty;
		}

		public static async Task<string> GetPropertyForEditValidation(PropertyDetailsRequest model, MetadataDbContext dbContext)
		{
			if (!await dbContext.Properties.AnyAsync(x => x.Id == model.PropertyId))
			{
				return "Property not found";
			}
			return string.Empty;
		}

		public static async Task<string> AddPropertyValidation(AddNEditPropertyModel model, MetadataDbContext dbContext)
		{
			if (model.PropertyGeneralUsageCategoryId == 2 &&
				await dbContext.EntityTypes.AnyAsync(x => x.Properties.Where(y => y.OwnerEntityTypeId == model.OwnerEntityTypeId).Any(y => y.GeneralUsageCategoryId == 2)))
			{
				return "This entity already has a primary key";
			}
			if (!await dbContext.EntityTypes.AnyAsync(x => x.Id == model.OwnerEntityTypeId))
			{
				return "Entity not found";
			}
			return string.Empty;
		}

		public static async Task<string> EditPropertyValidation(AddNEditPropertyModel model, MetadataDbContext dbContext)
		{
			if (!await dbContext.Properties.AnyAsync(x => x.Id == model.Id))
			{
				return "Property not found";
			}
			return string.Empty;
		}

		public static async Task<string> DeletePropertyValidation(PropertyModel model, MetadataDbContext dbContext)
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

		public static async Task<string> GetPropertyFacetsValidation(EntityTypeDetailsRequest model, MetadataDbContext dbContext)
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