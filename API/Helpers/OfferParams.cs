namespace API.Helpers
{
    public class OfferParams : PaginationParams
    {
        public int MinPrice { get; set; } = 0;
        public int MaxPrice { get; set; } = 1000000;
        public string OrderBy { get; set; } = "Id";
    }
}