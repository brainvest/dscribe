using Microsoft.EntityFrameworkCore;
using System;

namespace Brainvest.Dscribe.Abstractions
{
	public interface IBusinessRepositoryFactory
	{
		IDisposable GetDbContext(DbContextOptions options);
	}
}