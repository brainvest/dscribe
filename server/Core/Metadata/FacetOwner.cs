using System;
using System.Collections.Concurrent;
using System.Collections.Generic;

namespace Brainvest.Dscribe.Metadata
{
	public class FacetOwner : IFacetOwner
	{
		internal static readonly ConcurrentDictionary<Type, HashSet<Facet>> FacetRegistry;
		static FacetOwner()
		{
			FacetRegistry = new ConcurrentDictionary<Type, HashSet<Facet>>();
		}

		public FacetOwner()
		{
			WeakReference = new WeakReference<IFacetOwner>(this);
		}

		public T GetFacetValue<T>(Facet<T> facet)
		{
			return facet.GetValue(this);
		}

		public void SetValue<T>(Facet<T> facet, string value)
			where T : IConvertible
		{
			facet.SetValue(this, (T)Convert.ChangeType(value, typeof(T)));
		}

		public void ClearLocalValue(Facet facet)
		{
			throw new NotImplementedException();
		}

		public WeakReference<IFacetOwner> WeakReference { get; private set; }
	}
}