using System;

namespace Brainvest.Dscribe.Metadata
{
	public abstract class Facet<TData>(Type ownerType, string facetName) : Facet(ownerType, facetName)
	{
		public abstract TData GetValue(IFacetOwner facetOwner);
		public abstract void SetValue(IFacetOwner source, TData value);
	}
}
