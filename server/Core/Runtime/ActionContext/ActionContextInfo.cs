using Brainvest.Dscribe.Abstractions;
using Brainvest.Dscribe.Abstractions.Metadata;
using System.Collections;
using System.Collections.Generic;

namespace Brainvest.Dscribe.Runtime.ActionContext
{
	public class ActionContextInfo : IActionContextInfo
	{
		public IActionContextInfo Parent { get; set; }
		public ActionContextType Type { get; set; }
		public IEnumerable CurrentList { get; set; }
		public object CurrentEntity { get; set; }
		public IEntityTypeMetadata EntityType { get; set; }
		public IPropertyMetadata Property { get; set; }
		public IEnumerable<IMasterReference> Masters { get; set; }
	}

	public class MasterReference : IMasterReference
	{
		public MasterReference(object master, IPropertyMetadata masterProperty)
		{
			Master = master;
			MasterProperty = masterProperty;
		}

		public object Master { get; set; }
		public IPropertyMetadata MasterProperty { get; set; }
	}
}