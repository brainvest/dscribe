using System;

namespace Brainvest.Dscribe.Metadata
{
	public struct PropertyGeneralUsageCategoryStruct : IEquatable<PropertyGeneralUsageCategoryStruct>
	{
		public int PropertyGeneralUsageCategoryId { get; set; }
		public string Name { get; set; }

		public bool Equals(PropertyGeneralUsageCategoryStruct other)
		{
			return this == other;
		}

		public override bool Equals(object obj)
		{
			return obj is PropertyGeneralUsageCategoryStruct && this == (PropertyGeneralUsageCategoryStruct)obj;
		}

		public override int GetHashCode()
		{
			var hash = 17;
			hash = hash * 23 + PropertyGeneralUsageCategoryId.GetHashCode();
			hash = hash * 23 + (Name == null ? 0 : Name.GetHashCode());
			return hash;
		}

		public static bool operator ==(PropertyGeneralUsageCategoryStruct a, PropertyGeneralUsageCategoryStruct b)
		{
			return a.PropertyGeneralUsageCategoryId == b.PropertyGeneralUsageCategoryId
				&& a.Name == b.Name;
		}

		public static bool operator !=(PropertyGeneralUsageCategoryStruct a, PropertyGeneralUsageCategoryStruct b)
		{
			return !(a == b);
		}
	}
}