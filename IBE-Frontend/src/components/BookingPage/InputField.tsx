import React from "react";
import "./Input.style.scss";
interface InputFieldProps {
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  errorMessage?: string;
  // options?: string[];
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  placeholder = "",
  value,
  onChange,
  errorMessage = "",
  // "Field cannot be empty",
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className="input-field">
      <label className="input-label">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        className={`input-field ${errorMessage ? "error" : ""}`}
        required
      />
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default InputField;
