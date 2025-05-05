import { createClient } from "~/client/pocketbase";
import type { Route } from "../../search/$search/+types";
import { ClientResponseError } from "pocketbase";

export let action = async ({ request }: Route.LoaderArgs) => {
  let form = await request.formData();
  let id = form.get("post_id") as string;

  if (!id) return Response.json({ error: "Missing post_id" }, { status: 400 });

  let cookies = request.headers.get("cookie");
  if (!cookies)
    return Response.json({ error: "Missing cookies" }, { status: 400 });

  let db = createClient();
  db.authStore.loadFromCookie(cookies);
  let user_data = db.authStore.record;

  if (!user_data)
    return Response.json({ error: "Missing user data" }, { status: 400 });
  try {
    await db.collection("posts").delete(id);
    return Response.json("deleted Succesfully", {
      status: 204,
    });
  } catch (error) {
    if (error instanceof ClientResponseError) {
      return Response.json(error, {
        status: error.status,
      });
    }
    console.error("Error deleting post:", error);
    return Response.json({ error: "Failed to delete post" }, { status: 500 });
  }
};
