import React from "react";
import { Outlet } from "react-router";

export default function ComponentName() {
  return (
    <div className="mt-6">
      <Outlet />
    </div>
  );
}
