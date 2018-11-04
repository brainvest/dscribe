namespace Brainvest.Dscribe.MetadataDbAccess.Entities.Workflows
{
	public class Transition
	{
		public int Id { get; set; }

		public string Title { get; set; }

		public int FromStateId { get; set; }
		public State FromState { get; set; }

		public int ToStateId { get; set; }
		public State ToState { get; set; }
	}
}
