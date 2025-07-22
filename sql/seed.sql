INSERT INTO public."BlogFormConfig"
("Id", "FieldName", "FieldType", "BlogType", "FieldKey", "VisibleWhenStatus", "RequiredWhenStatus", "EditWhenStatus", "Order")
VALUES(5, 'Title', 'text', 'Travel', 'title', 'Draft,Published,Archived', 'Draft', 'Draft', 0);
INSERT INTO public."BlogFormConfig"
("Id", "FieldName", "FieldType", "BlogType", "FieldKey", "VisibleWhenStatus", "RequiredWhenStatus", "EditWhenStatus", "Order")
VALUES(11, 'Title', 'text', 'Other', 'title', 'Draft,Published,Archived', 'Draft', 'Draft', 0);
INSERT INTO public."BlogFormConfig"
("Id", "FieldName", "FieldType", "BlogType", "FieldKey", "VisibleWhenStatus", "RequiredWhenStatus", "EditWhenStatus", "Order")
VALUES(6, 'Content', 'textarea', 'Travel', 'content', 'Draft,Published,Archived', 'Draft,Archived', 'Draft,Archived', 1);
INSERT INTO public."BlogFormConfig"
("Id", "FieldName", "FieldType", "BlogType", "FieldKey", "VisibleWhenStatus", "RequiredWhenStatus", "EditWhenStatus", "Order")
VALUES(12, 'Content', 'textarea', 'Other', 'content', 'Draft,Published,Archived', 'Draft,Archived', 'Draft,Archived', 1);
INSERT INTO public."BlogFormConfig"
("Id", "FieldName", "FieldType", "BlogType", "FieldKey", "VisibleWhenStatus", "RequiredWhenStatus", "EditWhenStatus", "Order")
VALUES(15, 'Quantity', 'number', 'Other', 'blogData.quantity', 'Published,Archived', 'Published', 'Published,Archived', 3);
INSERT INTO public."BlogFormConfig"
("Id", "FieldName", "FieldType", "BlogType", "FieldKey", "VisibleWhenStatus", "RequiredWhenStatus", "EditWhenStatus", "Order")
VALUES(16, 'Unit', 'text', 'Other', 'blogData.unit', 'Published,Archived', 'Published', 'Published,Archived', 4);
INSERT INTO public."BlogFormConfig"
("Id", "FieldName", "FieldType", "BlogType", "FieldKey", "VisibleWhenStatus", "RequiredWhenStatus", "EditWhenStatus", "Order")
VALUES(17, 'UnitPrice', 'number', 'Other', 'blogData.unitPrice', 'Published', NULL, 'Published', 5);
INSERT INTO public."BlogFormConfig"
("Id", "FieldName", "FieldType", "BlogType", "FieldKey", "VisibleWhenStatus", "RequiredWhenStatus", "EditWhenStatus", "Order")
VALUES(7, 'Status', 'text', 'Travel', 'status', 'Published,Archived', NULL, NULL, 2);
INSERT INTO public."BlogFormConfig"
("Id", "FieldName", "FieldType", "BlogType", "FieldKey", "VisibleWhenStatus", "RequiredWhenStatus", "EditWhenStatus", "Order")
VALUES(9, 'AirTicketFee', 'number', 'Travel', 'blogData.airTicketFee', 'Published,Archived', NULL, 'Published,Archived', 3);
INSERT INTO public."BlogFormConfig"
("Id", "FieldName", "FieldType", "BlogType", "FieldKey", "VisibleWhenStatus", "RequiredWhenStatus", "EditWhenStatus", "Order")
VALUES(10, 'HotelFee', 'number', 'Travel', 'blogData.hotelFee', 'Published,Archived', NULL, 'Published,Archived', 4);
INSERT INTO public."BlogFormConfig"
("Id", "FieldName", "FieldType", "BlogType", "FieldKey", "VisibleWhenStatus", "RequiredWhenStatus", "EditWhenStatus", "Order")
VALUES(13, 'Status', 'text', 'Other', 'status', 'Published,Archived', NULL, NULL, 2);