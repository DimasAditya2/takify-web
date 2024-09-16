import PropTypes from "prop-types";

const Button = (props) => {
  const { children, className, variant = "bg-slate-50", type = "submit", onClick = () => {} } = props;

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${variant} p-2 text-black border-2 rounded-md font-medium hover:text-blue-600 ${className}`}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  type: PropTypes.string,
  onClick: PropTypes.func,
  variant: PropTypes.string
};

export default Button;
