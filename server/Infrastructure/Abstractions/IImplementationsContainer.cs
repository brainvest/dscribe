using Brainvest.Dscribe.Abstractions.Metadata;
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
		bool MigrationsExecuted { get; set; }
	}
}