import PropTypes from "prop-types";
import { forwardRef } from "react";

const Input = forwardRef((props, ref) => {
  const { type, name, placeholder } = props;
  return (
    <input
      type={type}
      name={name}
      id={name}
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      placeholder={placeholder}
      ref={ref}
    />
  )
});

Input.displayName = 'Input'; 

Input.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string,
  id: PropTypes.string,
  placeholder: PropTypes.string,
};

export default Input;
