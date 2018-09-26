namespace Brainvest.Dscribe.Abstractions.CodeGeneration
{
	public interface IDiagnosticInfo
	{
		string Message { get; }
	}

	public class DiagnosticInfo : IDiagnosticInfo
	{
		public string Message { get; set; }
	}
}