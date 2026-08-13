using System;
using Microsoft.EntityFrameworkCore;

namespace Brainvest.Dscribe.Abstractions
{
	public interface IBusinessRepositoryFactory
	{
		IDisposable GetDbContext(DbContextOptions options);
	}
}