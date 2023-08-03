import "./styles.css";

interface IButton {
  label: string;
  type?: string;
  primary?: boolean;
  small?: boolean;
  [x: string]: any;
}
export default function Button({
  label,
  type,
  primary,
  small,
  ...props
}: IButton) {
  return (
    <input
      type={type ? type : "button"}
      value={label}
      className={`button ${primary ? "primary" : ""} ${small ? "small" : ""}`}
      {...props}
    />
  );
}
