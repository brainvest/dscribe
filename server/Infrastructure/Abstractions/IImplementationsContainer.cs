namespace Brainvest.Dscribe.Abstractions;

using System;
using Brainvest.Dscribe.Abstractions.Metadata;
using Microsoft.EntityFrameworkCore;

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
