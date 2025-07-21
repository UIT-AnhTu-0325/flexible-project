namespace dotnet_app
{
    public class BlogTravel : Blog
    {
        public BlogTravel()
        {
            // Set the discriminator value for this type.
            Type = "Travel";
        }
        public BlogTravelData BlogData { get; set; } = new BlogTravelData();
    }

    public class BlogOther : Blog
    {
        public BlogOther()
        {
            // Set the discriminator value for this type.
            Type = "Other";
        }
        public BlogOtherData BlogData { get; set; } = new BlogOtherData();
    }

    public class BlogTravelData
    {
        public decimal AirTicketFee { get; set; }
        public decimal HotelFee { get; set; }
    }

    public class BlogOtherData
    {
        public int Quantity { get; set; }
        public string Unit { get; set; } = string.Empty;
        public decimal UnitPrice { get; set; }
    }
}
