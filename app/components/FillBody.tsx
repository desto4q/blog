import React, { type PropsWithChildren } from "react";

export default function FillBody({ children }: PropsWithChildren) {
  return <div className="flex min-h-[calc(100dvh_-_72px)]  w-full">{children}</div>;
}
