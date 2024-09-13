import PropTypes from "prop-types";

const Button = (props) => {
  const { children, className, type } = props;

  return (
    <button
      type={type}
      className={`bg-slate-50 p-2 w-20 text-black rounded-sm font-medium hover:text-pink-200 ${className}`}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  type: PropTypes.string,
};

Button.defaultProps = {
  className: '',
  type: 'submit',
};

export default Button;
