namespace dotnet_app
{
    public class BlogFormConfig
    {
        public int Id { get; set; }
        public string FieldName { get; set; } = string.Empty;
        public string FieldType { get; set; } = string.Empty;
        public string BlogType { get; set; } = string.Empty; // e.g. "Travel", "Other", "Default"
        public string FieldKey { get; set; } = string.Empty; // e.g. "BlogData.Quantity"

        // Show this field only when Blog status matches (comma-separated, e.g. "Published,Draft")
        public string? VisibleWhenStatus { get; set; }
        // Make this field required only when Blog status matches (comma-separated)
        public string? RequiredWhenStatus { get; set; }

        // Make this field editable only when Blog status matches (comma-separated)
        public string? EditWhenStatus { get; set; }
        // Order for UI rendering
        public int Order { get; set; } = 0;
    }
}
