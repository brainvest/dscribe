using Brainvest.Dscribe.Abstractions.Metadata;
using System;
using System.Collections.Generic;
using System.Text;

namespace Brainvest.Dscribe.Abstractions
{
	public interface IImplementationsContainer
	{
		IInstanceInfo InstanceInfo { get; }
		IMetadataModel SemanticModel { get; }
		IBusinessReflector Reflector { get; }
		IMetadataCache Semantic { get; }
		Func<object> RepositoryFactory { get; }
		bool MigrationsExecuted { get; set; }
	}
}