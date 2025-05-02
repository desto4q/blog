import React, { useEffect, useState } from "react";
import { Form, Link, redirect, useActionData, useNavigate } from "react-router";
import FillBody from "~/components/FillBody";
import type { Route } from "../../api/images/$image/+types";
import { createClient } from "~/client/pocketbase";
import { ClientResponseError } from "pocketbase";
import { toast } from "sonner";

export let action = async ({ request }: Route.ActionArgs) => {
  let form = await request.formData();

  let email = form.get("email");
  let name = form.get("name");
  let password = form.get("password");
  let auth_data = {
    email,
    password,
    passwordConfirm: password,
  };
  let db = createClient();
  try {
    let auth_response = await db.collection("users").create(auth_data);
    let author_response = await db.collection("authors").create({
      author: name,
      user_id: auth_response.id,
    });

    return Response.json(
      {
        message: author_response,
      },
      {
        status: 201,
      }
    );
  } catch (err) {
    console.log(err);
    if (err instanceof ClientResponseError) {
      return Response.json(
        {
          error: err.message,
        },
        {
          status: err.status,
          statusText: err.name,
        }
      );
    }

    return Response.json(
      {
        error: err,
      },
      {
        status: 500,
        statusText: "Internal Server Error",
      }
    );
  }
};
export default function index() {
  let action_data = useActionData<typeof action>();
  let nav = useNavigate();
  let log_state = () => {
    if (action_data && "error" in action_data) {
      //@ts-ignore
      return toast.error(action_data.error!.message ?? "failed to create user");
    }
    if (action_data && "message" in action_data) {
      toast.success("user created, redirecting");
      return setTimeout(() => {
        return nav("/auth/login");
      }, 1000);
    }
  };
  useEffect(() => {
    log_state();
  }, []);
  return (
    <FillBody>
      <div className="flex-1 flex items-center justify-center">
        <Form
          reloadDocument
          onSubmitCapture={(e) => {
            console.log(e, "capture");
          }}
          onSubmit={(e) => {}}
          className="p-6 bg-base-200 flex flex-col gap-3  w-full max-w-xl"
          method="post"
        >
          <h2 className="py-2 text-xl font-bold mx-auto">Login to Blug</h2>
          <div className="flex flex-col">
            <label className=" label py-2">Name</label>
            <input
              type="text"
              className="input w-full"
              placeholder="fullName"
              name="name"
            />
          </div>
          <div className="flex flex-col">
            <label className=" label py-2">Email</label>
            <input
              type="text"
              className="input w-full"
              placeholder="email"
              name="email"
            />
          </div>
          <div className="flex flex-col">
            <label className=" label py-2">password</label>
            <input
              type="password"
              className="input w-full"
              placeholder="password"
              name="password"
            />
          </div>
          <button className="btn btn-primary mt-4">Sign Up</button>
          <div className="flex gap-2 items-center">
            <div className="divider w-full"></div>
            <p>Or</p>
            <div className="divider w-full"></div>
          </div>
          <Link to={"/auth/login"} className="btn btn-accent btn-soft">
            Login
          </Link>
        </Form>
      </div>
    </FillBody>
  );
}
