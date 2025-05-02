import { authMiddleware } from "~/middlewares/auth";
import type { Route } from "./app/+types/root";
import cookie from "cookie";
export let MiddleWare: Route.unstable_MiddlewareFunction = async (
  ctx,
  next
) => {
  let start = performance.now();
  let res = await next();
  let duration = performance.now() - start;

  let resp = await authMiddleware({ ...ctx, response: res });
  let mic_cookie = cookie.serialize("mic", "sss", {
    path: "/",
  });
  ctx.context["user"] = "dezz";
  res.headers.append("set-cookie", mic_cookie);
  return res;
};
