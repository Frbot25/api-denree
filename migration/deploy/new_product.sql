BEGIN;

-- Amélioration de la fonction d'update product
--en utilisant COALESCE on choisi d'utiliser soit la data envoyée par le client, soit l'existant en DB
CREATE OR REPLACE FUNCTION new_product(data json) RETURNS void AS $$
	UPDATE product SET 
        title=COALESCE(data->>'title', title),
        designation=COALESCE(data->>'designation', designation),
        category=COALESCE(data->>'category', category),
        url_image=COALESCE(data->>'url_image', url_image),
        user_id=COALESCE((data->>'user_id')::INT, user_id),
        updateat=(now())::TIMESTAMPTZ
$$ LANGUAGE SQL STRICT;

COMMIT;