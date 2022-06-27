export default function MCWForm({ submit, children, loading }) {
  return (
    <form
      onSubmit={(ev) => {
        ev.preventDefault();
        submit();
      }}
    >
      {children}
      <button type="submit">
        {loading && <i className="fa fa-cog fa-spin"></i>} Submit
      </button>
    </form>
  );
}
