using System;
using System.Collections.Generic;
using System.Text;

namespace Brainvest.Dscribe.Abstractions.Metadata
{
	public interface IDataTypeInfo
	{
		Type GetClrType();
		string ClrType { get; }
		bool IsValueType { get; }
	}
}