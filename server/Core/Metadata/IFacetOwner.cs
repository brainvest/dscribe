using System;

namespace Brainvest.Dscribe.Metadata
{
	public interface IFacetOwner
	{
		T GetFacetValue<T>(Facet<T> facet);
		void SetValue<T>(Facet<T> facet, string value)
			where T : IConvertible;
		void ClearLocalValue(Facet facet);
		WeakReference<IFacetOwner> WeakReference { get; }
	}
}