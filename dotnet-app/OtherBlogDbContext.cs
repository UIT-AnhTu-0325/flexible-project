using Microsoft.EntityFrameworkCore;

namespace dotnet_app
{
    public class OtherBlogDbContext(DbContextOptions<OtherBlogDbContext> options) : DbContext(options)
    {
        public DbSet<OtherBlog> OtherBlogs { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Global query filter: only include OtherBlog entities where Type == "Other"
            modelBuilder.Entity<OtherBlog>().HasQueryFilter(b => b.Type == "Other");

            // Example: configure OtherBlog fields if needed
            modelBuilder.Entity<OtherBlog>(entity =>
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