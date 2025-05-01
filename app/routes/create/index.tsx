import React, { Suspense } from "react";
import Editor from "~/components/Editor.client";
import { ClientOnly } from "remix-utils/client-only";
export default function index() {
  return (
    <div className="container mx-auto flex flex-col">
      <ClientOnly fallback={<>loading</>}>{() => <Editor />}</ClientOnly>
    </div>
  );
}
