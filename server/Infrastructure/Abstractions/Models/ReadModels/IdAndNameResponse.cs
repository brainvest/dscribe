namespace Brainvest.Dscribe.Abstractions.Models.ReadModels;

using System.Collections.Generic;

public class IdAndNameResponse
{
	public string EntityTypeName { get; set; }
	public IEnumerable<NameResponseItem> Names { get; set; }
}

public abstract class NameResponseItem
{
	public string DisplayName { get; set; }
}

public class IdAndNameResponseItem<TId> : NameResponseItem
{
	public TId Id { get; set; }
}
