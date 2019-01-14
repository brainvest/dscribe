using Brainvest.Dscribe.Abstractions.Metadata;
using Brainvest.Dscribe.Runtime;
using Moq;
using System;
using System.Collections.Generic;
using System.Text;
using Xunit;

namespace Describe.UnitTests
{
	public class BusinessReflectorUnitTest
	{
		public readonly Mock<IMetadataCache> _fakeMetadataCache = new Mock<IMetadataCache>();

		[Theory]
		[InlineData("int", "Int32")]
		[InlineData("int?", "Nullable`1")]
		[InlineData("long", "Int64")]
		public void GetType_ShouldReturnExpectedValue(string givenValue,string expectedValue)
		{
			// arrange
			var fakeBusinessReflector = new BusinessReflector(_fakeMetadataCache.Object);

			// act
			var response = fakeBusinessReflector.GetType(givenValue);

			// assert
			Assert.Equal(response.Name, expectedValue);
		}
	}
}
