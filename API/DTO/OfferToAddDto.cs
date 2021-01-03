namespace API.DTO
{
    public class OfferToAddDto
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public int Price { get; set; }
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