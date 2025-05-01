import type { AppLoadContext } from "react-router";
import { createClient } from "~/client/pocketbase";
import cookie from "cookie";
import { isTokenExpired } from "pocketbase";
let unsafe_route = ["/create", "/edit"];
let api_routes = ["/api/user"];
interface CTX {
  context: AppLoadContext;
  request: Request;
  params: { [key: string]: string | undefined };
  response: Response;
}

let escapeApi = (path: string) => {
  if (api_routes.some((predicate) => path.includes(predicate)))
    throw Response.json(
      {
        message: "unauthorized",
      },
      {
        status: 401,
      }
    );
};
export let authMiddleware = async ({ request, response }: CTX) => {
  let path = request.url;
  // Correct way to get cookies in Remix
  let cookieHeader = request.headers.get("cookie");
  if (!cookieHeader) {
    escapeApi(path);
    throw response;
  }
  let pb_auth = cookie.parse(cookieHeader).pb_auth;
  if (!pb_auth) {
    escapeApi(path);
    throw response;
  }
  let db = createClient();
  if (isTokenExpired(pb_auth)) {
    escapeApi(path);
    throw response;
  }
  return pb_auth;
};
