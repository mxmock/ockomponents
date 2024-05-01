import { IconContext, IconType } from "react-icons";
import { useState, useEffect, CSSProperties } from "react";

interface Option {
  id: string;
  label: string;
  Icon?: IconType;
}

interface RadioProps {
  id?: string;
  label?: string;
  active: string;
  options: Option[];
  disabled?: boolean;
  onChange: (active: string) => void;
}

const getStyle = (indicatorSpace?: string) =>
  ({
    [`--indicator-space`]: indicatorSpace,
  } as CSSProperties);

const Radio = (props: RadioProps) => {
  const { id, options, active, label, disabled, onChange } = props;

  const [indicatorPosition, setIndicatorPosition] = useState(0);

  if (!options?.length) return <p>No options for Radio component</p>;

  const handleRadioChange = (options: Option[], id: string) => {
    if (!onChange || typeof onChange !== "function" || !!disabled) return;
    const index = options.findIndex((s) => s.id === id);
    setIndicatorPosition(index);
    onChange(options[index].id);
  };

  const getIcon = (id: string, Icon?: IconType) => {
    if (!Icon) return;
    return (
      <span
        className={"radio__icon"}
        data-testid={`radio-icon-${id}`}
      >
        <IconContext.Provider value={{ size: "16px", color: "var(--radio-icon-color)" }}>
          {<Icon />}
        </IconContext.Provider>
      </span>
    );
  };

  useEffect(() => {
    const selectedId = active || options[0].id;
    handleRadioChange(options, selectedId);
  }, []);

  return (
    <div
      className={`radio ${!label ? "" : "radio--with-label"} ${!disabled ? "" : "radio--disabled"}`}
    >
      <ul
        style={getStyle("6px")}
        className="radio__container"
      >
        <li
          className="radio__indicator"
          style={{
            width: `calc(${(1 / options.length) * 100}% - var(--indicator-space) * 2)`,
            left: `calc(${(indicatorPosition / options.length) * 100}% + var(--indicator-space))`,
          }}
        ></li>
        {options.map((s) => (
          <li
            key={s.id}
            className="radio__field"
          >
            <input
              id={s.id}
              type="radio"
              value={s.id}
              disabled={!!disabled}
              name={id || "radio-id"}
              checked={s.id === active}
              onChange={(e) => handleRadioChange(options, e.target.value)}
            />
            <label htmlFor={s.id}>
              {getIcon(s.id, s.Icon)}
              <span>{s.label}</span>
            </label>
          </li>
        ))}
      </ul>
      {!!label?.length && <span className="radio__label">{label}</span>}
    </div>
  );
};

export default Radio;
