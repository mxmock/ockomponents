import { CSSProperties } from "react";
import { IconContext, IconType } from "react-icons";

interface ButtonProps {
  text?: string;
  link?: string;
  size?: string;
  color?: string;
  bgColor?: string;
  outline?: boolean;
  disabled?: boolean;
  alignment?: string;
  borderColor?: string;
  type?: "submit" | "button";
  Icon?: IconType;
  onClick?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

const getStyle = (
  size?: string,
  color?: string,
  bgColor?: string,
  alignment?: string,
  borderColor?: string
) =>
  ({
    [`--btn-bg`]: bgColor,
    [`--btn-color`]: color,
    [`--btn-font-size`]: size,
    [`--btn-alignment`]: alignment,
    [`--btn-border-color`]: borderColor,
  } as CSSProperties);

const Button = (props: ButtonProps) => {
  const {
    text,
    type,
    size,
    link,
    color,
    bgColor,
    outline,
    disabled,
    alignment,
    borderColor,
    Icon,
    onClick,
  } = props;

  const handleClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (type === "submit" || !onClick) return;
    onClick(e);
  };

  const getIcon = () => {
    if (!Icon) return;
    return (
      <span
        className={"button__icon"}
        data-testid="icon"
      >
        <IconContext.Provider value={{ size: "16px", color: "var(--btn-icon-color)" }}>
          {<Icon />}
        </IconContext.Provider>
      </span>
    );
  };

  return (
    <div
      className={`button ${outline ? "button--outline" : ""}`}
      style={getStyle(size, color, bgColor, alignment, borderColor)}
    >
      {!link ? (
        <button
          disabled={!!disabled}
          type={type || "button"}
          onClick={(e) => handleClick(e)}
        >
          {getIcon()}
          {(!!text || !Icon) && <span>{text || "My button"}</span>}
        </button>
      ) : (
        <a
          href={link}
          className={!disabled ? "" : "disabled"}
          onClick={(e) => {
            if (disabled) e.preventDefault();
          }}
        >
          {getIcon()}
          {(!!text || !Icon) && <span>{text || "My button"}</span>}
        </a>
      )}
    </div>
  );
};

export default Button;
