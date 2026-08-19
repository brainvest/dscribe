namespace Brainvest.Dscribe.Runtime;

using System.Collections.Generic;
using Brainvest.Dscribe.Abstractions;

public class GlobalConfiguration : IGlobalConfiguration
{
	public string ImplementationsDirectory { get; set; }
	public string TempDirectory { get; set; }
	public Dictionary<string, InstanceSettings> InstanceSettings { get; set; }
	public InstanceSettings DefaultInstanceSettings { get; set; }
	public string[] ExcludeFromRequestLog { get; set; }

	public InstanceSettings GetInstanceSettings(string instaneName)
	{
		if (InstanceSettings == null || instaneName == null)
		{
			return null;
		}
		if (InstanceSettings.TryGetValue(instaneName, out var instanceSettings))
		{
			return instanceSettings;
		}
		return null;
	}
}
