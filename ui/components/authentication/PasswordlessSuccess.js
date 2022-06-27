export default function PasswordlessSuccess({ setSuccess }) {
  return (
    <>
      <h2>You've Got Mail!</h2>
      <h3 className="text-grey bold">
        Please check your email Inbox and Junk Mail for the Magic Link
      </h3>
      <div className="centered">
        <button
          className="text-orange"
          onClick={(ev) => {
            setSuccess(false);
          }}
        >
          Try Again
        </button>
      </div>
    </>
  );
}
