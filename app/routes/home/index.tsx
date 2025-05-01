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
  return resp ;
};

export default function index() {
  let resp = useLoaderData<PostResult>();

  return (
    <FillBody>
      <div className="mx-auto flex-1  relative isolate">
        <div className="sticky top-[80px] z-20 bg-base-100 flex drop-shadow-md items-center h-18">
          <BodyHeader title="Latest Post" paginator={true} paginatorInfo={{
            totalPages:resp.totalPages,
            currentPage:resp.page
          }} />
        </div>
        <main className=" mt-4 container mx-auto">
          <FillBody>
            <div className="flex-1 flex ">
              <div className="flex flex-col  w-full divide divide-y  divide-primary/50 gap-4">
                <Suspense fallback={<>loading</>}>
                  {resp.items.map((item) => (
                    <Card key={item.id} {...item} />
                  ))}
                </Suspense>
              </div>
              <div className="hidden md:block  w-lg relative">
                <div className="w-full bg-base-200 sticky top-[160px] min-h-[200px] rounded-xl">
                  ss
                </div>
              </div>
            </div>
          </FillBody>
          {/* <FillBody>sos</FillBody> */}
        </main>
      </div>
    </FillBody>
  );
}
