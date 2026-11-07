namespace Brainvest.Dscribe.Infrastructure.SampleAuthServer.Models;

using System.ComponentModel.DataAnnotations;

public class LoginRequestModel
{
	[Required]
	public string Username { get; set; }
	[Required]
	public string Password { get; set; }
}

public class TokenResponseModel
{
	public string AccessToken { get; set; }
}
