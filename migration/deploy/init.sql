-- Deploy denrees:init to pg
BEGIN;

DROP TABLE IF EXISTS 
    product_has_tag, 
    "role", 
    "user", 
    "tag", 
    "product"
;

CREATE TABLE "role"(
	id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	"role" TEXT NOT NULL UNIQUE DEFAULT 'utilisateur',
    "designation" TEXT,
	createAt TIMESTAMPTZ NOT NULL DEFAULT NOW(),
	updateAt TIMESTAMPTZ
);
CREATE TABLE "user"(
	id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	"user_name" TEXT NOT NULL UNIQUE,
	email TEXT NOT NULL UNIQUE,
	"password" TEXT NOT NULL,
	"role_id" INT NOT NULL REFERENCES "role"(id),
	createAt TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updateAt TIMESTAMPTZ
);



CREATE TABLE "product"(
	id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	title TEXT NOT NULL,
	designation TEXT NOT NULL,
	"category" TEXT NOT NULL,
	"url_image" TEXT,
	"date_limit" TIMESTAMP NOT NULL,
	createAt TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updateAt TIMESTAMPTZ,
    "user_id" INT NOT NULL REFERENCES "user"(id)
);
CREATE TABLE "tag"(
	id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	"name" TEXT NOT NULL UNIQUE,
	color TEXT NOT NULL,
	createAt TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updateAt TIMESTAMPTZ
);
CREATE TABLE product_has_tag(
	id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	"product_id" INTEGER NOT NULL REFERENCES "product"("id")  ON DELETE CASCADE,
	"tag_id" INTEGER NOT NULL REFERENCES "tag"("id")  ON DELETE CASCADE, 
	"created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW()
); 


COMMIT;


