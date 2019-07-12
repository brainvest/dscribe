using System;

namespace Brainvest.Dscribe.LobTools.Entities
{
	public class Workflow
	{
		public int Id { get; set; }

		public string Name { get; set; }

		public Guid Identifier { get; set; }
		public int Version { get; set; }

	}
}