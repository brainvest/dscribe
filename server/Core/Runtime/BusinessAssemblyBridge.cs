using Brainvest.Dscribe.Abstractions;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Composition.Hosting;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Runtime.Loader;
using System.Text;

namespace Brainvest.Dscribe.Runtime
{
	//[DebuggerNonUserCode]
	public class BusinessAssemblyBridge : IDisposable
	{
		private readonly ILogger _logger;
		private CompositionHost _container;
		public IBusinessRepositoryFactory BusinessDbContextFactory
		{
			get
			{
				if (_container == null)
				{
					return null;
				}
				return _container.GetExport<IBusinessRepositoryFactory>();
			}
		}

		public BusinessAssemblyBridge(InstanceInfo instanceInfo, IGlobalConfiguration configuration, ILogger logger)
		{
			_logger = logger;

			var containerConfiguration = new ContainerConfiguration();
			var instanceName = instanceInfo.InstanceName;
			var directory = Path.Combine(configuration.ImplementationsDirectory, instanceName);
			if (!Directory.Exists(directory))
			{
				logger.LogError($"The directory {directory} was not found");
				return;
			}
			var fileName = Path.Combine(directory, instanceName + ".dll");
			var modificationDate = File.GetLastWriteTime(fileName);
			var tempRoot = configuration.TempDirectory;
			if (!Directory.Exists(tempRoot))
			{
				Directory.CreateDirectory(tempRoot);
			}
			var tempPath = Path.Combine(tempRoot, instanceName + modificationDate.ToString("yyyyMMddHHmmss"));
			if (!Directory.Exists(tempPath))
			{
				Directory.CreateDirectory(tempPath);
			}
			var targetFileName = instanceName + ".dll";
			var targetFilePath = Path.Combine(tempPath, targetFileName);
			if (!Directory.GetFiles(tempPath).Any(x => Path.GetFileName(x).Equals(targetFileName, StringComparison.InvariantCultureIgnoreCase)))
			{
				try
				{
					File.Copy(fileName, targetFilePath);
				}
				catch
				{
					logger.LogError($"Could not copy {fileName} to {Path.Combine(tempPath, targetFileName)}");
				}
			}
			try
			{
				containerConfiguration.WithAssembly(Assembly.LoadFrom(targetFilePath));
				_container = containerConfiguration.CreateContainer();
			}
			catch
			{
				logger.LogError($"Could not compose assembly:{targetFileName}");
			}
		}

		public void Dispose()
		{
			this._container.Dispose();
		}
	}
}