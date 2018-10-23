namespace Brainvest.Dscribe.Infrastructure.SampleAuthServer.Models
{
	public class ConfigModel
	{
		public string ApplicationName { get; set; }
		public string Organization { get; set; }
		public string Description { get; set; }
		public bool AllowRegistration { get; set; }
		public string PathBase { get; set; }
	}
}