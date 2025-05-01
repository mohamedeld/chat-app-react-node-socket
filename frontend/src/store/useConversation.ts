// useConversation.ts
import { create } from "zustand";

// Define types
interface Message {
  _id: string;
  sender: string;
  content: string;
  createdAt: string;
}

interface Conversation {
  _id: string;
  participants: string[];
  lastMessage?: Message;
}

interface ConversationStore {
  selectedConversation: Conversation | null;
  setSelectedConversation: (conversation: Conversation | null) => void;

  messages: Message[];
  setMessages: (messages: Message[]) => void;
  addMessage: (message: Message) => void;
  clearMessages: () => void;
}

const useConversation = create<ConversationStore>((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) => set({ selectedConversation }),

  messages: [],
  setMessages: (messages) => set({ messages }),
  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),
  clearMessages: () => set({ messages: [] }),
}));

export default useConversation;
