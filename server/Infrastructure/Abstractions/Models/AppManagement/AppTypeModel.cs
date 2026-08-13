namespace Brainvest.Dscribe.Abstractions.Models.AppManagement;

using System.ComponentModel.DataAnnotations;

public class AppTypeModel
{
	public int Id { get; set; }
	[Required]
	public string Name { get; set; }
	public string Title { get; set; }
}
