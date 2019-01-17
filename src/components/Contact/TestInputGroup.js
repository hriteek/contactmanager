import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

const TestInputGroup = props => {
  const { label, name, onChange, value, placeholder, type, error } = props;
  return (
    <div>
      <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <input
          type={type} //to define the input type
          name={name} //this is to use while setting state
          className={classnames("form-control form-contorl-lg", {
            "is-invalid": error
          })}
          id={name} //this is for the label to work properly
          placeholder={placeholder}
          value={value} //this binds this input field with the state
          onChange={onChange} //this is onChnage event
        />
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
    </div>
  );
};

TestInputGroup.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
};

TestInputGroup.defaultProps = {
  type: "text"
};
export default TestInputGroup;
