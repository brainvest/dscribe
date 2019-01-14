using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Brainvest.Dscribe.Abstractions
{
	public interface IDataLogImplementation
	{
		Task SaveDataChanges(object businessRepository);
	}
}
