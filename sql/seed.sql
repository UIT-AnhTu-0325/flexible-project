INSERT INTO public."Blog"
("Id", "Title", "Content", "Status", "BlogData", "Type")
VALUES(1, 'Welcome to the Blog', 'This is the first post in your blog!', 'Published', NULL, 'Travel');
INSERT INTO public."Blog"
("Id", "Title", "Content", "Status", "BlogData", "Type")
VALUES(2, 'Getting Started', 'Here are some tips to get started with your new app.', 'Draft', NULL, 'Travel');
INSERT INTO public."Blog"
("Id", "Title", "Content", "Status", "BlogData", "Type")
VALUES(3, 'Tech News', 'Latest updates in the tech world.', 'Archived', NULL, 'Other');
INSERT INTO public."Blog"
("Id", "Title", "Content", "Status", "BlogData", "Type")
VALUES(5, 'Random Thoughts', 'Just sharing some random thoughts today.', 'Draft', NULL, 'Other');
INSERT INTO public."Blog"
("Id", "Title", "Content", "Status", "BlogData", "Type")
VALUES(4, 'Project Update', 'We have just released a new feature.', 'Published', '{"Unit": "22", "Quantity": 12, "UnitPrice": 333}'::jsonb, 'Other');
INSERT INTO public."Blog"
("Id", "Title", "Content", "Status", "BlogData", "Type")
VALUES(16, 'Travel Blog', 'Content for travel', 'Archived', '{"HotelFee": 133, "AirTicketFee": 1231231}'::jsonb, 'Travel');

INSERT INTO public."BlogFormConfig"
("Id", "FieldName", "FieldType", "BlogType", "FieldKey", "VisibleWhenStatus", "RequiredWhenStatus", "EditWhenStatus", "Order", "ColSpan", "CustomComponent")
VALUES(5, 'Title', 'text', 'Travel', 'title', 'Draft,Published,Archived', 'Draft', 'Draft', 0, 0, NULL);
INSERT INTO public."BlogFormConfig"
("Id", "FieldName", "FieldType", "BlogType", "FieldKey", "VisibleWhenStatus", "RequiredWhenStatus", "EditWhenStatus", "Order", "ColSpan", "CustomComponent")
VALUES(11, 'Title', 'text', 'Other', 'title', 'Draft,Published,Archived', 'Draft', 'Draft', 0, 0, NULL);
INSERT INTO public."BlogFormConfig"
("Id", "FieldName", "FieldType", "BlogType", "FieldKey", "VisibleWhenStatus", "RequiredWhenStatus", "EditWhenStatus", "Order", "ColSpan", "CustomComponent")
VALUES(6, 'Content', 'textarea', 'Travel', 'content', 'Draft,Published,Archived', 'Draft,Archived', 'Draft,Archived', 1, 0, NULL);
INSERT INTO public."BlogFormConfig"
("Id", "FieldName", "FieldType", "BlogType", "FieldKey", "VisibleWhenStatus", "RequiredWhenStatus", "EditWhenStatus", "Order", "ColSpan", "CustomComponent")
VALUES(12, 'Content', 'textarea', 'Other', 'content', 'Draft,Published,Archived', 'Draft,Archived', 'Draft,Archived', 1, 0, NULL);
INSERT INTO public."BlogFormConfig"
("Id", "FieldName", "FieldType", "BlogType", "FieldKey", "VisibleWhenStatus", "RequiredWhenStatus", "EditWhenStatus", "Order", "ColSpan", "CustomComponent")
VALUES(15, 'Quantity', 'number', 'Other', 'blogData.quantity', 'Published,Archived', 'Published', 'Published,Archived', 3, 0, NULL);
INSERT INTO public."BlogFormConfig"
("Id", "FieldName", "FieldType", "BlogType", "FieldKey", "VisibleWhenStatus", "RequiredWhenStatus", "EditWhenStatus", "Order", "ColSpan", "CustomComponent")
VALUES(16, 'Unit', 'text', 'Other', 'blogData.unit', 'Published,Archived', 'Published', 'Published,Archived', 4, 0, NULL);
INSERT INTO public."BlogFormConfig"
("Id", "FieldName", "FieldType", "BlogType", "FieldKey", "VisibleWhenStatus", "RequiredWhenStatus", "EditWhenStatus", "Order", "ColSpan", "CustomComponent")
VALUES(17, 'UnitPrice', 'number', 'Other', 'blogData.unitPrice', 'Published', NULL, 'Published', 5, 0, NULL);
INSERT INTO public."BlogFormConfig"
("Id", "FieldName", "FieldType", "BlogType", "FieldKey", "VisibleWhenStatus", "RequiredWhenStatus", "EditWhenStatus", "Order", "ColSpan", "CustomComponent")
VALUES(7, 'Status', 'text', 'Travel', 'status', 'Published,Archived', NULL, NULL, 2, 0, NULL);
INSERT INTO public."BlogFormConfig"
("Id", "FieldName", "FieldType", "BlogType", "FieldKey", "VisibleWhenStatus", "RequiredWhenStatus", "EditWhenStatus", "Order", "ColSpan", "CustomComponent")
VALUES(9, 'AirTicketFee', 'number', 'Travel', 'blogData.airTicketFee', 'Published,Archived', NULL, 'Published,Archived', 3, 0, NULL);
INSERT INTO public."BlogFormConfig"
("Id", "FieldName", "FieldType", "BlogType", "FieldKey", "VisibleWhenStatus", "RequiredWhenStatus", "EditWhenStatus", "Order", "ColSpan", "CustomComponent")
VALUES(10, 'HotelFee', 'number', 'Travel', 'blogData.hotelFee', 'Published,Archived', NULL, 'Published,Archived', 4, 0, NULL);
INSERT INTO public."BlogFormConfig"
("Id", "FieldName", "FieldType", "BlogType", "FieldKey", "VisibleWhenStatus", "RequiredWhenStatus", "EditWhenStatus", "Order", "ColSpan", "CustomComponent")
VALUES(13, 'Status', 'text', 'Other', 'status', 'Published,Archived', NULL, NULL, 2, 0, NULL);