using Brainvest.Dscribe.Abstractions.Models.AppManagement;
using Brainvest.Dscribe.MetadataDbAccess;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Brainvest.Dscribe.Runtime.Validations
{
	public static class AppManagementValidationLogic
	{
		public static async Task<string> AddAppInstanceValidation(AppInstanceInfoModel model, MetadataDbContext dbContext)
		{
			if (await dbContext.AppInstances.AnyAsync(x => x.Name == model.Name))
			{
				return "App instance name " + model.Name + " is already exist.";
			}
			return string.Empty;
		}

		public static async Task<string> EditAppInstanceValidation(AppInstanceInfoModel model, MetadataDbContext dbContext)
		{
			return await Task.FromResult(string.Empty);
		}

		public static async Task<string> DeleteAppInstanceValidation(AppInstanceInfoModel model, MetadataDbContext dbContext)
		{
			return await Task.FromResult(string.Empty);
		}

		public static async Task<string> AddAppTypeValidation(AppTypeModel model, MetadataDbContext dbContext)
		{
			return await Task.FromResult(string.Empty);
		}

		public static async Task<string> EditAppTypeValidation(AppTypeModel model, MetadataDbContext dbContext)
		{
			return await Task.FromResult(string.Empty);
		}

		public static async Task<string> DeleteAppTypeValidation(AppTypeModel model, MetadataDbContext dbContext)
		{
			if (await dbContext.AppInstances.AnyAsync(x => x.AppTypeId == model.Id))
			{
				return "This app type is refered to one or more app instances.";
			}

			if (await dbContext.EntityTypes.AnyAsync(x => x.AppTypeId == model.Id))
			{
				return "This app type is refered to one or more entities.";
			}
			return await Task.FromResult(string.Empty);
		}
	}
}
