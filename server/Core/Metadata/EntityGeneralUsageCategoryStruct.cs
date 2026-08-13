namespace Brainvest.Dscribe.Metadata;

using System;

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
