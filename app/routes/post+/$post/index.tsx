import type { Route } from ".react-router/types/app/+types/root";
import React, { Suspense, useEffect } from "react";
import { useLoaderData } from "react-router";
import { createClient } from "~/client/pocketbase";
import { marked } from "marked";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import remarkBreaks from "remark-breaks";
export let loader = async ({ params }: Route.LoaderArgs) => {
  let { post } = params;
  let db = createClient();
  let resp = await db.collection("posts").getOne(post as string, {
    expand: "body",
  });
  return resp;
};
export default function index() {
  let resp = useLoaderData<typeof loader>();
  let content_md = resp.expand!.body.body;
  let parsed = marked.parse(content_md);
  let formatter = (date_string: string) => {
    return new Date(resp.created).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  return (
    <div className=" container mx-auto flex flex-col">
      <div className=" py-4  mx-auto w-full max-w-[752px] text-center">
        <div className=" font-bold flex flex-col text-center justify-center">
          <span className="text-5xl font-bold capitalize">{resp.title}</span>
          <div className=" italic font-normal label mx-auto text-center mt-8">
            {formatter(resp.created!)}
          </div>
        </div>
      </div>
      <div className="divider "></div>
      <main className="mx-auto  max-w-[752px]">
        <Suspense fallback={<>loading</>}>
          <div className="prose max-w-none">
            <Markdown
              rehypePlugins={[rehypeRaw]}
              remarkPlugins={[remarkGfm, remarkBreaks]}
              components={{
                hr: () => <hr className="my-8 border-t border-gray-300" />,
              }}
            >
              {content_md}
            </Markdown>
          </div>
        </Suspense>
      </main>
    </div>
  );
}
