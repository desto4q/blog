import { Link,  useRouteLoaderData } from "react-router";
import type { USERINFO } from "~/types/types";
import SearchBar from "./SearchBar";
export default function NavBar() {
  const data: USERINFO | undefined = useRouteLoaderData("root");

  return (
    <div className="h-20  bg-base-100 sticky top-0 z-20">
      <nav className="container mx-auto  flex items-center h-full border-b border-primary/25">
        <Link viewTransition to={"/home"} className="text-2xl font-bold">
          Blog
        </Link>
        <div className="w-full max-w-md mx-auto">
          <SearchBar />
        </div>
        <div className="flex items-center gap-2">
          <Link viewTransition to={"/home"} className="btn btn-link btn-ghost ">
            Latest{" "}
          </Link>
          <Link
            viewTransition
            to={"/popular"}
            className="btn btn-link btn-ghost "
          >
            Popular{" "}
          </Link>
          {!data ? (
            <div className="join ml-2">
              <Link
                to="/auth/login"
                className="join-item btn btn-primary btn-sm"
              >
                Login
              </Link>
              <Link
                to={"/auth/signup"}
                className="join-item btn btn-accent btn-sm"
              >
                Sign Up
              </Link>
            </div>
          ) : (
            <>
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn m-1 btn-soft ">
                  <div className="flex items-center gap-2">
                    <div className="bg-accent/50 size-5 rounded-sm"></div>
                    <h2>{data.name}</h2>
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm gap-2"
                >
                  <li>
                    <Link to={"/create"} className="btn btn-ghost" viewTransition>
                      Create
                    </Link>
                  </li>
                  <li>
                    <Link to={"/api/logout"} className="btn btn-error">
                      Logout
                    </Link>
                  </li>
                </ul>
              </div>
            </>
          )}
        </div>
      </nav>
    </div>
  );
}
