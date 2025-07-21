using System.Text.Json;
using Microsoft.EntityFrameworkCore;

namespace dotnet_app
{
    public class BlogDbContext(DbContextOptions<BlogDbContext> options) : DbContext(options)
    {
        public DbSet<Blog> Blogs { get; set; }
        public DbSet<BlogFormConfig> BlogFormConfigs { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configure common properties for the base Blog entity
            modelBuilder.Entity<Blog>(entity =>
            {
                entity.ToTable("Blog", "public");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Title).IsRequired().HasMaxLength(200);
                entity.Property(e => e.Content).IsRequired();
                entity.Property(e => e.Type).IsRequired().HasMaxLength(50);
                entity.Property(e => e.Status).IsRequired().HasMaxLength(50);
                entity.Property(e => e.BlogData)
                    .HasColumnType("jsonb") // Assuming you want to store BlogData as JSON
                    .HasConversion(
                        v => JsonSerializer.Serialize(v, JsonSerializerOptions.Default),
                        v => JsonSerializer.Deserialize<object>(v, JsonSerializerOptions.Default));
            });

            // Configure BlogFormConfig
            modelBuilder.Entity<BlogFormConfig>(entity =>
            {
                entity.ToTable("BlogFormConfig", "public");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.FieldName).IsRequired().HasMaxLength(100);
                entity.Property(e => e.FieldType).IsRequired().HasMaxLength(50);
                entity.Property(e => e.BlogType).IsRequired().HasMaxLength(50);
                entity.Property(e => e.FieldKey).IsRequired().HasMaxLength(100);
                entity.Property(e => e.VisibleWhenStatus).HasMaxLength(100);
                entity.Property(e => e.RequiredWhenStatus).HasMaxLength(100);
                entity.Property(e => e.EditWhenStatus).HasMaxLength(100);
                entity.Property(e => e.Order);
            });
        }
    }
}
