using Microsoft.EntityFrameworkCore;

namespace dotnet_app
{
    public class TravelBlogDbContext(DbContextOptions<TravelBlogDbContext> options) : DbContext(options)
    {
        public DbSet<TravelBlog> TravelBlogs { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Global query filter: only include TravelBlog entities where Type == "Travel"
            modelBuilder.Entity<TravelBlog>().HasQueryFilter(b => b.Type == "Travel");

            // Example: configure TravelBlog fields if needed
            modelBuilder.Entity<TravelBlog>(entity =>
            {
                entity.ToTable("Blog", "public");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Title).IsRequired().HasMaxLength(200);
                entity.Property(e => e.Content).IsRequired();
                entity.Property(e => e.Type).IsRequired().HasMaxLength(50);
                entity.Property(e => e.Status).IsRequired().HasMaxLength(50);
                entity.OwnsOne(blog => blog.BlogData, ownedNavigationBuilder =>
                {
                    ownedNavigationBuilder.ToJson();
                });
            });
        }
    }
}