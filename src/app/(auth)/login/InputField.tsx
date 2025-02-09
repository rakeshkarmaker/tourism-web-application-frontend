//This component makes the input fields reusable and accessible.
'use scrict';
import React from "react";

interface InputFieldProps {
  label: string;
  type: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({ label, type, id, value, onChange }) => {
  return (
    <div className="flex flex-col mt-6">
      <label htmlFor={id} className="mb-2 text-lg text-gray-700">{label}</label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        className="px-4 py-2 border rounded-md focus:ring-2 focus:ring-teal-300 outline-none"
        required
      />
    </div>
  );
};

export default InputField;
