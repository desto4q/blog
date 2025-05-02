import { get_user } from "~/methods/methods";
import type { Route } from "../../post+/$post/+types";
export let loader = async ({ request }: Route.LoaderArgs) => {
  let cookies = request.headers.get("cookie");
  let resp = await get_user(cookies as string);
  return Response.json(resp);
};
