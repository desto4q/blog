import React, { Suspense } from "react";
import { useLoaderData, useParams } from "react-router";
import type { Route } from "../../post+/+types";
import { createClient } from "~/client/pocketbase";
import type { PostResult } from "~/types/types";
import Card from "~/components/Card";
export let loader = async ({ request, params }: Route.LoaderArgs) => {
  let { search } = params;
  if (!search) return null;
  let db = createClient();
  let search_resp = await db.collection("posts").getList(1, 20, {
    filter: `title ~ "${search}"`,
  });

  return search_resp;
};
export default function index() {
  let { search } = useParams();
  let resp: PostResult = useLoaderData();
  return (
    <div className="mx-auto container">
      <div className="flex items-center gap-3 h-18">
        <h2 className="text-xl font-bold border-b border-current/50">
          Search: <span className="label">{search}</span>
        </h2>
      </div>

      <div className="grid grid-cols-4  w-full gap-3">
        <Suspense fallback={<>loading</>}>
          {resp.items.map((item) => (
            <Card key={item.id} {...item} />
          ))}
        </Suspense>
      </div>
    </div>
  );
}
