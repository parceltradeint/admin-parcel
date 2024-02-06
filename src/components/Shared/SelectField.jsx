import React from "react";

const SelectField = ({
  defaultValue,
  register,
  handleInputChange,
  name,
  options,
  className,
  required
}) => {
  return (
    <select
      defaultValue={defaultValue?.toUpperCase()}
      name={name}
      {...register(name, {
        required: required,
        onChange: (e) => handleInputChange(name, e.target.value?.toUpperCase()),
      })}
      className={`uppercase block w-full px-4 py-2 text-gray-700 bg-white focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 ${className}`}
    >
      {options.map((item, i) => (
        <option value={item.value} key={i} selected={item?.isSelected || false}>
          {item.name}
        </option>
      ))}
    </select>
  );
};

export default SelectField;
