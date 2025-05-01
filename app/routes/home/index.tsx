import React, { Suspense } from "react";
import { useLoaderData } from "react-router";
import { createClient, staticDb } from "~/client/pocketbase";
import FillBody from "~/components/FillBody";
import {
  ArrowLeftIcon,
  ChevronLeft,
  ChevronLeftIcon,
  ChevronRightIcon,
  Forward,
  Send,
  SendIcon,
  SquareArrowLeft,
} from "lucide-react";
import type { ListResult, RecordModel } from "pocketbase";
import BodyHeader from "~/components/BodyHeader";
import type { PostResult } from "~/types/types";
import Card from "~/components/Card";
export let loader = async () => {
  let db = createClient();
  let resp = await db.collection("posts").getList(1, 5);
  return resp;
};

export default function index() {
  let resp = useLoaderData<PostResult>();

  return (
    <FillBody>
      <div className="mx-auto flex-1  relative isolate">
        <div className="sticky top-[80px] z-20 bg-base-100 flex drop-shadow-md items-center h-18">
          <BodyHeader
            title="Latest Post"
            paginator={true}
            paginatorInfo={{
              totalPages: resp.totalPages,
              currentPage: resp.page,
            }}
          />
        </div>
        <main className=" mt-4 container mx-auto">
          <FillBody>
            <div className="flex-1">
              <div className="grid grid-cols-4  w-full gap-3">
                <Suspense fallback={<>loading</>}>
                  {resp.items.map((item) => (
                    <Card key={item.id} {...item} />
                  ))}
                </Suspense>
              </div>
            </div>
          </FillBody>
        </main>
      </div>
    </FillBody>
  );
}
