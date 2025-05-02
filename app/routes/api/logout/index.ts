import { redirect } from "react-router";
import type { Route } from "./+types";
import cookie from "cookie";
export let loader = async ({ request }: Route.LoaderArgs) => {
  let new_pb_auth = cookie.serialize("pb_auth", "", {
    maxAge: 0, // Expire the cookie immediately
    path: "/", // Ensure the cookie is deleted for the correct path
  });
  let headers = new Headers();
  headers.append("Set-Cookie", new_pb_auth);
  return redirect("/", { headers });
};
