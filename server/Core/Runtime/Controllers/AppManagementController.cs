using Brainvest.Dscribe.Abstractions.Models.AppManagement;
using Brainvest.Dscribe.MetadataDbAccess;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Brainvest.Dscribe.Runtime.Controllers
{
	[ApiController]
	[Produces("application/json")]
	[Route("api/[controller]/[action]")]
	public class AppManagementController : ControllerBase
	{
		MetadataDbContext _dbContext;

		public AppManagementController(MetadataDbContext dbContext)
		{
			_dbContext = dbContext;
		}

		[HttpPost]
		public async Task<IEnumerable<AppInstanceInfoModel>> GetAppInstancesInfo()
		{
			return await _dbContext.AppInstances.Select(x =>
			new AppInstanceInfoModel
			{
				Id = x.Id,
				AppTypeId = x.AppTypeId,
				AppTypeName = x.AppType.Name,
				AppTypeTitle = x.AppType.Title,
				IsEnabled = x.IsEnabled,
				IsProduction = x.IsProduction,
				MetadataReleaseReleaseTime = x.MetadataRelease.ReleaseTime,
				MetadataReleaseVersion = x.MetadataRelease.Version,
				MetadataReleaseVersionCode = x.MetadataRelease.VersionCode,
				Name = x.Name,
				Title = x.Title,
				UseUnreleasedMetadata = x.UseUnreleasedMetadata
			}).ToListAsync();
		}
	}
}