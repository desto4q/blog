import React from "react";
import { Link } from "react-router";
import { staticDb } from "~/client/pocketbase";
import type { Post } from "~/types/types";

export default function Card(item: Post) {
  let created = new Date(item.created).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  return (
    <Link
      to={`/post/${item.id}`}
      viewTransition
      key={item.id}
      className="w-full  py-2 "
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
      <div className="px-2 mt-2">
        <h2 className="font-bold truncate">{item.title}</h2>
        <h2 className="text-xs">{created}</h2>
      </div>
    </Link>
  );
}
