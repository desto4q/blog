import type { Route } from "./app/+types/root";
export let MiddleWare: Route.unstable_MiddlewareFunction = async (
  ctx,
  next
) => {
  let start = performance.now();
  let res = await next();
  let duration = performance.now() - start;
  console.log(duration)
  return res;
};
