import { createClient } from "~/client/pocketbase";
import type { Route } from "../auth/login/+types";
import { redirect, useLoaderData, useRouteLoaderData } from "react-router";
import BodyHeader from "~/components/BodyHeader";
import Card from "~/components/Card";
import type { Post } from "~/types/types";
import UserCard from "~/components/UserCard";

export let loader = async ({ request }: Route.LoaderArgs) => {
  let cookies = request.headers.get("cookie");
  if (!cookies) return redirect("/home");
  let db = createClient();
  db.authStore.loadFromCookie(cookies);
  let user = db.authStore.record;
  if (!user) return redirect("/home");
  let posts_response = await db.collection("posts").getList(1, 20, {
    filter: `user_id="${user.id}"`,
  });
  return posts_response;
};

export default function index() {
  let response = useLoaderData<typeof loader>();
  let user_data = useRouteLoaderData("root");
  return (
    <div className="container mx-auto">
      <div className="h-18 flex items-center ">
        <BodyHeader
          title={`author: ${user_data.name}`}
          paginator
          paginatorInfo={{
            totalPages: response.totalPages,
            currentPage: response.page,
          }}
        />
      </div>
      <main className="grid grid-cols-4 gap-3">
        {response.items.map((item) => (
          // @ts-ignore
          <UserCard key={item.id} {...item} />
        ))}
      </main>
    </div>
  );
}
