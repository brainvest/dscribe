namespace Brainvest.Dscribe.LobTools.Entities;

using Brainvest.Dscribe.Abstractions.Models;

public class DataLog
{
	public long Id { get; set; }
	public string Body { get; set; }
	public DataRequestAction DataRequestAction { get; set; }
	public RequestLog RequestLog { get; set; }
	public long RequestLogId { get; set; }
	public string DataId { get; set; }
	public long EntityId { get; set; }
}
