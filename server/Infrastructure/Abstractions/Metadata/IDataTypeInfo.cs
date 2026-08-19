namespace Brainvest.Dscribe.Abstractions.Metadata;

using System;

public interface IDataTypeInfo
{
	Type GetClrType();
	string ClrType { get; }
	bool IsValueType { get; }
}
