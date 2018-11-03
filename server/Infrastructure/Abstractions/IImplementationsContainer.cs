using Brainvest.Dscribe.Abstractions.Metadata;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace Brainvest.Dscribe.Abstractions
{
	public interface IImplementationsContainer
	{
		IInstanceInfo InstanceInfo { get; }
		IMetadataModel MetadataModel { get; }
		IBusinessReflector Reflector { get; }
		IMetadataCache Metadata { get; }
		Func<object> RepositoryFactory { get; }
		Func<DbContext> LobToolsRepositoryFactory { get; }
		bool MigrationsExecuted { get; set; }
	}
}