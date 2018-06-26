using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Brainvest.Dscribe.Metadata
{
	public interface IMetadataFacet<TDefaultValueDiscriminator>
		where TDefaultValueDiscriminator : struct
	{
		void AddDefaultValue(TDefaultValueDiscriminator? discriminator, string defaultValue);
	}
}