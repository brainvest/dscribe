namespace Brainvest.Dscribe.MetadataDbAccess.Entities;

using System;

public class User
{
	public Guid Id { get; set; }

	public string ExternalUserId { get; set; }
	public string UnifiedExternalUserId { get; set; }
	public string Username { get; set; }
	public string Name { get; set; }
	public string Email { get; set; }
}
