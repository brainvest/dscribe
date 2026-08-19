namespace Brainvest.Dscribe.LobTools.Models.History;

using System;
using Brainvest.Dscribe.Abstractions;
using Brainvest.Dscribe.Abstractions.Models.AppManagement;

public class AppInstanceHistoryModel : IHistory
{
	public AppInstanceInfoModel AppInstance { get; set; }
	public DateTime StartTime { get; set; }
	public Guid? UserId { get; set; }
	public double ProcessDuration { get; set; }
	public long LogId { get; set; }
	public string Action { get; set; }
}
