/**
 * Messages Page (SSR)
 *
 * User's chat messages
 */

import { Metadata } from "next";
import { getServerAuthToken } from "@/lib/auth";
import { serverApiClient } from "@/services/api/server-client";
import MessagesPage from "@/components/Chat/MessagesPage";

export const metadata: Metadata = {
  title: "Messages | memi.az",
  description: "Your conversations with sellers",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function Messages() {
  const token = await getServerAuthToken();

  let chats = [];
  if (token) {
    try {
      chats = await serverApiClient.get("/chat", undefined, token);
    } catch (error) {
      console.error("Error fetching chats:", error);
    }
  }

  return <MessagesPage chats={chats} />;
}

