namespace Brainvest.Dscribe.Metadata;

using System;
using System.Collections.Generic;

public abstract class Facet
{
	public string FacetName { get; private set; }

	public Facet(Type ownerType, string facetName)
	{
		if (facetName.EndsWith(nameof(Facet)))
		{
			FacetName = facetName.Substring(0, facetName.Length - nameof(Facet).Length);
		}
		else
		{
			FacetName = facetName;
		}
		var ownerFacets = FacetOwner.FacetRegistry.GetOrAdd(ownerType, (t) => []);
		ownerFacets.Add(this);
	}

	public abstract void ClearValue(FacetOwner owner);
}
