import { createClient } from "~/client/pocketbase";
import type { Route } from "../../edit/$post/+types";

export let action = async ({ request }: Route.ActionArgs) => {
  let cookies = request.headers.get("Cookie");
  if (!cookies) {
    return new Response(JSON.stringify({ message: "No cookies found" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
  let db = createClient();
  db.authStore.loadFromCookie(cookies);
  let user_data = db.authStore.record;
  if (!user_data) {
    return new Response(JSON.stringify({ message: "User not found" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
  let form_data = await request.formData();
  let body = form_data.get("body") as string;
  let title = form_data.get("title") as string;
  let post_id = form_data.get("post_id") as string;
  let post_body_id = form_data.get("post_body_id") as string;

  await db.collection("post_body").update(post_body_id, {
    body: body,
  });
  await db.collection("posts").update(post_id, {
    title: title,
  });
  return new Response(
    JSON.stringify({ message: "Post updated successfully" }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
};
