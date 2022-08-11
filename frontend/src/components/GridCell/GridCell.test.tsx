import { render, screen } from "@testing-library/react";
import * as reactRedux from "react-redux";

import { GridCell } from "./GridCell";
jest.mock("react-redux");

const { useSelector } = reactRedux as jest.Mocked<typeof reactRedux>;

describe("Test components/GridCell", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it.each<[number, string, string]>([
    [0, "element empty", ""],
    [1, "element power1", "1"],
    [2, "element power2", "2"],
    [3, "element power3", "4"],
  ])(
    "When power is %d classname should %s and content should be %s",
    (power, classNames, content) => {
      useSelector.mockReturnValueOnce(power);
      render(<GridCell column={0} row={0} />);
      const cell = screen.getByRole("gridcell");
      expect(cell).toHaveAttribute("class", classNames);
      expect(cell).toHaveTextContent(content);
    }
  );
});
