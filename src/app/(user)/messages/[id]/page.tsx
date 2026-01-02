/**
 * Chat Detail Page (SSR)
 *
 * Individual chat conversation page
 */

import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServerAuthToken } from "@/lib/auth";
import { serverApiClient } from "@/services/api/server-client";
import ChatWindow from "@/components/Chat/ChatWindow";

export const metadata: Metadata = {
  title: "Chat | memi.az",
  robots: {
    index: false,
    follow: false,
  },
};

interface ChatPageProps {
  params: Promise<{ id: string }>;
}

export default async function ChatPage({ params }: ChatPageProps) {
  const { id } = await params;
  const token = await getServerAuthToken();

  if (!token) {
    notFound();
  }

  let chat = null;
  try {
    chat = await serverApiClient.get(`/chat/${id}`, undefined, token);
  } catch (error) {
    console.error("Error fetching chat:", error);
    notFound();
  }

  // Get current user profile to get user ID
  let currentUserId = "";
  try {
    const userProfile = await serverApiClient.get("/users/profile", undefined, token);
    currentUserId = userProfile.id;
  } catch (error) {
    console.error("Error fetching user profile:", error);
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <ChatWindow chat={chat} currentUserId={currentUserId} />
    </div>
  );
}

