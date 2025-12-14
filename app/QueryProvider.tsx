"use client";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { SessionProvider } from "next-auth/react";
import ProfileProvider from "./provider";
import { getQueryClient } from "./get-query-client";

const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  // const [queryClient] = useState(() => new QueryClient());
  const queryClient = getQueryClient();

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <ProfileProvider>
          {children}
        </ProfileProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default QueryProvider;
