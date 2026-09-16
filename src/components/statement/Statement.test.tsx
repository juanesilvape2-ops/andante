import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Statement } from "./Statement";

describe("Statement", () => {
  it("renders the exact pull-quote text passed as children", () => {
    render(
      <Statement>La misma pausa con la que miro una calle es la que llevo a un set.</Statement>,
    );
    expect(
      screen.getByText("La misma pausa con la que miro una calle es la que llevo a un set."),
    ).toBeInTheDocument();
  });
});
