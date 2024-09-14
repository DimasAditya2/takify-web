import PropTypes from "prop-types";

const Label = (props) => {
  const { htmlFor, children } = props;
  return (
    <label
      htmlFor={htmlFor}
      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    >
      {children}
    </label>
  );
};

Label.propTypes = {
  htmlFor: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default Label;
