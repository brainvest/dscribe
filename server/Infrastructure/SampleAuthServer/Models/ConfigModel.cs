namespace Brainvest.Dscribe.Infrastructure.SampleAuthServer.Models
{
	public class ConfigModel
	{
		public string ApplicationName { get; set; }
		public string Organization { get; set; }
		public string Description { get; set; }
		public bool AllowRegistration { get; set; }
		public string PathBase { get; set; }
		public PasswordConfigModel Password { get; set; }
		public int MyProperty { get; set; }
		public SignInConfigModel SignIn { get; set; }
		public EmailConfigModel Email { get; set; }
	}

	public class SignInConfigModel
	{
		public bool RequireConfirmedEmail { get; set; }
	}

	public class EmailConfigModel
	{
		public string Server { get; set; }
		public int? Port { get; set; }
		public string Username { get; set; }
		public string Password { get; set; }
		public string From { get; set; }
	}

	public class PasswordConfigModel
	{
		public bool RequireDigit { get; set; } = true;
		public bool RequireLowercase { get; set; } = true;
		public bool RequireNonAlphanumeric { get; set; } = true;
		public bool RequireUppercase { get; set; } = true;
		public int RequiredLength { get; set; } = 6;
		public int RequiredUniqueChars { get; set; } = 1;
	}
}