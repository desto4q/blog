import Editor from "~/components/Editor.client";
import { ClientOnly } from "remix-utils/client-only";
import type { Route } from "../api/logout/+types";
import { createClient } from "~/client/pocketbase";
import { redirect } from "react-router";
import { isTokenExpired } from "pocketbase";

export let loader = async ({ request }: Route.LoaderArgs) => {
  let cookies = request.headers.get("cookie");
  let db = createClient();
  if (!cookies) return redirect("/home");
  db.authStore.loadFromCookie(cookies);
  if (isTokenExpired(db.authStore.token)) return redirect("/home");
  return { message: "logged in" };
};

export default function index() {
  return (
    <div className="container mx-auto flex flex-col">
      <ClientOnly fallback={<>loading</>}>{() => <Editor />}</ClientOnly>
    </div>
  );
}
