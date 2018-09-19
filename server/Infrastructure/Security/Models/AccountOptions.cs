namespace Brainvest.Dscribe.Security.Models
{
	public class AccountOptions
	{
		public RegistrationMode RegistrationMode { get; set; }
	}

	public enum RegistrationMode
	{
		DenyRegistration,
		RegisterAdminIfNoUsers,
		RegisteredUsersAreInactive
	}
}