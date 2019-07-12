using Brainvest.Dscribe.Abstractions.Metadata;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;

namespace Brainvest.Dscribe.Abstractions
{
	public interface IImplementationsContainer
	{
		IInstanceInfo InstanceInfo { get; }
		IMetadataModel MetadataModel { get; }
		IBusinessReflector Reflector { get; }
		IMetadataCache Metadata { get; }
		IDisposable GetBusinessRepository();
		DbContext GetLobToolsRepository();
		bool MigrationsExecuted { get; set; }
	}
}