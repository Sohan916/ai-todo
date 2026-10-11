import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vite-plus/test";
import { TasksSection } from "./TasksSection";

describe("TasksSection", () => {
  it("adds the typed task and clears the input when Add is clicked", async () => {
    const user = userEvent.setup();
    render(<TasksSection />);
    const input = screen.getByLabelText("New task");

    await user.type(input, "Buy milk");
    await user.click(screen.getByRole("button", { name: "Add" }));

    expect(screen.getByRole("listitem")).toHaveTextContent("Buy milk");
    expect(input).toHaveValue("");
  });

  it("adds the typed task and clears the input when Enter is pressed", async () => {
    const user = userEvent.setup();
    render(<TasksSection />);
    const input = screen.getByLabelText("New task");

    await user.type(input, "Walk dog");
    await user.keyboard("{Enter}");

    expect(screen.getByRole("listitem")).toHaveTextContent("Walk dog");
    expect(input).toHaveValue("");
  });

  it("does not add a task when Add is clicked with empty input", async () => {
    const user = userEvent.setup();
    render(<TasksSection />);

    await user.click(screen.getByRole("button", { name: "Add" }));

    expect(screen.queryAllByRole("listitem")).toHaveLength(0);
  });

  it("removes a task when its Remove button is clicked, keeping the rest in order", async () => {
    const user = userEvent.setup();
    render(<TasksSection />);
    const input = screen.getByLabelText("New task");

    await user.type(input, "Buy milk{Enter}");
    await user.type(input, "Walk dog{Enter}");
    await user.type(input, "Pay rent{Enter}");
    await user.click(screen.getByRole("button", { name: "Remove Walk dog" }));

    const items = screen.getAllByRole("listitem");
    expect(items).toHaveLength(2);
    expect(items[0]).toHaveTextContent("Buy milk");
    expect(items[1]).toHaveTextContent("Pay rent");
  });

  it("removes only the clicked task when two tasks share a title", async () => {
    const user = userEvent.setup();
    render(<TasksSection />);
    const input = screen.getByLabelText("New task");

    await user.type(input, "Buy milk{Enter}");
    await user.type(input, "Walk dog{Enter}");
    await user.type(input, "Buy milk{Enter}");
    const [firstRemove] = screen.getAllByRole("button", { name: "Remove Buy milk" });
    await user.click(firstRemove!);

    const items = screen.getAllByRole("listitem");
    expect(items).toHaveLength(2);
    expect(items[0]).toHaveTextContent("Walk dog");
    expect(items[1]).toHaveTextContent("Buy milk");
  });

  it("moves focus to the input after removing a task", async () => {
    const user = userEvent.setup();
    render(<TasksSection />);
    const input = screen.getByLabelText("New task");

    await user.type(input, "Buy milk{Enter}");
    await user.click(screen.getByRole("button", { name: "Remove Buy milk" }));

    expect(input).toHaveFocus();
  });
});
