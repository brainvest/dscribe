using System.ComponentModel.DataAnnotations.Schema;

namespace Brainvest.Dscribe.MetadataDbAccess.Entities
{
    public class PropertyBehavior
    {
        public int Id { get; set; }
        
        [ForeignKey(nameof(Property))]
        public int PropertyId { get; set; }
        [ForeignKey(nameof(PropertyId))]
        public Property Property { get; set; }

        [ForeignKey(nameof(AdditionalBehavior))]
        public int AdditionalBehaviorId { get; set; }
        [ForeignKey(nameof(AdditionalBehaviorId))]
        public AdditionalBehavior AdditionalBehavior { get; set; }

        public string Parameters { get; set; }
    }
}
