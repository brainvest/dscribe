using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Brainvest.Dscribe.MetadataDbAccess.Entities.Security
{
	public class EntityPermission
	{
		public int Id { get; set; }

		public int EntityId { get; set; }
		public Entity Entity { get; set; }

		public Guid? RoleId { get; set; }
		public Role Role { get; set; }

		public Guid? UserId { get; set; }
		public User User { get; set; }

		public EntityActionTypeEnum ActionTypeId { get; set; }
		public EntityActionType ActionType { get; set; }

		[Column(TypeName = "varchar(200)")]
		public string ActionName { get; set; }

		public bool Deny { get; set; }
	}
}