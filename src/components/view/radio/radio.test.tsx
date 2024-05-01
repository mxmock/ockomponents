import Radio from "./radio";
import { FiMenu } from "react-icons/fi";
import { expect, describe, it, vi } from "vitest";
import { render, fireEvent } from "@testing-library/react";

const suggestions = [
  { id: "tab1", label: "Tab 1" },
  { id: "tab2", label: "Tab 2" },
  { id: "tab3", label: "Tab 3", Icon: FiMenu },
];

describe("radio component", () => {
  const onChangeMock = vi.fn();

  it("should render a tab-radio with list of 3 elements", () => {
    const { getByRole, container } = render(
      <Radio
        options={suggestions}
        active={suggestions[1].id}
        onChange={onChangeMock}
      />
    );
    expect(container).toMatchSnapshot();

    const ul = getByRole("list");
    expect(ul).toBeInTheDocument();
    expect(ul.children.length).toBe(suggestions.length + 1);

    expect(getByRole("radio", { name: "Tab 1" })).toBeInTheDocument();
    expect(getByRole("radio", { name: "Tab 2" })).toBeInTheDocument();
    expect(getByRole("radio", { name: "Tab 3" })).toBeInTheDocument();
  });

  it("should render a tab-radio with basics props when only suggestions props are passed, for unchecked element", () => {
    const { getByRole, container } = render(
      <Radio
        options={suggestions}
        active={suggestions[1].id}
        onChange={onChangeMock}
      />
    );
    expect(container).toMatchSnapshot();

    const input = getByRole("radio", { name: "Tab 1" });

    expect(input).toBeInTheDocument();

    expect(input).not.toBeChecked();
    expect(input).toHaveAttribute("id", "tab1");
    expect(input).toHaveAttribute("value", "tab1");
    expect(input).toHaveAttribute("name", "radio-id");

    expect(onChangeMock).toHaveBeenCalledOnce();
  });

  it("should render a tab-radio with basics props when only suggestions props are passed, for checked element", () => {
    const { getByRole, container } = render(
      <Radio
        options={suggestions}
        active={suggestions[1].id}
        onChange={onChangeMock}
      />
    );
    expect(container).toMatchSnapshot();

    const checkedInput = getByRole("radio", { name: "Tab 2" });

    expect(checkedInput).toBeInTheDocument();

    expect(checkedInput).toBeChecked();
    expect(checkedInput).toHaveAttribute("id", "tab2");
    expect(checkedInput).toHaveAttribute("value", "tab2");
    expect(checkedInput).toHaveAttribute("name", "radio-id");

    expect(onChangeMock).toHaveBeenCalledOnce();
  });

  it("should render a tab-radio with custom id when id props is passed", () => {
    const { getByRole, container } = render(
      <Radio
        id="custom-radio-tab"
        options={suggestions}
        active={suggestions[0].id}
        onChange={onChangeMock}
      />
    );
    expect(container).toMatchSnapshot();

    const input = getByRole("radio", { name: "Tab 2" });
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("name", "custom-radio-tab");
  });

  it("should render a tab-radio with disabled inputs when disabled props is passed", () => {
    const { getByRole, container } = render(
      <Radio
        disabled={true}
        options={suggestions}
        active={suggestions[0].id}
        onChange={onChangeMock}
      />
    );
    expect(container).toMatchSnapshot();

    const input = getByRole("radio", { name: "Tab 2" });
    expect(input).toBeInTheDocument();
    expect(input).toBeDisabled();
  });

  it("should render a tab-radio with label when label props is passed", () => {
    const { getByText, container } = render(
      <Radio
        label="Custom radio tab"
        options={suggestions}
        active={suggestions[0].id}
        onChange={onChangeMock}
      />
    );
    expect(container).toMatchSnapshot();

    const label = getByText(/custom radio tab/i);
    expect(label).toBeInTheDocument();
  });

  it("should render a tab-radio with icon for elements with Icon props", () => {
    const { getByRole, getByTestId, container } = render(
      <Radio
        options={suggestions}
        active={suggestions[1].id}
        onChange={onChangeMock}
      />
    );
    expect(container).toMatchSnapshot();

    const input = getByRole("radio", { name: "Tab 3" });
    expect(input).toBeInTheDocument();

    expect(getByTestId("radio-icon-tab3")).toBeInTheDocument();
  });

  it("should call onChange when an input radio is clicked", () => {
    const { getByRole, container } = render(
      <Radio
        options={suggestions}
        active={suggestions[1].id}
        onChange={onChangeMock}
      />
    );
    expect(container).toMatchSnapshot();

    expect(onChangeMock).toHaveBeenCalledWith("tab2");

    const input = getByRole("radio", { name: "Tab 3" });
    expect(input).toBeInTheDocument();

    fireEvent.click(input);

    expect(onChangeMock).toHaveBeenCalledWith("tab3");
    expect(onChangeMock).toHaveBeenCalledTimes(2);
  });

  it("should not call onChange when an input radio is clicked but disabled", () => {
    const { getByRole, container } = render(
      <Radio
        disabled={true}
        options={suggestions}
        active={suggestions[1].id}
        onChange={onChangeMock}
      />
    );

    expect(container).toMatchSnapshot();

    const input = getByRole("radio", { name: "Tab 3" });
    expect(input).toBeInTheDocument();

    fireEvent.click(input);

    expect(onChangeMock).not.toHaveBeenCalled();
  });
});
