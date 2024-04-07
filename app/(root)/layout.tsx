import StreamVideoProvider from "@/providers/StreamClientProvider";
import { Metadata } from "next";
import React, { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Zoom",
  description: "Created by Deepak(github@deepGIVAn)",
  icons: {
    icon: "/icons/logo.svg",
  },
};

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <main>
      <StreamVideoProvider>{children}</StreamVideoProvider>
    </main>
  );
};

export default layout;
