import React, { useState } from "react";

const InputField = ({
  register,
  required,
  handleInputChange,
  name,
  placeholder,
  defaultValue,
  className,
  readOnly,
  type
}) => {
  return (
    <input
      {...register(name, {
        required: required,
      })}
      defaultValue={defaultValue}
      name={name}
      placeholder={placeholder}
      onChange={(e) => handleInputChange && handleInputChange(name, e.target.value.toUpperCase())}
      className={`uppercase block w-full px-4 py-2 text-gray-700 bg-white  focus:border-blue-400  focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 ${className}`}
      readOnly={readOnly}
      type={type || "text"}
    />
  );
};

export default InputField;
