namespace dotnet_app
{
    public class TravelBlog : BaseBlog
    {
        public TravelBlog()
        {
            // Set the discriminator value for this type.
            Type = "Travel";
        }
        public TravelBlogData BlogData { get; set; } = new TravelBlogData();
    }

    public class OtherBlog : BaseBlog
    {
        public OtherBlog()
        {
            // Set the discriminator value for this type.
            Type = "Other";
        }
        public OtherBlogData BlogData { get; set; } = new OtherBlogData();
    }

    public class TravelBlogData
    {
        public decimal AirTicketFee { get; set; }
        public decimal HotelFee { get; set; }
        public decimal Blog { get; set; }

        public decimal ReplaceBlog { get; set; }
    }

    public class OtherBlogData
    {
        public int Quantity { get; set; }
        public string Unit { get; set; } = string.Empty;
        public decimal UnitPrice { get; set; }
    }
}
