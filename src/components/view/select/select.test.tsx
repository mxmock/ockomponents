import Select from "./select";
import { expect, describe, it, vi } from "vitest";
import { render, fireEvent } from "@testing-library/react";

const selectOptions = [
  { id: "select1", label: "Select 1" },
  {
    label: "Group 1",
    group: [
      { id: "grpselect1", label: "Group Select 1" },
      { id: "grpselect2", label: "Group Select 2" },
      { id: "grpselect3", label: "Group Select 3" },
    ],
  },
  { id: "select2", label: "Select 2" },
  { id: "select3", label: "Select 3" },
  {
    label: "Group 2",
    group: [
      { id: "grpselect4", label: "Group Select 4" },
      { id: "grpselect5", label: "Group Select 5" },
      { id: "grpselect6", label: "Group Select 6" },
    ],
  },
];

describe("select component", () => {
  const onChangeMock = vi.fn();

  it("should render a select with list of elements", () => {
    const { getByRole, getByText, container } = render(<Select options={selectOptions} />);
    expect(container).toMatchSnapshot();

    const select = getByRole("combobox");
    expect(select).toBeInTheDocument();

    expect(select.children.length).toBe(5);
    expect(select).toHaveAttribute("id", "select-id");

    expect(getByText(/select label/i)).toBeInTheDocument();
  });

  it("should render a select with custom id & label when 'id' and 'label' props are passed", () => {
    const { getByRole, getByText, container } = render(
      <Select
        label="My Select"
        id="select-test-id"
        options={selectOptions}
      />
    );
    expect(container).toMatchSnapshot();

    const select = getByRole("combobox");
    expect(select).toBeInTheDocument();

    expect(select).toHaveAttribute("id", "select-test-id");
    expect(getByText(/my select/i)).toBeInTheDocument();
  });

  it("should render a select with multiple, required and disabled attributes when this props are passed", () => {
    const { getByRole, container } = render(
      <Select
        multiple={true}
        disabled={true}
        required={true}
        options={selectOptions}
      />
    );
    expect(container).toMatchSnapshot();

    const select = getByRole("listbox");
    expect(select).toBeInTheDocument();

    expect(select).toHaveAttribute("multiple");
    expect(select).toHaveAttribute("required");
    expect(select).toHaveAttribute("disabled");
  });

  it("should call onChange function with the new value when input value changes, in non multiple mode", () => {
    const { container, getByRole } = render(
      <Select
        options={selectOptions}
        onChange={onChangeMock}
      />
    );

    expect(container).toMatchSnapshot();

    const select = getByRole("combobox");

    fireEvent.change(select, { target: { value: "select2" } });

    expect(onChangeMock).toHaveBeenCalledWith(["select2"]);
  });

  it("should call onChange function with the new value when input value changes, in multiple mode", () => {
    const { container, getByRole } = render(
      <Select
        multiple={true}
        options={selectOptions}
        onChange={onChangeMock}
      />
    );

    expect(container).toMatchSnapshot();

    const select = getByRole("listbox");

    fireEvent.change(select, { target: { value: "select2" } });

    expect(onChangeMock).toHaveBeenCalledWith(["select2"]);
  });
  it("should not call onChange function with when disabled", () => {
    const { container, getByRole } = render(
      <Select
        disabled={true}
        options={selectOptions}
        onChange={onChangeMock}
      />
    );

    expect(container).toMatchSnapshot();

    const select = getByRole("combobox");

    fireEvent.change(select, { target: { value: "select2" } });

    expect(onChangeMock).not.toHaveBeenCalled();
  });
  it("should not call onChange function with when onChange is undefined", () => {
    const { container, getByRole } = render(<Select options={selectOptions} />);

    expect(container).toMatchSnapshot();

    const select = getByRole("combobox");

    fireEvent.change(select, { target: { value: "select2" } });

    expect(onChangeMock).not.toHaveBeenCalled();
  });
});
