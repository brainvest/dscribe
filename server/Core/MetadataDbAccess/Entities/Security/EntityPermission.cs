namespace Brainvest.Dscribe.MetadataDbAccess.Entities.Security;

using System;
using System.ComponentModel.DataAnnotations.Schema;
using Brainvest.Dscribe.Abstractions;

public class Permission
{
	public int Id { get; set; }

	public int? EntityTypeId { get; set; }
	public EntityType EntityType { get; set; }

	public Guid? RoleId { get; set; }
	public Role Role { get; set; }

	public Guid? UserId { get; set; }

	public ActionTypeEnum? ActionTypeId { get; set; }
	public EntityActionType ActionType { get; set; }

	[Column(TypeName = "varchar(200)")]
	public string ActionName { get; set; }

	public int? AppInstanceId { get; set; }
	public AppInstance AppInstance { get; set; }

	public PermissionType PermissionType { get; set; }
}
