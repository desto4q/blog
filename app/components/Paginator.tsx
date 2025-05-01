import { ChevronLeftIcon, ChevronRightIcon, Forward } from "lucide-react";
import type { PAGINATOR } from "~/types/types";
import { useSearchParams } from "react-router";

export default function Paginator(props: PAGINATOR) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page") || props.currentPage);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      searchParams.set("page", String(currentPage - 1));
      setSearchParams(searchParams);
    }
  };
  const handleNextPage = () => {
    if (currentPage < props.totalPages) {
      searchParams.set("page", String(currentPage + 1));
      setSearchParams(searchParams);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const page = formData.get("page");
    if (page) {
      searchParams.set("page", String(page));
      setSearchParams(searchParams);
    }
  };

  return (
    <div className="join ml-auto">
      <button
        className="join-item btn btn-square"
        onClick={handlePrevPage}
        disabled={currentPage <= 1}
      >
        <ChevronLeftIcon />
      </button>
      <button
        className="join-item btn btn-square"
        onClick={handleNextPage}
        disabled={currentPage >= props.totalPages}
      >
        <ChevronRightIcon />
      </button>
      <form className="join-item join btn px-0" onSubmit={handleSubmit}>
        <input
          defaultValue={currentPage}
          name="page"
          max={props.totalPages}
          min={1}
          id="page"
          className="max-w-[48px] text-center input input-clean appearance-none"
          type="number"
          // placeholder="Go to page"
        />
        <button className="join-item btn btn-square" type="submit">
          <Forward />
        </button>
      </form>
    </div>
  );
}
