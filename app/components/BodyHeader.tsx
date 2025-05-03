import type { PAGINATOR } from "~/types/types";
import Paginator from "./Paginator";

export default function BodyHeader({
  title,
  paginator,
  paginatorInfo,
}: {
  title: string;
  paginator?: boolean;
  paginatorInfo?: PAGINATOR;
}) {
  return (
    <div className="flex container mx-auto items-center border-b h-full border-current/25">
      <h2 className="text-xl font-bold">{title}</h2>
      {paginator && paginatorInfo && <Paginator {...paginatorInfo} />}
    </div>
  );
}
