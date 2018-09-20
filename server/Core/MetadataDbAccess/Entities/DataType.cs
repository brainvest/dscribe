using Brainvest.Dscribe.Abstractions.Metadata;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Brainvest.Dscribe.MetadataDbAccess.Entities
{
	public class DataType : IDataTypeInfo
	{
		public DataTypeEnum Id { get; set; }
		[Column(TypeName = "varchar(200)")]
		public string Name { get; set; }
		[MaxLength(200)]
		public string Identifier { get; set; }
		public string ClrType { get; set; }
		public bool IsValueType { get; set; }

		public Type GetClrType()
		{
			return Type.GetType(ClrType);
		}
	}

	public enum DataTypeEnum
	{
		Int = 1,
		String,
		Bool,
		Date,
		Time,
		DateTime,
		ForeignKey,
		NavigationEntity,
		Enum,
		NavigationList,
		Guid,
		Decimal,
		LongInteger,
		ShortInteger,
		TinyInteger,
		Double
	}
}