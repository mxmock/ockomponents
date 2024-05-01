import { Fragment } from "react";
import { IconContext } from "react-icons";
import { FiChevronDown } from "react-icons/fi";

interface Option {
  id: string;
  label: string;
}

interface OptionGroup {
  label: string;
  group: Option[];
}

interface SelectProps {
  id?: string;
  label?: string;
  value?: string[];
  multiple?: boolean;
  required?: boolean;
  disabled?: boolean;
  autoFocus?: boolean;
  hidelabel?: boolean;
  options: Array<Option | OptionGroup>;
  onChange?: (values: string[]) => void;
}

const Select = (props: SelectProps) => {
  const { options, label, multiple, hidelabel, required, disabled, autoFocus, onChange } = props;

  if (!options?.length) return <p>No options for Select component</p>;

  const id = props.id || "select-id";
  const value = !props.value?.length ? [getDefaultValue(options[0])] : props.value;

  const handleOnChange = (options: HTMLOptionElement[]) => {
    if (!onChange || typeof onChange !== "function" || !!disabled) return;
    const values = options.map((option) => option.value);
    onChange(values);
  };

  return (
    <div
      className={`field ${!multiple ? "field--with-right-icon" : ""} ${
        hidelabel ? "field--hide-label" : ""
      }`}
    >
      <select
        id={id}
        name={id}
        multiple={!!multiple}
        required={!!required}
        disabled={!!disabled}
        autoFocus={!!autoFocus}
        className="field__input"
        value={multiple ? value : value[0]}
        size={!multiple ? 0 : getOptionsLength(options)}
        onChange={(e) => handleOnChange(Array.from(e.target.selectedOptions))}
      >
        {options.map((o, i) => (
          <Fragment key={i}>
            {isGroup(o) ? (
              <optgroup label={o.label}>
                {o.group.map((g, j) => (
                  <option
                    value={g.id}
                    key={`${i}${j}-${g.id}`}
                  >
                    {g.label}
                  </option>
                ))}
              </optgroup>
            ) : (
              <option value={o.id}>{o.label}</option>
            )}
          </Fragment>
        ))}
      </select>
      {!multiple && (
        <span
          data-testid={`select-right-icon-${id}`}
          className={"field__icon field__icon--right"}
        >
          <IconContext.Provider
            value={{ size: `calc(100% - 16px)`, color: `var(--right-icon-color, #000)` }}
          >
            {<FiChevronDown />}
          </IconContext.Provider>
        </span>
      )}
      <label
        htmlFor={id}
        className={`field__label ${!required ? "" : "field__label--required"}`}
      >
        {label || "Select label"}
      </label>
    </div>
  );
};

const isGroup = (object: Option | OptionGroup): object is OptionGroup => "group" in object;

const getOptionsLength = (options: Array<Option | OptionGroup>) => {
  const length = options.reduce((prev, o) => {
    const size = isGroup(o) ? o.group.length + 1 : 1;
    return prev + size;
  }, 0);
  return length > 10 ? 10 : length;
};

const getDefaultValue = (firstVal: Option | OptionGroup) =>
  !isGroup(firstVal)
    ? firstVal.id
    : !!firstVal.group.length
    ? firstVal.group[0].id
    : "No selected value";

export default Select;
