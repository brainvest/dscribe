using System;
using System.Collections.Generic;

namespace Brainvest.Dscribe.Metadata
{
	public class Facet<TOwner, TData> : Facet<TData>
		where TOwner : class, IFacetOwner
	{
		private Dictionary<WeakReference<IFacetOwner>, TData> _values;
		public TData DefaultValue { get; protected set; }

		public Facet(Type ownerType, string facetName, TData defaultValue)
			: base(ownerType, facetName)
		{
			_values = new Dictionary<WeakReference<IFacetOwner>, TData>();
			DefaultValue = defaultValue;
		}

		public override TData GetValue(IFacetOwner owner)
		{
			TData value;
			if (_values.TryGetValue(owner.WeakReference, out value))
			{
				return value;
			}
			return GetDefaultValue(owner as TOwner);
		}

		public override void SetValue(IFacetOwner source, TData value)
		{
			_values[source.WeakReference] = value;
		}

		protected virtual TData GetDefaultValue(TOwner owner)
		{
			return DefaultValue;
		}

		public override void ClearValue(FacetOwner owner)
		{
			if (_values.ContainsKey(owner.WeakReference))
			{
				_values.Remove(owner.WeakReference);
			}
		}
	}
}