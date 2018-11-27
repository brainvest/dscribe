using Brainvest.Dscribe.Abstractions.Metadata;
using System.Collections;
using System.Collections.Generic;

namespace Brainvest.Dscribe.Abstractions
{
	public interface IActionContextInfo
	{
		IActionContextInfo Parent { get; }
		ActionContextType Type { get; }
		IEnumerable CurrentList { get; }
		object CurrentEntity { get; }
		IEntityTypeMetadata EntityType { get; }
		IPropertyMetadata Property { get; }
		IEnumerable<IMasterReference> Masters { get; }
		IEnumerable<string> ExcludedProperties { get; }
	}

	public enum ActionContextType
	{
		List,
		Add,
		Edit
	}

	public interface IMasterReference
	{
		object Master { get; }
		IPropertyMetadata MasterProperty { get; }
	}
}