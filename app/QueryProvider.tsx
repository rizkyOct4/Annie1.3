"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import ProfileProvider from "./provider";
import { getQueryClient } from "./get-query-client";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = getQueryClient();

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <ProfileProvider>
          {children}
          <ReactQueryDevtools
            initialIsOpen={false}
          />
        </ProfileProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default QueryProvider;
