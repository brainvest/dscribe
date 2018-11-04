namespace Brainvest.Dscribe.LobTools.Entities
{
	public class ProcessingException
	{
		public int Id { get; set; }

		public string FullInfo { get; set; }
		public string StackTrace { get; set; }
		public int Hash { get; set; }
	}
}