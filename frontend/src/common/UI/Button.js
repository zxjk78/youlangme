import classNames from "classnames/bind";
import styles from "./Button.module.scss";

const classes = classNames.bind(styles);

const Button = (props) => {
  return (
    <button
      type={props.type}
      className={classes("btn", props.size, props.color, props.rounded)}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

Button.defaultProps = {
  size: "medium",
  color: "blue",
};

export default Button;
