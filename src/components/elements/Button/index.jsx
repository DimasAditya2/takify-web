import PropTypes from "prop-types";

const Button = (props) => {
  const { children, className, type = "submit", onClick = () => {} } = props;

  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-slate-50 p-2 w-20 text-black rounded-md font-medium hover:text-blue-600 ${className}`}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  type: PropTypes.string,
  onClick: PropTypes.func
};

export default Button;
