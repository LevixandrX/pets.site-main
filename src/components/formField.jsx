import React from 'react';

const FormField = React.forwardRef(
  ({ id, label, type = 'text', value, onChange, onKeyDown, error, placeholder, multiple = false }, ref) => {
    const uniqueId = `form-${id}`;

    if (type === 'checkbox') {
      return (
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            id={uniqueId}
            name={id}
            className="form-check-input"
            checked={value}
            onChange={onChange}
            ref={ref}
          />
          <label className="form-check-label" htmlFor={uniqueId}>
            {label}
          </label>
          {error && <div className="text-danger">{error}</div>}
        </div>
      );
    }

    if (type === 'file') {
      return (
        <div className="mb-3">
          <label htmlFor={uniqueId} className="form-label">
            {label}
          </label>
          <input
            type="file"
            id={uniqueId}
            name={id}
            className="form-control"
            onChange={onChange}
            multiple={multiple}
            ref={ref}
          />
          {error && <div className="text-danger">{error}</div>}
        </div>
      );
    }

    return (
      <div className="mb-3">
        <label htmlFor={uniqueId} className="form-label">
          {label}
        </label>
        <input
          type={type}
          id={uniqueId}
          name={id}
          className="form-control"
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          ref={ref}
        />
        {error && <div className="text-danger">{error}</div>}
      </div>
    );
  }
);

export default FormField;