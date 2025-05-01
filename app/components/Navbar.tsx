import { SearchIcon } from "lucide-react";
import React from "react";
import { Link } from "react-router";
export default function NavBar() {
  return (
    <div className="h-20  bg-base-100 sticky top-0 z-20">
      <nav className="container mx-auto flex items-center h-full border-b border-primary/25">
        <Link viewTransition to={"/home"} className="text-2xl font-bold">
          Blog
        </Link>
        <form
          className="join mx-auto w-full max-w-md"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <input type="text" className="join-item input w-full " />
          <button className="btn join-item btn-primary btn-soft">
            <SearchIcon />
          </button>
        </form>
        <div className="flex items-center gap-2">
          <Link viewTransition to={"/home"} className="btn btn-link btn-ghost ">
            Latest{" "}
          </Link>
          <Link viewTransition to={"/popular"} className="btn btn-link btn-ghost ">
            Popular{" "}
          </Link>
          <div className="join ml-2">
            <button className="join-item btn btn-primary btn-sm">Login</button>
            <button className="join-item btn btn-accent btn-sm">Sign Up</button>
          </div>
        </div>
      </nav>
    </div>
  );
}
