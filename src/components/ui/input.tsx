import React from "react";

interface InputFieldProps {
  label?: string;
  type?: string;
  placeholder?: string;
  value?: string | number;
  name?: string;
  min?: string;
  step?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: React.ReactNode;
  errorMessage?: string;
  className?: string;
  autoFocus?: boolean;
  inputLabelClassName?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type = "text",
  placeholder,
  value,
  name,
  onChange,
  icon,
  inputLabelClassName,
  className,
  min,
  step,
  autoFocus,
}) => {
  return (
    <div className="flex flex-col w-full">
      {/* Label */}
      {label && (
        <label className={`${inputLabelClassName}`}>
          {label}
        </label>
      )}

      {/* Input Wrapper */}
      <div className="relative">
        {/* Icon */}
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}

        {/* Input */}
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          min={min}
          step={step}
          className={className}
          autoFocus={autoFocus}
        />
      </div>

      {/* Error Message */}
      {/* {errorMessage && (
        <div className="flex items-center mt-1 text-sm text-red-500">
          {errorMessage}
        </div>
      )} */}
    </div>
  );
};

export default InputField;