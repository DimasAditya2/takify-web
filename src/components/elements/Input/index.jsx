import { forwardRef } from "react";
import Input from "./Input";
import Label from "./Label";
import PropTypes from "prop-types";

const InputForm = forwardRef((props,ref) => {
  const { htmlFor, placeholder, type, label, name } = props;
  return (
    <div>
      <Label htmlFor={htmlFor}>{label}</Label>
      <Input placeholder={placeholder} type={type} name={name} id={name} ref={ref}/>
    </div>
  );
});

InputForm.displayName = 'InputForm'; 

InputForm.propTypes = {
  htmlFor: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default InputForm;
