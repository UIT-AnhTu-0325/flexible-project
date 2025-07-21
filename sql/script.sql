-- SQL script to create the Blog table in PostgreSQL
CREATE TABLE IF NOT EXISTS public."Blog" (
    "Id" SERIAL PRIMARY KEY,
    "Title" VARCHAR(200) NOT NULL,
    "Content" TEXT NOT NULL
);

-- Insert sample data
INSERT INTO public."Blog" ("Title", "Content") VALUES
('Welcome to the Blog', 'This is the first post in your blog!'),
('Getting Started', 'Here are some tips to get started with your new app.'),
('Tech News', 'Latest updates in the tech world.'),
('Project Update', 'We have just released a new feature.'),
('Random Thoughts', 'Just sharing some random thoughts today.');

-- SQL script to create the BlogFormConfig table in PostgreSQL
CREATE TABLE IF NOT EXISTS public."BlogFormConfig" (
    "Id" SERIAL PRIMARY KEY,
    "FieldName" VARCHAR(100) NOT NULL,
    "FieldType" VARCHAR(50) NOT NULL
);

-- Example config data
INSERT INTO public."BlogFormConfig" ("FieldName", "FieldType") VALUES
('Title', 'text'),
('Content', 'textarea');

-- SQL script to add Status column to Blog table and update sample data
ALTER TABLE public."Blog"
ADD COLUMN "Status" VARCHAR(20) NOT NULL DEFAULT 'Draft';

-- Update sample data with status
UPDATE public."Blog" SET "Status" = 'Published' WHERE "Id" = 1;
UPDATE public."Blog" SET "Status" = 'Draft' WHERE "Id" = 2;
UPDATE public."Blog" SET "Status" = 'Archived' WHERE "Id" = 3;
UPDATE public."Blog" SET "Status" = 'Published' WHERE "Id" = 4;
UPDATE public."Blog" SET "Status" = 'Draft' WHERE "Id" = 5;

-- Add Status field to BlogFormConfig for dynamic form
INSERT INTO public."BlogFormConfig" ("FieldName", "FieldType") VALUES
('Status', 'text');

-- Add BlogData JSONB field to Blog table
ALTER TABLE public."Blog"
ADD COLUMN "BlogData" JSONB;

-- Add Type column to Blog table
ALTER TABLE public."Blog"
ADD COLUMN "Type" VARCHAR(50) NOT NULL DEFAULT 'Other';

-- Example: update Type for existing blogs
UPDATE public."Blog" SET "Type" = 'Travel' WHERE "Id" IN (1, 2);
UPDATE public."Blog" SET "Type" = 'Other' WHERE "Id" NOT IN (1, 2);


-- Add Type field to BlogFormConfig for dynamic form (new statement)
INSERT INTO public."BlogFormConfig" ("FieldName", "FieldType") VALUES ('Type', 'text');