import { createClient } from "~/client/pocketbase";
import type { Route } from "../../../auth/login/+types";
import { isTokenExpired } from "pocketbase";
export let loader = async () => {
  return Response.json(
    {
      message: "not allowed",
    },
    {
      status: 405,
      statusText: "Method Not Allowed",
    }
  );
};
export let action = async ({ request }: Route.LoaderArgs) => {
  let cookies = request.headers.get("cookie") as string;
  let db = createClient();
  db.authStore.loadFromCookie(cookies);
  if (isTokenExpired(db.authStore.token))
    return Response.json(
      { message: "unauthorized" },
      {
        status: 401,
      }
    );
  let form = await request.formData();
  let body = form.get("body") as string;
  let title = form.get("title") as string;
  let thumb = form.get("thumb") as string;
  let body_response = await db.collection("post_body").create({
    body: body,
  });
  let post_resp = await db.collection("posts").create({
    title: title,
    thumb: thumb,
    body: body_response.id,
    user_id: db.authStore.record?.id,
  });

  return Response.json(
    {
      message: "post created",
      id: post_resp.id,
    },
    {
      status: 201,
      statusText: "Created",
    }
  );
};
