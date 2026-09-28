"use client";

import dynamic from "next/dynamic";

const AblyClientProvider = dynamic(() => import("./ClientProviders"), {
  ssr: false,
});

export default AblyClientProvider;
