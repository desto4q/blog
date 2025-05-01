import React from "react";
import { Link } from "react-router";
export default function NavBar() {
  return (
    <div className="h-20  bg-base-100 sticky top-0 z-20">
      <nav className="container mx-auto flex items-center h-full border-b border-primary/25">
        <Link viewTransition to={"/home"} className="text-2xl font-bold">
          Blog
        </Link>
        <div className="ml-auto flex items-center gap-2">
          <button className="btn btn-link btn-ghost ">Latest </button>
          <button className="btn btn-link btn-ghost ">Latest </button>
          <button className="btn btn-link btn-ghost ">Latest </button>
          <button className="btn btn-link btn-ghost ">Latest </button>
        </div>
      </nav>
    </div>
  );
}
