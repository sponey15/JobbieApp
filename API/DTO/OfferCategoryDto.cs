namespace API.DTO
{
    public class OfferCategoryDto
    {
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
    }
}