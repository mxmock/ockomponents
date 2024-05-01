import Input from "./input";
import { FiMenu } from "react-icons/fi";
import { expect, describe, it, vi } from "vitest";
import { render, fireEvent } from "@testing-library/react";

describe("input component", () => {
  it("should render an input element with default props when no props are passed", () => {
    const { container, getByRole, getByText } = render(<Input />);
    expect(container).toMatchSnapshot();

    const input = getByRole("textbox");
    const label = getByText("Input label");

    expect(label).toBeInTheDocument();

    expect(input).toHaveAttribute("min", "0");
    expect(input).toHaveAttribute("step", "1");
    expect(input).toHaveAttribute("value", "");
    expect(input).toHaveAttribute("max", "10000");
    expect(input).toHaveAttribute("type", "text");
    expect(input).not.toHaveAttribute("disabled");
    expect(input).not.toHaveAttribute("required");
    expect(input).toHaveAttribute("id", "input-id");
    expect(input).toHaveAttribute("placeholder", "");
    expect(input).toHaveAttribute("name", "input-id");
    expect(input).not.toHaveFocus();
  });
  it("should render an input element with custom props when props are passed", async () => {
    const { getByRole, getByText, container } = render(
      <Input
        min={45}
        max={300}
        step={43}
        id="my-input"
        value="value input"
        disabled={true}
        required={true}
        type="number"
        placeholder={"my placeholder"}
        hidelabel={true}
        label="my label"
      />
    );
    expect(container).toMatchSnapshot();

    const input = getByRole("spinbutton");

    expect(getByText("my label")).toBeInTheDocument();
    expect(container.firstChild).toHaveClass("field--hide-label");

    expect(input).toHaveAttribute("disabled");
    expect(input).toHaveAttribute("required");
    expect(input).toHaveAttribute("min", "45");
    expect(input).toHaveAttribute("step", "43");
    expect(input).toHaveAttribute("id", "my-input");
    expect(input).toHaveAttribute("max", "300");
    expect(input).toHaveAttribute("name", "my-input");
    expect(input).toHaveAttribute("value", "value input");
    expect(input).toHaveAttribute("type", "number");
    expect(input).toHaveAttribute("placeholder", "my placeholder");
  });
  it("should render an input element with suggestions (datalist) when suggestions props is passed", () => {
    const { container, getByTestId } = render(
      <Input suggestions={{ id: "my-suggestions", values: ["Value 1", "Value 2", "Value 3"] }} />
    );
    expect(container).toMatchSnapshot();

    const datalist = getByTestId("input-listbox-input-id");

    expect(datalist).toBeInTheDocument();
    expect(datalist.children.length).toBe(3);
  });
  it("should call onChange function with the new value when input value changes", () => {
    const onChangeMock = vi.fn();
    const { container, getByRole } = render(<Input onChange={onChangeMock} />);
    expect(container).toMatchSnapshot();

    const input = getByRole("textbox");

    fireEvent.change(input, { target: { value: "new value" } });

    expect(onChangeMock).toHaveBeenCalledWith("new value");
  });
  it("should render an icon element with the LeftIcon prop", () => {
    const { getByTestId, container } = render(<Input LeftIcon={FiMenu} />);
    expect(container).toMatchSnapshot();

    const iconElement = getByTestId("input-left-icon-input-id");
    // const icon = within(iconElement).getByText("Icon");

    expect(iconElement).toBeInTheDocument();
    // expect(icon).toBeInTheDocument();
  });
  it("should render an icon element with the RightIcon prop", () => {
    const { getByTestId, container } = render(<Input RightIcon={FiMenu} />);
    expect(container).toMatchSnapshot();

    const iconElement = getByTestId("input-right-icon-input-id");
    expect(iconElement).toBeInTheDocument();
  });
  it("should render an actionable icon element with the RightIcon prop & iconAction prop", () => {
    const onClickIcon = vi.fn();
    const { getByRole, container } = render(
      <Input
        RightIcon={FiMenu}
        iconAction={onClickIcon}
      />
    );
    expect(container).toMatchSnapshot();

    const iconElement = getByRole("button");
    expect(iconElement).toBeInTheDocument();

    fireEvent.click(iconElement);

    expect(onClickIcon).toHaveBeenCalledOnce();
  });
});
