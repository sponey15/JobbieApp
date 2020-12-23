using System.Collections.Generic;

namespace API.Entities
{
    public class Offer
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int Price { get; set; }
        public string CompanyName { get; set; }
        private OfferCategory offerCategoryName;
        public enum OfferCategory
        {
            Renovation, Painting, Transport, Electrician, Assembly, Electronics, Plumber, Cleaning, Handyman
        }
        public OfferCategory OfferCategoryName
        {
            get { return offerCategoryName; }
            set { offerCategoryName = value; }
        }
        public ICollection<Photo> Photos { get; set; }
    }
}