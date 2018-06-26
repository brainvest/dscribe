using System;
using System.Collections.Generic;
using System.Text;

namespace Brainvest.Dscribe.Abstractions.Metadata
{
	public interface IDBFacetDefinition
	{
		int Id { get; set; }
		string Name { get; set; }
		FacetDataType FacetTypeId { get; }
	}
}