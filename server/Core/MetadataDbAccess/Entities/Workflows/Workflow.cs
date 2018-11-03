using System.Collections.Generic;

namespace Brainvest.Dscribe.MetadataDbAccess.Entities.Workflows
{
	public class Workflow
	{
		public int Id { get; set; }
		public string Name { get; set; }

		public bool CanStartMaunally { get; set; }

		public ICollection<Trigger> Triggers { get; set; }
		public ICollection<State> States { get; set; }
	}
}