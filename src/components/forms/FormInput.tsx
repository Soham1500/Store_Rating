import React from 'react';
import classNames from 'classnames';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  error,
  helperText,
  id,
  className,
  ...props
}) => {
  const inputId = id || `input-${Math.random().toString(36).substring(2, 9)}`;
  
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={classNames(
          'block w-full rounded-md shadow-sm focus:ring focus:ring-opacity-50 transition-colors duration-200',
          error
            ? 'border-error focus:border-error focus:ring-error'
            : 'border-gray-300 focus:border-primary focus:ring-primary',
          className
        )}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-error">{error}</p>}
      {helperText && !error && <p className="mt-1 text-sm text-gray-500">{helperText}</p>}
    </div>
  );
};

export default FormInput;