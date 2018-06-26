using System;

namespace Brainvest.Dscribe.Metadata
{
	public abstract class Facet<TData> : Facet
	{
		public Facet(Type ownerType, string facetName)
			: base(ownerType, facetName)
		{

		}

		public abstract TData GetValue(IFacetOwner facetOwner);
		public abstract void SetValue(IFacetOwner source, TData value);
	}
}