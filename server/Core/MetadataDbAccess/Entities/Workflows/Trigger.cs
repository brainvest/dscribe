namespace Brainvest.Dscribe.MetadataDbAccess.Entities.Workflows;

using Brainvest.Dscribe.Abstractions;

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
