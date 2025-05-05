import { useLoaderData } from "react-router";
import type { Route } from "../../auth/login/+types";
import { redirect } from "react-router";
import { createClient } from "~/client/pocketbase";
import { ClientOnly } from "remix-utils/client-only";
import Editor from "~/components/Editor.client";
import { useEffect } from "react";
import UpdateEditor from "~/components/UpdatEditor.client";

export let loader = async ({ request, params }: Route.LoaderArgs) => {
  let { post } = params;
  if (!post) return redirect("/home");
  let db = createClient();
  let resp = await db.collection("posts").getOne(post, {
    expand: "body",
  });
  return resp;
};
export default function index() {
  let resp = useLoaderData<typeof loader>();
  useEffect(() => {
    // console.log(resp.expand.body.body);
  }, []);
  return (
    <div className="mx-auto">
      <ClientOnly fallback={<></>}>
        {() => (
          // @ts-ignore
          <UpdateEditor post={resp} />
        )}
      </ClientOnly>
    </div>
  );
}
