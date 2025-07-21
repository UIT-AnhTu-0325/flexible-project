
using Microsoft.EntityFrameworkCore;
using dotnet_app;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json.Serialization;
using System.Text.Json.Serialization.Metadata;
using System.Text.Json;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configure JSON options for polymorphic deserialization of Blog objects.
// This allows the API to correctly handle incoming BlogTravel and BlogOther types
// based on the "type" property in the JSON payload.
builder.Services.Configure<Microsoft.AspNetCore.Http.Json.JsonOptions>(options =>
{
    options.SerializerOptions.TypeInfoResolverChain.Insert(0, new BlogPolymorphismTypeResolver());
});

// PostgreSQL connection string
var connectionString = "Host=localhost;Port=5432;Database=postgres;Username=postgres;Password=root";

// Add DbContext for EF Core
builder.Services.AddDbContext<BlogDbContext>(options =>
    options.UseNpgsql(connectionString));

// Add CORS policy for React app
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReact",
        policy => policy.WithOrigins("http://localhost:5173")
                        .AllowAnyHeader()
                        .AllowAnyMethod());
});

var app = builder.Build();

// Use CORS for React app
app.UseCors("AllowReact");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.MapGet("/blog-form-config", (BlogDbContext db) =>
{
    return db.BlogFormConfigs.ToList();
})
    .WithName("GetBlogFormConfig")
    .WithOpenApi();

app.MapGet("/blogs", async ([FromQuery] string type, BlogDbContext db) =>
{
    if (string.IsNullOrEmpty(type))
    {
        return Results.BadRequest("Query parameter 'type' is required.");
    }

    // Use EF Core's OfType<T>() to efficiently query the correct derived type
    // based on the discriminator column in the single "Blog" table.
    if (type == "Travel")
    {
        return Results.Ok(await db.Blogs.OfType<BlogTravel>().ToListAsync());
    }

    if (type == "Other")
    {
        return Results.Ok(await db.Blogs.OfType<BlogOther>().ToListAsync());
    }

    return Results.BadRequest("Invalid blog type specified.");
})
.WithName("GetBlogs")
.WithOpenApi();

app.MapPost("/blogs", async ([FromBody] Blog blog, BlogDbContext db) =>
{
    // Because of the polymorphic deserialization setup, 'blog' is already the correct
    // derived type (BlogTravel or BlogOther). EF Core handles the rest.
    db.Blogs.Add(blog);
    await db.SaveChangesAsync();
    return Results.Created($"/blogs/{blog.Id}", blog);
})
.WithName("CreateBlog")
.WithOpenApi();

app.Run();

// Custom JSON type resolver for handling Blog polymorphism based on the "type" property.
public class BlogPolymorphismTypeResolver : DefaultJsonTypeInfoResolver
{
    public override JsonTypeInfo GetTypeInfo(Type type, JsonSerializerOptions options)
    {
        JsonTypeInfo jsonTypeInfo = base.GetTypeInfo(type, options);

        if (jsonTypeInfo.Type == typeof(Blog))
        {
            jsonTypeInfo.PolymorphismOptions = new JsonPolymorphismOptions
            {
                TypeDiscriminatorPropertyName = "type",
                IgnoreUnrecognizedTypeDiscriminators = true,
                UnknownDerivedTypeHandling = JsonUnknownDerivedTypeHandling.FailSerialization,
                DerivedTypes =
                {
                    new JsonDerivedType(typeof(BlogTravel), "Travel"),
                    new JsonDerivedType(typeof(BlogOther), "Other"),
                }
            };
        }

        return jsonTypeInfo;
    }
}