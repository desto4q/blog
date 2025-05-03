import { SearchIcon } from "lucide-react";
import type { SyntheticEvent } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";

export default function SearchBar() {
  let { search } = useParams();
  let nav = useNavigate();
  let onSearch = (e: SyntheticEvent) => {
    e.preventDefault();
    let form = new FormData(e.target as HTMLFormElement);
    let search = form.get("search") as string;
    if (search.length < 3)
      return toast.error("must be greater than 3 characters");
    return nav("/search/" + search, {
      viewTransition: true,
    });
  };
  return (
    <form className="join w-full" onSubmit={onSearch}>
      <input
        type="text"
        className="join-item input w-full "
        name="search"
        placeholder="search here..."
        defaultValue={search && search}
      />
      <button className="btn join-item btn-primary btn-soft">
        <SearchIcon />
      </button>
    </form>
  );
}
