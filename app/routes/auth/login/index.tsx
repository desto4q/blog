import React, { useEffect, useState } from "react";
import { Link, redirect, useActionData, useLoaderData } from "react-router";
import FillBody from "~/components/FillBody";
import type { Route } from "../../api/images/$image/+types";
import { createClient } from "~/client/pocketbase";
import { verifyCookie } from "~/methods/methods";
export let loader = async ({ request }: Route.LoaderArgs) => {
  let cookies = request.headers.get("cookie");
  await verifyCookie(cookies as string);
  return "sage";
};

export let action = async ({ request, params, context }: Route.ActionArgs) => {
  let form = await request.formData();
  let email = form.get("email") as string;
  let password = form.get("password") as string;
  let db = createClient();
  let auth_response = await db
    .collection("users")
    .authWithPassword(email, password);

  let auth_cookie = db.authStore.exportToCookie();
  let header = new Headers();
  header.append("set-cookie", auth_cookie);
  return redirect("/home", { headers: header });
};
export default function index() {
  let action_data = useActionData<typeof action>();
  let logger = () => {
    console.log(action_data);
  };
  useEffect(() => {
    logger();
  }, []);
  return (
    <FillBody>
      <div className="flex-1 flex items-center justify-center">
        <form
          method="post"
          className="p-6 bg-base-200 flex flex-col gap-3  w-full max-w-xl"
        >
          <h2 className="py-2 text-xl font-bold mx-auto">Login to Blug</h2>
          <div className="flex flex-col">
            <label className=" label py-2">Email</label>
            <input
              type="text"
              className="input w-full"
              placeholder="email"
              name="email"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className=" label py-2">Email</label>
            <input
              type="text"
              className="input w-full"
              placeholder="password"
              required
              name="password"
            />
          </div>
          <button className="btn btn-primary mt-4">Login</button>
          <div className="flex gap-2 items-center">
            <div className="divider w-full"></div>
            <p>Or</p>
            <div className="divider w-full"></div>
          </div>
          <Link to={"/auth/signup"} className="btn btn-accent btn-soft">
            Sign Up
          </Link>
        </form>
      </div>
    </FillBody>
  );
}
