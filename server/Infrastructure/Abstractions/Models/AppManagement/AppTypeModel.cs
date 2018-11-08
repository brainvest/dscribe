using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Brainvest.Dscribe.Abstractions.Models.AppManagement
{
	public class AppTypeModel
	{
		public int Id { get; set; }
		[Required]
		public string Name { get; set; }
		public string Title { get; set; }
	}
}
