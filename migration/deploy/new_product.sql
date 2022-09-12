BEGIN;

-- Amélioration de la fonction d'update product
--en utilisant COALESCE on choisi d'utiliser soit la data envoyée par le client, soit l'existant en DB
CREATE OR REPLACE FUNCTION new_product(data json) RETURNS INT AS $$
  INSERT INTO product (title,designation,category,url_image,user_id)
    VALUES (
      data->>'title',
      data->>'designation',
      data->>'category',
      data->>'url_image',
      (data->>'user_id')::INT
    ) RETURNING id
$$ LANGUAGE SQL STRICT;

COMMIT;