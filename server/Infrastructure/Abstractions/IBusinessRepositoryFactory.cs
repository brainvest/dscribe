using System;
using System.Collections.Generic;
using System.Text;

namespace Brainvest.Dscribe.Abstractions
{
	public interface IBusinessRepositoryFactory
	{
		IDisposable GetDbContext(string connectionString);
	}
}