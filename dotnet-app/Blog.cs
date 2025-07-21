namespace dotnet_app
{
    // Making the base class abstract is a good practice for TPH
    // as you typically only want to instantiate the derived, concrete types.
    public abstract class Blog
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
        public string Status { get; set; } = "Draft";
        // This will be our "discriminator" column in the database.
        public string Type { get; protected set; }
        public BlogData BlogData { get; set; } = new BlogData();
    }
}
