import { render, screen } from "@testing-library/react";

import { CellContent } from "./CellContent";

describe("Test components/CellContent", () => {
  it("CellContent should be responsive to the number of digits (0)", () => {
    const view = render(<CellContent content="" />);
    expect(view.container).toMatchInlineSnapshot(`<div />`);
  });

  it("CellContent should be responsive to the number of digits (1)", () => {
    const view = render(<CellContent content="a" />);
    expect(view.container).toMatchInlineSnapshot(`
      <div>
        <svg
          class="svg"
          viewBox="0 0 44 44"
        >
          <text
            x="50%"
            y="24"
          >
            a
          </text>
        </svg>
      </div>
    `);
  });

  it("CellContent should be responsive to the number of digits (2)", () => {
    const view = render(<CellContent content="aa" />);
    expect(view.container).toMatchInlineSnapshot(`
      <div>
        <svg
          class="svg"
          viewBox="0 0 52 52"
        >
          <text
            x="50%"
            y="28"
          >
            aa
          </text>
        </svg>
      </div>
    `);
  });
});
