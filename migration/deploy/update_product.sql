BEGIN;

CREATE OR REPLACE FUNCTION update_product(data json) RETURNS void AS $$
	UPDATE card SET 
        title=COALESCE(data->>'title', title),
        slug=COALESCE(data->>'slug', slug),
        designation=COALESCE(data->>'designation', designation),
        category=COALESCE(data->>'category', category),
        url_image=COALESCE(data->>'url_image', url_image),
        user_id=COALESCE(data->>'user_id', user_id),
        updateat=(now())::TIMESTAMPTZ
    WHERE id=(data->>'id')::INT
$$ LANGUAGE SQL STRICT;

COMMIT;