export default function MCWFormField({
  label,
  type = "text",
  value,
  setValue,
  required,
  placeholder,
}) {
  return (
    <>
      <label htmlFor={label}>{label}</label>
      <input
        name={label}
        type={type}
        value={value}
        onChange={(ev) => setValue(ev.currentTarget.value)}
        required={required}
        placeholder={placeholder}
      />
    </>
  );
}
