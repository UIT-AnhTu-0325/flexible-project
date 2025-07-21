using Microsoft.EntityFrameworkCore;
using dotnet_app;
using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// PostgreSQL connection string
var connectionString = "Host=localhost;Port=5432;Database=postgres;Username=postgres;Password=root;";

// Add DbContext for EF Core
builder.Services.AddDbContext<BlogDbContext>(options =>
    options.UseNpgsql(connectionString));

// Add OtherBlogDbContext for EF Core
builder.Services.AddDbContext<OtherBlogDbContext>(options =>
    options.UseNpgsql(connectionString));

// Add TravelBlogDbContext for EF Core
builder.Services.AddDbContext<TravelBlogDbContext>(options =>
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

app.MapGet("/blogs", async ([FromQuery] string type, BlogDbContext db, OtherBlogDbContext otherDb, TravelBlogDbContext travelDb) =>
{
    if (string.IsNullOrEmpty(type))
    {
        return Results.Ok(await db.Blogs.ToListAsync());
    }

    if (type == "Travel")
    {
        return Results.Ok(await travelDb.TravelBlogs.ToListAsync());
    }

    if (type == "Other")
    {
        return Results.Ok(await otherDb.OtherBlogs.ToListAsync());
    }

    return Results.BadRequest("Invalid blog type specified.");
})
.WithName("GetBlogs")
.WithOpenApi();

// Get blog detail by id and type
app.MapGet("/blogs/{id}", async ([FromRoute] int id, [FromQuery] string type, BlogDbContext db, OtherBlogDbContext otherDb, TravelBlogDbContext travelDb) =>
{
    if (string.IsNullOrEmpty(type))
    {
        var blog = await db.Blogs.FindAsync(id);
        return blog != null ? Results.Ok(blog) : Results.NotFound();
    }
    if (type == "Travel")
    {
        var blog = await travelDb.TravelBlogs.FindAsync(id);
        return blog != null ? Results.Ok(blog) : Results.NotFound();
    }
    if (type == "Other")
    {
        var blog = await otherDb.OtherBlogs.FindAsync(id);
        return blog != null ? Results.Ok(blog) : Results.NotFound();
    }
    return Results.BadRequest("Invalid blog type specified.");
})
.WithName("GetBlogDetail")
.WithOpenApi();


app.MapPost("/blogs", async ([FromBody] Blog blog, BlogDbContext db) =>
{
    db.Blogs.Add(blog);
    await db.SaveChangesAsync();
    return Results.Created($"/blogs/{blog.Id}", blog);
})
.WithName("CreateBlog")
.WithOpenApi();

app.Run();