using System;
using System.Collections.Generic;

namespace Brainvest.Dscribe.Metadata
{
	public abstract class MetadataFacet<TOwner, TData, TDefaultValueDisciminator> : Facet<TOwner, TData>
		, IMetadataFacet<TDefaultValueDisciminator>
		where TOwner : FacetOwner
		where TDefaultValueDisciminator : struct
		where TData : IConvertible
	{
		protected Dictionary<TDefaultValueDisciminator, TData> _defaultValues;

		public MetadataFacet(string name, TData defaultValue)
			: base(typeof(TOwner), name, defaultValue)
		{

		}

		public void ClearDefaultValues()
		{
			if (_defaultValues != null)
			{
				_defaultValues.Clear();
			}
			DefaultValue = default(TData);
		}

		public void AddDefaultValue(TDefaultValueDisciminator? generalBehavior, string value)
		{
			if (generalBehavior.HasValue)
			{
				if (_defaultValues == null)
				{
					_defaultValues = new Dictionary<TDefaultValueDisciminator, TData>();
				}
				_defaultValues.Add(generalBehavior.Value, (TData)Convert.ChangeType(value, typeof(TData)));
			}
			else
			{
				DefaultValue = (TData)Convert.ChangeType(value, typeof(TData));
			}
		}
	}
}