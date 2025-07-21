using Microsoft.EntityFrameworkCore;

namespace dotnet_app
{
    public class BlogDbContext : DbContext
    {
        public BlogDbContext(DbContextOptions<BlogDbContext> options) : base(options) { }
        public DbSet<Blog> Blogs { get; set; }
        public DbSet<BlogFormConfig> BlogFormConfigs { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<Blog>(entity =>
            {
                entity.ToTable("Blog", "public");

                // Configure common properties. These will be applied to the columns
                // in the single "Blog" table.
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Title).IsRequired().HasMaxLength(200);
                entity.Property(e => e.Content).IsRequired();
                entity.Property(e => e.Status).IsRequired().HasMaxLength(20);

                // Configure Table-Per-Hierarchy (TPH) inheritance.
                // This uses a "discriminator" column to store the type of blog in each row.
                // We'll use the existing "Type" property for this.
                entity.HasDiscriminator(b => b.Type)
                      .HasValue<BlogTravel>("Travel")
                      .HasValue<BlogOther>("Other");

                entity.Property(e => e.Type).IsRequired();

                // Configure the single, unified BlogData property to be stored in one JSON column.
                // EF Core can now query into this JSON column.
                entity.OwnsOne(b => b.BlogData, ownedBuilder =>
                {
                    ownedBuilder.ToJson("BlogData");
                });
            });

            modelBuilder.Entity<BlogFormConfig>(entity =>
            {
                entity.ToTable("BlogFormConfig", "public");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.FieldName).IsRequired().HasMaxLength(100);
                entity.Property(e => e.FieldType).IsRequired().HasMaxLength(50);
            });
        }
    }
}
