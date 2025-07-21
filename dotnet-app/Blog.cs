namespace dotnet_app
{
    public abstract class BaseBlog
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
        public string Status { get; set; } = "Draft";
        public string Type { get; set; } = string.Empty;
    }

    public class Blog : BaseBlog
    {
        public object? BlogData { get; set; }
    }
}
