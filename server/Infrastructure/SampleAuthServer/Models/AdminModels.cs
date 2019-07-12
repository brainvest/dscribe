using System;

namespace Brainvest.Dscribe.Infrastructure.SampleAuthServer.Models
{
	public class UserModel
	{
		public Guid Id { get; set; }
		public string UserName { get; set; }
		public string Email { get; set; }
	}

	public class RoleModel
	{
		public Guid Id { get; set; }
		public string Name { get; set; }
	}

	public class UserRoleModel
	{
		public Guid UserId { get; set; }
		public Guid RoleId { get; set; }
	}
}
