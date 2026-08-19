namespace Brainvest.Dscribe.Abstractions;

using System;
using Microsoft.EntityFrameworkCore;

public interface IBusinessRepositoryFactory
{
	IDisposable GetDbContext(DbContextOptions options);
}
