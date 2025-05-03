import { Suspense, useEffect } from "react";
import { useLoaderData } from "react-router";
import { createClient } from "~/client/pocketbase";
import BodyHeader from "~/components/BodyHeader";
import Card from "~/components/Card";
import FillBody from "~/components/FillBody";
import type { VIEWPOST } from "~/types/types";

export let loader = async () => {
  let db = createClient();
  let post_resp = await db.collection("views").getList(1, 20, {
    expand: "post_id",
    sort: "views",
  });
  return post_resp;
};
export default function index() {
  let resp = useLoaderData<VIEWPOST>();
  useEffect(() => {
    console.log(resp);
  }, []);
  return (
    <FillBody>
      <div className="mx-auto flex-1  relative isolate">
        <div className="sticky top-[80px] z-20 bg-base-100 flex drop-shadow-md items-center h-18">
          <BodyHeader
            title="Popular Posts"
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
                  {resp.items.map((item: VIEWPOST) => (
                    <Card key={item.id} {...item.expand.post_id} />
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
