import { DeleteIcon } from "lucide-react";
import type { SyntheticEvent } from "react";
import { Link } from "react-router";
import { toast } from "sonner";
import { staticDb } from "~/client/pocketbase";
import type { Post } from "~/types/types";

export default function UserCard(item: Post) {
  let created = new Date(item.created).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  let deletePost = async (e: SyntheticEvent) => {
    e.stopPropagation();
    let form_data = new FormData();
    form_data.append("post_id", item.id);
    let response = await fetch("/api/delete/", {
      method: "post",
      body: form_data,
    });
    console.log(await response.json());
  };
  return (
    <div>
      <Link
        to={`/post/${item.id}`}
        viewTransition
        key={item.id}
        className="w-full  py-2 hover:grayscale-75  duration-300 relative isolate"
      >
        <img
          src={
            item.thumb.length > 1
              ? staticDb.files.getURL(item, item.thumb)
              : undefined
          }
          alt=""
          className="max-h-[200px] h-full rounded-xl object-cover"
        />
        <div className="px-2 mt-2 flex flex-col gap-2">
          <h2 className="font-bold truncate">{item.title}</h2>
          <h2 className="text-xs">{created}</h2>
        </div>
      </Link>
      <div
        className="w-full top-0   z-20 flex  py-2 px-2 "
        onClick={(e) => {
          console.log("click");
          e.stopPropagation();
        }}
      >
        <div
          onClick={deletePost}
          className="btn ml-auto btn-clean p-1 btn-error mt-1"
        >
          <DeleteIcon size={18} />
        </div>
      </div>
    </div>
  );
}
