BEGIN;

CREATE OR REPLACE FUNCTION update_product(data json) RETURNS void AS $$
	UPDATE product SET 
        title=COALESCE(data->>'title', title),
        designation=COALESCE(data->>'designation', designation),
        category=COALESCE(data->>'category', category),
        url_image=COALESCE(data->>'url_image', url_image),
        user_id=COALESCE((data->>'user_id')::INT, user_id),
        updateat=(now())::TIMESTAMPTZ
$$ LANGUAGE SQL STRICT;

COMMIT;