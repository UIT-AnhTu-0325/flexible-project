namespace dotnet_app
{
    public class BlogFormConfig
    {
        public int Id { get; set; }
        public string FieldName { get; set; } = string.Empty;
        public string FieldType { get; set; } = string.Empty;
        public string BlogType { get; set; } = string.Empty; // e.g. "Travel", "Other", "Default"
        public string FieldKey { get; set; } = string.Empty; // e.g. "BlogData.Quantity"
    }
}
