using Brainvest.Dscribe.Abstractions;
using Brainvest.Dscribe.Abstractions.Models.ManageMetadata;
using Brainvest.Dscribe.MetadataDbAccess;
using Brainvest.Dscribe.MetadataDbAccess.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Brainvest.Dscribe.Runtime.Controllers
{
	[ApiController]
	[Produces("application/json")]
	[Route("api/[controller]/[action]")]
	public class ManageMetadataController : ControllerBase
	{
		MetadataDbContext _dbContext;
		IImplementationsContainer _implementations;

		public ManageMetadataController(
			MetadataDbContext dbContext,
			IImplementationsContainer implementations)
		{
			_dbContext = dbContext;
			_implementations = implementations;
		}

		[HttpPost]
		public async Task<ActionResult<IEnumerable<EntityMetadataModel>>> GetTypes()
		{
			var appTypeId = _implementations.InstanceInfo.AppTypeId;
			var types = await _dbContext.Entities.OrderBy(x => x.Name)
					.Where(x => x.AppTypeId == appTypeId)
					.Select(x => new EntityMetadataModel
					{
						BaseEntityId = x.BaseEntityId,
						CodePath = x.CodePath,
						DisplayNamePath = x.DisplayNamePath,
						Id = x.Id,
						Name = x.Name,
						SchemaName = x.SchemaName,
						SingularTitle = x.SingularTitle,
						PluralTitle = x.PluralTitle,
						EntityGeneralUsageCategoryId = x.GeneralUsageCategoryId
					})
					.ToListAsync();
			return types;
		}

		[HttpPost]
		public async Task<ActionResult> AddType([FromBody]EntityMetadataModel model)
		{
			var error = AddTypeValidation(model);
			if (error != null)
			{
				return BadRequest(error);
			}

			var type = new Entity
			{
				BaseEntityId = model.BaseEntityId,
				CodePath = model.CodePath,
				DisplayNamePath = model.DisplayNamePath,
				Name = model.Name,
				SchemaName = model.SchemaName,
				SingularTitle = model.SingularTitle,
				PluralTitle = model.PluralTitle,
				GeneralUsageCategoryId = model.EntityGeneralUsageCategoryId,
				AppTypeId = _implementations.InstanceInfo.AppTypeId
			};
			_dbContext.Entities.Add(type);
			await _dbContext.SaveChangesAsync();
			return Ok();
		}

		[HttpPost]
		public async Task<ActionResult> EditType([FromBody]EntityMetadataModel model)
		{
			var error = EditTypeValidation(model);
			if (error != null)
			{
				return BadRequest(error);
			}

			var type = await _dbContext.Entities.FindAsync(model.Id);
			type.BaseEntityId = model.BaseEntityId;
			type.CodePath = model.CodePath;
			type.DisplayNamePath = model.DisplayNamePath;
			type.Name = model.Name;
			type.SchemaName = model.SchemaName;
			type.SingularTitle = model.SingularTitle;
			type.PluralTitle = model.PluralTitle;
			type.GeneralUsageCategoryId = model.EntityGeneralUsageCategoryId;
			await _dbContext.SaveChangesAsync();
			return Ok();
		}

		[HttpPost]
		public async Task<ActionResult> DeleteType([FromBody]EntityMetadataModel model)
		{
			//TODO: Handle errors, validate model
			var type = await _dbContext.Entities.FindAsync(model.Id);
			_dbContext.Entities.Remove(type);
			await _dbContext.SaveChangesAsync();
			return Ok();
		}

		//Same as above
		[HttpPost]
		public async Task<ActionResult<IEnumerable<PropertyMetadataModel>>> GetProperties([FromBody]PropertyMetadataRequestModel request)
		{
			var properties = await _dbContext.Properties
					.Where(x => x.EntityId == request.EntityId).OrderBy(x => x.Name)
					.Select(x => new PropertyMetadataModel
					{
						DataTypeId = (int?)x.DataTypeId,
						DataTypeEntityId = x.DataTypeEntityId,
						Id = x.Id,
						IsNullable = x.IsNullable,
						Name = x.Name,
						Title = x.Title,
						PropertyGeneralUsageCategoryId = x.GeneralUsageCategoryId,
						EntityId = x.EntityId,
						ForeignKeyPropertyId = x.ForeignKeyPropertyId,
						InversePropertyId = x.InversePropertyId
					}).ToListAsync();
			return properties;
		}

		[HttpPost]
		public async Task<ActionResult> AddProperty([FromBody]PropertyMetadataModel model)
		{
			//TODO: Handle errors, validate model
			var property = new Property
			{
				DataTypeId = (DataTypeEnum?)model.DataTypeId,
				DataTypeEntityId = model.DataTypeEntityId,
				IsNullable = model.IsNullable,
				Name = model.Name,
				Title = model.Title,
				GeneralUsageCategoryId = model.PropertyGeneralUsageCategoryId,
				EntityId = model.EntityId,
				ForeignKeyPropertyId = model.ForeignKeyPropertyId,
				InversePropertyId = model.InversePropertyId
			};
			_dbContext.Properties.Add(property);
			await _dbContext.SaveChangesAsync();
			return Ok();
		}

		[HttpPost]
		public async Task<ActionResult> EditProperty([FromBody]PropertyMetadataModel model)
		{
			//TODO: Handle errors, validate model
			var property = await _dbContext.Properties.FindAsync(model.Id);
			property.DataTypeId = (DataTypeEnum?)model.DataTypeId;
			property.DataTypeEntityId = model.DataTypeEntityId;
			property.IsNullable = model.IsNullable;
			property.Name = model.Name;
			property.Title = model.Title;
			property.GeneralUsageCategoryId = model.PropertyGeneralUsageCategoryId;
			property.EntityId = model.EntityId;
			property.ForeignKeyPropertyId = model.ForeignKeyPropertyId;
			property.InversePropertyId = model.InversePropertyId;
			await _dbContext.SaveChangesAsync();
			return Ok();
		}

		[HttpPost]
		public async Task<ActionResult> DeleteProperty([FromBody]PropertyMetadataModel model)
		{
			//TODO: Handle errors, validate model
			var property = await _dbContext.Properties.FindAsync(model.Id);
			_dbContext.Properties.Remove(property);
			await _dbContext.SaveChangesAsync();
			return Ok();
		}

		[HttpPost]
		public async Task<ActionResult<MetadataBasicInfoModel>> GetBasicInfo()
		{
			var result = new MetadataBasicInfoModel
			{
				DefaultPropertyFacetValues = (await _dbContext.PropertyFacetDefaultValues
					.Select(v => new
					{
						UsageCategoryName = v.GeneralUsageCategory.Name,
						FacetName = v.FacetDefinition.Name,
						v.DefaultValue
					})
					.ToListAsync())
					.GroupBy(v => v.UsageCategoryName)
					.ToDictionary(v => v.Key, v => v.ToDictionary(g => g.FacetName, g => g.DefaultValue)),
				DefaultEntityFacetValues = (await _dbContext.EntityFacetDefaultValues
					.Select(v => new
					{
						UsageCategoryName = v.GeneralUsageCategory.Name,
						FacetName = v.FacetDefinition.Name,
						v.DefaultValue
					})
					.ToListAsync())
					.GroupBy(v => v.UsageCategoryName)
					.ToDictionary(v => v.Key, v => v.ToDictionary(g => g.FacetName, g => g.DefaultValue)),
				PropertyFacetDefinitions = await _dbContext.PropertyFacetDefinitions.Select(p => new FacetDefinitionModel
				{
					Id = p.Id,
					Name = p.Name,
					DataType = p.FacetType.Identifier
				}).ToListAsync(),
				EntityFacetDefinitions = await _dbContext.EntityFacetDefinitions.Select(p => new FacetDefinitionModel
				{
					Id = p.Id,
					Name = p.Name,
					DataType = p.FacetType.Identifier
				}).ToListAsync(),
				PropertyGeneralUsageCategories = await _dbContext.PropertyGeneralUsageCategories.Select(u => new GeneralUsageCategoryModel
				{
					Id = u.Id,
					Name = u.Name
				}).ToListAsync(),
				EntityGeneralUsageCategories = await _dbContext.EntityGeneralUsageCategories.Select(u => new GeneralUsageCategoryModel
				{
					Id = u.Id,
					Name = u.Name
				}).ToListAsync(),
				DataTypes = await _dbContext.DataTypes.Select(d => new DataTypeModel
				{
					Id = (int)d.Id,
					Identifier = d.Identifier,
					Name = d.Name
				}).ToListAsync(),
				FacetTypes = await _dbContext.FacetTypes.Select(f => new FacetTypeModel
				{
					Id = (int)f.Id,
					Identifier = f.Identifier,
					Name = f.Name
				}).ToListAsync()
			};
			return result;
		}

		[HttpPost]
		public async Task<ActionResult<LocalFacetsModel>> GetTypeFacets()
		{
			var result = new LocalFacetsModel()
			{
				LocalFacets = (await _dbContext.EntityFacetValues.Select(v => new
				{
					v.Id,
					TypeName = v.Entity.Name,
					FacetName = v.FacetDefinition.Name,
					v.Value
				}).ToListAsync())
				.GroupBy(v => v.TypeName)
				.ToDictionary(v => v.Key, v => v.ToDictionary(g => g.FacetName, g => g.Value))
			};
			return result;
		}

		[HttpPost]
		public async Task<ActionResult<LocalFacetsModel>> GetPropertyFacets(PropertyFacetValuesRequest request)
		{
			var result = new LocalFacetsModel()
			{
				LocalFacets = (await _dbContext.PropertyFacetValues.Where(x => x.Property.Entity.Name == request.EntityName)
				.Select(v => new
				{
					v.Id,
					TypeName = v.Property.Name,
					FacetName = v.FacetDefinition.Name,
					v.Value
				}).ToListAsync())
				.GroupBy(v => v.TypeName)
				.ToDictionary(v => v.Key, v => v.ToDictionary(g => g.FacetName, g => g.Value))
			};
			return result;
		}

		[HttpPost]
		public async Task<ActionResult> SaveTypeLocalFacetValue(SaveLocalFacetRequest request)
		{
			var existing = await _dbContext.EntityFacetValues
				.Where(x =>
					x.Entity.Name == request.EntityName
					&& x.FacetDefinition.Name == request.FacetName)
				.SingleOrDefaultAsync();
			if (request.ClearLocalValue)
			{
				if (existing != null)
				{
					_dbContext.EntityFacetValues.Remove(existing);
				}
			}
			else
			{
				if (existing == null)
				{
					existing = new EntityFacetValue
					{
						FacetDefinition = await _dbContext.EntityFacetDefinitions.SingleAsync(x => x.Name == request.FacetName),
						Entity = await _dbContext.Entities.SingleAsync(x => x.Name == request.EntityName)
					};
					_dbContext.EntityFacetValues.Add(existing);
				}
				existing.Value = request.Value;
			}
			await _dbContext.SaveChangesAsync();
			return Ok();
		}

		[HttpPost]
		public async Task<ActionResult> SavePropertyLocalFacetValue(SaveLocalFacetRequest request)
		{
			var existing = await _dbContext.PropertyFacetValues
				.Where(x =>
				x.Property.Entity.Name == request.EntityName
				&& x.Property.Name == request.PropertyName
				&& x.FacetDefinition.Name == request.FacetName)
				.SingleOrDefaultAsync();
			if (request.ClearLocalValue)
			{
				if (existing != null)
				{
					_dbContext.PropertyFacetValues.Remove(existing);
				}
			}
			else
			{
				if (existing == null)
				{
					existing = new PropertyFacetValue
					{
						FacetDefinition = await _dbContext.PropertyFacetDefinitions.SingleAsync(x => x.Name == request.FacetName),
						Property = await _dbContext.Properties.SingleAsync(x => x.Entity.Name == request.EntityName && x.Name == request.PropertyName)
					};
					_dbContext.PropertyFacetValues.Add(existing);
				}
				existing.Value = request.Value;
			}
			await _dbContext.SaveChangesAsync();
			return Ok();
		}

		private string AddTypeValidation(EntityMetadataModel model)
		{
			string error = null;
			if (string.IsNullOrWhiteSpace(model.Name))
			{
				return error = "Name Can't be empty";
			}

			if (model.Name.Length > 128)
			{
				return error = "Table name length should be less than 128 characters.";
			}
			return error;
		}

		private string EditTypeValidation(EntityMetadataModel model)
		{
			string error = null;
			if (string.IsNullOrWhiteSpace(model.Name))
			{
				return error = "Name Can't be empty";
			}
			if (model.Name.Length > 128)
			{
				return error = "Table name length should be less than 128 characters.";
			}
			return error;
		}
	}
}