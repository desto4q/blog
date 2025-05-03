import { useEffect } from "react";
import { useLoaderData } from "react-router";
import { createClient } from "~/client/pocketbase";

export let loader = async () => {
  let db = createClient();
  let post_resp = await db.collection("views").getList(1, 20, {
    expand: "post_id",
    sort:"views"
  });
  return post_resp;
};
export default function index() {
  let data = useLoaderData<typeof loader>();
  useEffect(() => {
    console.table(data.items[0]);
  }, []);
  return (
    <div className="mt-6 mx-auto container">{JSON.stringify(data.items)}</div>
  );
}
