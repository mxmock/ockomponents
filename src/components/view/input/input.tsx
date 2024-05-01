import { IconContext, IconType } from "react-icons";

type IconPosition = "left" | "right";
type InputType = "text" | "password" | "email" | "tel" | "number";

interface Suggestions {
  id: string;
  values: string[];
}

interface InputProps {
  id?: string;
  min?: number;
  max?: number;
  step?: number;
  value?: string;
  label?: string;
  type?: InputType;
  disabled?: boolean;
  required?: boolean;
  readonly?: boolean;
  hidelabel?: boolean;
  autofocus?: boolean;
  placeholder?: string;
  suggestions?: Suggestions;
  LeftIcon?: IconType;
  RightIcon?: IconType;
  iconAction?: () => void;
  onChange?: (value: string) => void;
}

const Input = (props: InputProps) => {
  const {
    min,
    max,
    type,
    step,
    value,
    label,
    disabled,
    readonly,
    required,
    hidelabel,
    autofocus,
    placeholder,
    suggestions,
    LeftIcon,
    RightIcon,
    iconAction,
    onChange,
  } = props;

  const id = props.id || "input-id";
  const hasSuggestions = !!suggestions?.values.length;

  const handleChange = (value: string) => {
    if (!onChange) return;
    onChange(value);
  };

  const getLeftIcon = () => {
    if (!LeftIcon) return;
    const size = `calc(100% - 16px)`;
    const color = `var(--left-icon-color, #000)`;
    const className = `field__icon field__icon--left`;
    return (
      <span
        className={className}
        data-testid={`input-left-icon-${id}`}
      >
        <IconContext.Provider value={{ size, color }}>{<LeftIcon />}</IconContext.Provider>
      </span>
    );
  };

  const getRightIcon = () => {
    if (!RightIcon) return;
    const size = `calc(100% - 16px)`;
    const color = `var(--right-icon-color, #000)`;
    const className = `field__icon field__icon--right`;
    if (!iconAction) {
      return (
        <span
          className={className}
          data-testid={`input-right-icon-${id}`}
        >
          <IconContext.Provider value={{ size, color }}>{<RightIcon />}</IconContext.Provider>
        </span>
      );
    }

    return (
      <button
        type="button"
        disabled={!!disabled}
        className={className}
        onClick={() => iconAction()}
      >
        <IconContext.Provider value={{ size, color }}>{<RightIcon />}</IconContext.Provider>
      </button>
    );
  };

  const getIcon = (position: IconPosition) => {
    if (position === "left") return getLeftIcon();
    if (position === "right") return getRightIcon();
  };

  return (
    <div
      className={`field ${hidelabel ? "field--hide-label" : ""} ${
        !LeftIcon ? "" : "field--with-left-icon"
      } ${!RightIcon ? "" : "field--with-right-icon"}`}
    >
      <input
        id={id}
        name={id}
        min={min ?? 0}
        step={step ?? 1}
        max={max ?? 10000}
        value={value || ""}
        disabled={!!disabled}
        readOnly={!!readonly}
        required={!!required}
        type={type || "text"}
        autoFocus={!!autofocus}
        className={`field__input`}
        placeholder={placeholder || ""}
        autoComplete={hasSuggestions ? "off" : "on"}
        list={hasSuggestions ? suggestions.id : undefined}
        // onFocus={e => e.currentTarget.select()}
        onChange={(e) => handleChange(e.target.value)}
      />
      {getIcon("left")}
      {getIcon("right")}
      <label
        htmlFor={id}
        className={`field__label ${!required ? "" : "field__label--required"}`}
      >
        {label || "Input label"}
      </label>

      {hasSuggestions && (
        <datalist
          data-testid={`input-listbox-${id}`}
          id={suggestions.id}
        >
          {suggestions.values.map((val, i) => (
            <option
              key={i}
              value={val}
            ></option>
          ))}
        </datalist>
      )}
    </div>
  );
};

export default Input;
