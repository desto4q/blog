import React, { useState } from "react";
import { Link } from "react-router";
import FillBody from "~/components/FillBody";


export let action  = async()=>{

}
export default function index() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log({ email, password });
  };
  return (
    <FillBody>
      <div className="flex-1 flex items-center justify-center">
        <form className="p-6 bg-base-200 flex flex-col gap-3  w-full max-w-xl">
          <h2 className="py-2 text-xl font-bold mx-auto">Login to Blug</h2>
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
            <label className=" label py-2">Email</label>
            <input
              type="text"
              className="input w-full"
              placeholder="password"
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
