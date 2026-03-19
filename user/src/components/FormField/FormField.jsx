"use client";

/**
 * Reusable form field component – handles text, select, textarea, date, email, number
 */
export default function FormField({ label, name, type = "text", value, onChange, options, placeholder, required = true, rows }) {
  const id = `field-${name}`;

  const baseInput = {
    width: "100%",
    padding: "12px 16px",
    border: "1.5px solid var(--border)",
    borderRadius: "var(--radius-sm)",
    fontSize: 15,
    color: "var(--text)",
    background: "#fff",
    transition: "border var(--transition), box-shadow var(--transition)",
    outline: "none",
  };

  const handleFocus = (e) => {
    e.target.style.borderColor = "var(--primary)";
    e.target.style.boxShadow = "0 0 0 3px rgba(108,99,255,.12)";
  };
  const handleBlur = (e) => {
    e.target.style.borderColor = "var(--border)";
    e.target.style.boxShadow = "none";
  };

  let input;
  if (type === "select") {
    input = (
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        style={{ ...baseInput, cursor: "pointer" }}
        onFocus={handleFocus}
        onBlur={handleBlur}
      >
        <option value="">{placeholder || "Select..."}</option>
        {(options || []).map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    );
  } else if (type === "textarea") {
    input = (
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        rows={rows || 4}
        style={{ ...baseInput, resize: "vertical" }}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    );
  } else {
    input = (
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        style={baseInput}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label htmlFor={id} style={{ fontSize: 14, fontWeight: 600, color: "var(--text)" }}>
        {label} {required && <span style={{ color: "var(--accent)" }}>*</span>}
      </label>
      {input}
    </div>
  );
}
