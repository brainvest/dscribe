using System;

namespace Brainvest.Dscribe.MetadataDbAccess.Entities
{
	public class EntityActionType
	{
		public EntityActionTypeEnum Id { get; set; }
		public string Name { get; set; }
	}

	[Flags]
	public enum EntityActionTypeEnum
	{
		List = 1,
		Insert = 4,
		Delete = 8,
		Update = 16,
		Other = 32
	}
}