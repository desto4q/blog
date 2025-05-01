import type { PAGINATOR } from "~/types/types";
import Paginator from "./Paginator";

export default function BodyHeader({
  title,
  paginator,
  paginatorInfo
}: {
  title: string;
  paginator?: boolean;
  paginatorInfo?: PAGINATOR;
}) {
  return (
    <div className="flex container mx-auto items-center ">
      <h2 className="text-xl font-bold">{title}</h2>
      {paginator && <Paginator  {...paginatorInfo} />}
    </div>
  );
}
