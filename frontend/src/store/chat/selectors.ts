import { ServerChatMessageParam } from "shared/types";
import { RootState } from "store/types";

export const chatMessagesSelector = (
  state: RootState
): ServerChatMessageParam[] => state.chat.messages;
