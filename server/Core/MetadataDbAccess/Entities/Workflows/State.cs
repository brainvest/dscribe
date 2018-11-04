using System.Collections.Generic;

namespace Brainvest.Dscribe.MetadataDbAccess.Entities.Workflows
{
	public class State
	{
		public int Id { get; set; }

		public int WorkflowId { get; set; }
		public Workflow Workflow { get; set; }

		public string Title { get; set; }

		public ICollection<Transition> IncommingTransitions { get; set; }
		public ICollection<Transition> OutgoingTransitions { get; set; }
	}
}