"use client";

import dynamic from "next/dynamic";

const DynamicAblyProvider = dynamic(() => import("./ClientProviders"), {
  ssr: false,
});

export default DynamicAblyProvider;
