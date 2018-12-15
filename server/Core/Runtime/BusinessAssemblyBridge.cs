using Brainvest.Dscribe.Abstractions;
using Microsoft.Extensions.Logging;
using System;
using System.Composition.Hosting;
using System.IO;
using System.Linq;
using System.Reflection;

namespace Brainvest.Dscribe.Runtime
{
	//[DebuggerNonUserCode]
	public class BusinessAssemblyBridge : IDisposable
	{
		private readonly ILogger _logger;
		private CompositionHost _container;
		private InstanceInfo _instanceInfo;
		private IGlobalConfiguration _configuration;
		private string _instanceName;

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
			_instanceInfo = instanceInfo;
			_configuration = configuration;
			_instanceName = instanceInfo.InstanceName;

			var containerConfiguration = new ContainerConfiguration();
			Assembly assembly;
			if (string.IsNullOrWhiteSpace(instanceInfo.InstanceSettings?.LoadBusinessFromAssemblyName))
			{
				assembly = LoadAssemblyFromPath();
			}
			else
			{
				assembly = AppDomain.CurrentDomain.GetAssemblies()
					.FirstOrDefault(x => x.GetName().Name == instanceInfo.InstanceSettings.LoadBusinessFromAssemblyName);
				if (assembly == null)
				{
					_logger.LogError($"Could find assembly:{instanceInfo.InstanceSettings.LoadBusinessFromAssemblyName}");
				}
			}
			if (assembly == null)
			{
				return;
			}
			try
			{
				containerConfiguration.WithAssembly(assembly);
				_container = containerConfiguration.CreateContainer();
			}
			catch (Exception ex)
			{
				_logger.LogError(ex, $"Could not compose assembly:{assembly.FullName}");
			}
		}

		private Assembly LoadAssemblyFromPath()
		{
			var directory = Path.Combine(_configuration.ImplementationsDirectory, _instanceName);
			if (!Directory.Exists(directory))
			{
				_logger.LogError($"The directory {directory} was not found");
				return null;
			}
			var fileName = Path.Combine(directory, _instanceName + ".dll");
			var modificationDate = File.GetLastWriteTime(fileName);
			var tempRoot = _configuration.TempDirectory;
			if (!Directory.Exists(tempRoot))
			{
				Directory.CreateDirectory(tempRoot);
			}
			var tempPath = Path.Combine(tempRoot, _instanceName + modificationDate.ToString("yyyyMMddHHmmss"));
			if (!Directory.Exists(tempPath))
			{
				Directory.CreateDirectory(tempPath);
			}
			var targetFileName = _instanceName + ".dll";
			var targetFilePath = Path.Combine(tempPath, targetFileName);
			if (!Directory.GetFiles(tempPath).Any(x => Path.GetFileName(x).Equals(targetFileName, StringComparison.InvariantCultureIgnoreCase)))
			{
				try
				{
					File.Copy(fileName, targetFilePath);
				}
				catch (Exception ex)
				{
					_logger.LogError(ex, $"Could not copy {fileName} to {Path.Combine(tempPath, targetFileName)}");
				}
			}
			try
			{
				return Assembly.LoadFrom(targetFilePath);
			}
			catch (Exception ex)
			{
				_logger.LogError(ex, $"Could not load assembly:{targetFileName}");
				return null;
			}
		}

		public void Dispose()
		{
			_container.Dispose();
		}
	}
}