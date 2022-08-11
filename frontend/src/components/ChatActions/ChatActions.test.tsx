import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import * as services from "services";

import { ChatActions } from "./ChatActions";

jest.mock("services", () => ({
  chatService: {
    sendMessage: jest.fn(),
  },
}));

const { chatService } = services as jest.Mocked<typeof services>;

const writeOnTextBox = async (message: string): Promise<void> => {
  const input = await screen.findByRole("textbox");
  fireEvent.change(input, {
    target: {
      value: message,
    },
  });
};

const textBoxShouldHaveMessage = async (message: string): Promise<void> => {
  const input = await screen.findByRole("textbox");
  await waitFor(() => {
    expect(input).toHaveValue(message);
  });
};

const pressOnSubmit = async (): Promise<void> => {
  const button = await screen.findByRole("button");
  fireEvent.click(button);
};

describe("Test components/ChatActions", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should have the expected shape", () => {
    const view = render(<ChatActions />);
    expect(view.container).toMatchInlineSnapshot(`
      <div>
        <form
          class="container"
        >
          <input
            class="input"
            type="text"
            value=""
          />
          <button
            class="button"
            type="submit"
          >
            →
          </button>
        </form>
      </div>
    `);
  });

  it("after writing an empty message and pressing enter should not send a message", async () => {
    render(<ChatActions />);
    await writeOnTextBox("  ");
    await pressOnSubmit();
    expect(chatService.sendMessage).not.toHaveBeenCalled();
  });

  it("after writing a message and pressing enter should send a message", async () => {
    render(<ChatActions />);
    const message = "hello!";
    await writeOnTextBox(message);
    await pressOnSubmit();
    expect(chatService.sendMessage).toHaveBeenCalledWith(message);
  });

  it("a written message should appear on the textbox, after sending it, it should disappear", async () => {
    render(<ChatActions />);
    const message = "hello!";
    await writeOnTextBox(message);
    await textBoxShouldHaveMessage(message);
    await pressOnSubmit();
    await textBoxShouldHaveMessage("");
  });
});
