using Brainvest.Dscribe.Abstractions;

namespace Brainvest.Dscribe.MetadataDbAccess.Entities.Workflows
{
	public class Trigger
	{
		public int Id { get; set; }

		public int WorkflowId { get; set; }
		public Workflow Workflow { get; set; }

		public int EntityTypeId { get; set; }
		public EntityType EntityType { get; set; }

		public ActionTypeEnum ActionType { get; set; }

		public int StateId { get; set; }
		public State State { get; set; }
	}
}