namespace Brainvest.Dscribe.Abstractions.Models.MetadataModels;

using System.Collections.Generic;

public class MetadataValidationResponse
{
	public bool Success { get; set; } = true;
	public List<string> Warnings { get; set; } = [];
	public List<string> Errors { get; set; } = [];
}
