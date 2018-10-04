using System;

namespace Brainvest.Dscribe.Infrastructure.SampleAuthServer.Models
{
	public class ErrorViewModel
	{
		public string RequestId { get; set; }

		public bool ShowRequestId => !string.IsNullOrEmpty(RequestId);
	}
}