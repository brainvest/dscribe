namespace Brainvest.Dscribe.Abstractions.CodeGeneration;

using System.Collections.Generic;
using System.Threading.Tasks;
using Brainvest.Dscribe.Abstractions.Metadata;

public interface IBusinessAssemblyGenerator
{
	Task<CodeGenerationResult> GenerateCode(IMetadataCache cache, IInstanceInfo instanceInfo, string path, string instanceName);

	/// <summary>
	/// Reverse engineers the current database schema, diffs it against the model of the loaded business assembly
	/// and produces the SQL needed to bring the database up to date. The SQL is applied unless the app instance
	/// is marked as production, in which case it is only returned for review.
	/// </summary>
	Task<DatabaseMigrationResult> MigrateDatabase(IImplementationsContainer implementationsContainer);
}

public class CodeGenerationResult
{
	public bool Succeeded { get; set; }
	public IEnumerable<IDiagnosticInfo> Diagnostics { get; set; }
	public string SourceCodeFileName { get; set; }
	public string AssemblyFileName { get; set; }
}

public class DatabaseMigrationResult
{
	public bool Succeeded { get; set; }
	/// <summary>True if the commands were executed against the database; false when only the script was produced.</summary>
	public bool Applied { get; set; }
	public IEnumerable<string> SqlCommands { get; set; } = [];
	public IEnumerable<IDiagnosticInfo> Diagnostics { get; set; } = [];
}
