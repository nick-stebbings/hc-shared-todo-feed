import React from "react";
import { render, screen } from "@testing-library/react";

import { index as TodoItem } from "./index";
type ComponentProps = React.ComponentProps<typeof TodoItem>;

function renderUI(props: ComponentProps) {
  return render(<TodoItem {...props} />);
}

test("renders item description in a list element", async () => {
  const text = "Go to the park";
  const { findByTestId, debug } = renderUI({ todoText: text });
  const listElement = screen.getByText(new RegExp(text));

  expect(listElement).toBeInTheDocument();
});
