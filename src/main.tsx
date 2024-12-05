import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App.tsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import BookmarkIdsContextProvider from "./contexts/BookmarkIdsContextProvider.tsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BookmarkIdsContextProvider>
        <App />
      </BookmarkIdsContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

