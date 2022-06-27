export default function Heading({ text1, text2, icon }) {
  return (
    <h2>
      <i className={`fa ${icon}`}></i> <span>{text1}</span>
      <span>{text2}</span>
    </h2>
  );
}
