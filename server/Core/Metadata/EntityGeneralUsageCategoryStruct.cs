using System;

namespace Brainvest.Dscribe.Metadata
{
	public struct EntityGeneralUsageCategoryStruct : IEquatable<EntityGeneralUsageCategoryStruct>
	{
		public int EntityGeneralUsageCategoryId { get; set; }
		public string Name { get; set; }

		public bool Equals(EntityGeneralUsageCategoryStruct other)
		{
			return EntityGeneralUsageCategoryId == other.EntityGeneralUsageCategoryId
				&& Name == other.Name;
		}
	}
}