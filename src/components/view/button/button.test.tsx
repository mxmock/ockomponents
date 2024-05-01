import Button from "./button";
import { FiMenu } from "react-icons/fi";
import { expect, describe, it, vi } from "vitest";
import { render, fireEvent } from "@testing-library/react";

describe("button component", () => {
  const onClickMock = vi.fn();
  it("should render a button with default text when no text prop is passed", () => {
    const { getByText, container } = render(<Button />);
    expect(container).toMatchSnapshot();
    expect(getByText(/my button/i)).toBeInTheDocument();
  });

  it("should render a button with custom text when text prop is passed", () => {
    const { getByText, container } = render(<Button text="My custom awesome button" />);
    expect(container).toMatchSnapshot();
    expect(getByText(/my custom awesome button/i)).toBeInTheDocument();
  });

  it("should have a type 'button' by default", () => {
    const { getByRole, container } = render(<Button />);
    expect(container).toMatchSnapshot();
    const button = getByRole("button");
    expect(button).toHaveAttribute("type", "button");
  });

  it("should have a type 'submit' when type prop is passed as 'submit'", () => {
    const { getByRole, container } = render(<Button type="submit" />);
    expect(container).toMatchSnapshot();
    const button = getByRole("button");
    expect(button).toHaveAttribute("type", "submit");
  });

  it("should render a disabled button when disabled prop is passed as true", () => {
    const { getByRole, container } = render(<Button disabled={true} />);
    expect(container).toMatchSnapshot();
    const button = getByRole("button");
    expect(button).toBeDisabled();
  });

  it("should render a button with class 'button--outline' when 'outline' prop is passed as true", () => {
    const { getByRole, container } = render(<Button outline={true} />);
    expect(container).toMatchSnapshot();
    const button = getByRole("button");
    expect(button).toBeInTheDocument();
    expect(container.firstChild).toHaveClass("button--outline");
  });

  it('should call onClick function when button is clicked and type prop is not "submit" and onClick prop is passed', () => {
    const { getByText, container } = render(<Button onClick={onClickMock} />);
    expect(container).toMatchSnapshot();
    const button = getByText("My button");
    fireEvent.click(button);
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  it("should render a button with custom link when link prop is passed", () => {
    const { getByRole, container } = render(<Button link="https://example.com" />);
    expect(container).toMatchSnapshot();
    const button = getByRole("link");
    expect(button).toBeInTheDocument();
    expect(button.tagName).toBe("A");
    expect(button).toHaveAttribute("href", "https://example.com");
  });

  it("should render a disabled link when disabled prop is passed as true", () => {
    const { getByRole, container } = render(
      <Button
        link="#example"
        disabled={true}
      />
    );
    expect(container).toMatchSnapshot();
    const button = getByRole("link");
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("disabled");
  });

  it("should not call onClick function when link is clicked", () => {
    const { getByText, container } = render(
      <Button
        link="#example"
        onClick={onClickMock}
      />
    );
    expect(container).toMatchSnapshot();
    fireEvent.click(getByText("My button"));
    expect(onClickMock).not.toHaveBeenCalled();
  });

  it('should not call onClick function when button is clicked and type prop is "submit"', () => {
    const { getByRole, container } = render(
      <Button
        type="submit"
        onClick={onClickMock}
      />
    );
    expect(container).toMatchSnapshot();
    const button = getByRole("button");
    fireEvent.click(button);
    expect(onClickMock).not.toHaveBeenCalled();
  });

  it("should render a button with an icon when 'Icon' prop is passed", () => {
    const { getByRole, getByTestId, container } = render(<Button Icon={FiMenu} />);
    expect(container).toMatchSnapshot();
    const button = getByRole("button");
    expect(button).toBeInTheDocument();

    const iconElement = getByTestId("icon");
    expect(iconElement).toBeInTheDocument();
  });
});
