import type { Route } from ".react-router/types/app/+types/root";
import { Suspense, useEffect } from "react";
import { useLoaderData } from "react-router";
import { createClient, staticDb } from "~/client/pocketbase";
import { marked } from "marked";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import remarkBreaks from "remark-breaks";
// @ts-ignore
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import type { POSTRESPONSE } from "~/types/types";
export let loader = async ({ params }: Route.LoaderArgs) => {
  let { post } = params;
  let db = createClient();
  let resp = await db.collection("posts").getOne(post as string, {
    expand: "body,user_id",
  });

  let new_resp = { ...resp };
  return new_resp;
};



export default function index() {
  let resp = useLoaderData<POSTRESPONSE>();
  let content_md = resp.expand!.body.body;
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
      <div className=" py-4  mx-auto w-full max-w-[852px] text-center text-balance">
        <div className=" font-bold flex flex-col text-center justify-center">
          <div className="">
            <img
              className="h-[252px] my-2 mx-auto"
              src={staticDb.files.getURL(resp, resp.thumb) ?? undefined}
              alt=""
            />
          </div>
          <span className="text-5xl font-bold capitalize leading-normal">
            {resp.title}
          </span>
          <div className=" italic font-normal label mx-auto text-center mt-4">
            {formatter(resp.created!)}
          </div>
          <div className=" italic font-normal py-2 mx-auto text-center  text-xl">
            <span className="!text-md label">author:</span>{" "}
            {resp.expand!.user_id.name}
          </div>
        </div>
      </div>
      <div className="divider "></div>
      <main className="mx-auto w-full  max-w-[852px] ">
        <Suspense fallback={<>loading</>}>
          <div className="prose max-w-none">
            <Markdown
              rehypePlugins={[rehypeRaw]}
              remarkPlugins={[remarkGfm, remarkBreaks]}
              // components={{
              //   hr: () => <hr className="my-8 border-t border-gray-300" />,
              // }}
              components={{
                code(props) {
                  const { children, className, node, ...rest } = props;
                  const match = /language-(\w+)/.exec(className || "");
                  return match ? (
                    <SyntaxHighlighter
                      {...rest}
                      PreTag="div"
                      children={String(children).replace(/\n$/, "")}
                      language={match[1]}

                    />
                  ) : (
                    <code {...rest} className={className}>
                      {children}
                    </code>
                  );
                },
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
