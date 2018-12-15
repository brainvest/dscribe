using System.Collections.Generic;

namespace Brainvest.Dscribe.Abstractions.Models.MetadataModels
{
	public class MetadataValidationResponse
	{
		public bool Success { get; set; } = true;
		public List<string> Warnings { get; set; } = new List<string>();
		public List<string> Errors { get; set; } = new List<string>();
	}
}