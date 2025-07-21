namespace dotnet_app
{
    public class BlogTravel : Blog
    {
        public BlogTravel()
        {
            // Set the discriminator value for this type.
            Type = "Travel";
        }
    }

    public class BlogOther : Blog
    {
        public BlogOther()
        {
            // Set the discriminator value for this type.
            Type = "Other";
        }
    }

    /// <summary>
    /// A single, unified class to hold all possible data fields for any blog type.
    /// Properties are nullable to accommodate fields that don't apply to every type.
    /// </summary>
    public class BlogData
    {
        // Properties from BlogTravelData
        public decimal? AirTicketFee { get; set; }
        public decimal? HotelFee { get; set; }

        // Properties from BlogOtherData
        public int? Quantity { get; set; }
        public string? Unit { get; set; }
        public decimal? UnitPrice { get; set; }
    }
}
