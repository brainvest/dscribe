namespace Brainvest.Dscribe.Infrastructure.SampleAuthServer.Models
{
	public class ConfigModel
	{
		public string ApplicationName { get; set; }
		public string Organization { get; set; }
		public string Description { get; set; }
		public bool AllowRegistration { get; set; }
		public string PathBase { get; set; }
		public PasswordConfig Password { get; set; }
	}

	public class PasswordConfig
	{
		public bool RequireDigit { get; set; } = true;
		public bool RequireLowercase { get; set; } = true;
		public bool RequireNonAlphanumeric { get; set; } = true;
		public bool RequireUppercase { get; set; } = true;
		public int RequiredLength { get; set; } = 6;
		public int RequiredUniqueChars { get; set; } = 1;
	}
}