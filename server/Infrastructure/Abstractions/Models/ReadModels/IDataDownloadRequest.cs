namespace Brainvest.Dscribe.Abstractions.Models.ReadModels
{
	public interface IDataDownloadRequest
	{
		DataDownloadFileFormat Format { get; set; }
	}
}