import LoginForm from "../components/LoginForm";
import RegistrationForm from "../components/RegistrationForm";

export default function Home() {
  return (
    <>
      <div className="row bg-darker" id="register">
        <RegistrationForm />
      </div>
      <div className="row bg-mid-light" id="login">
        <LoginForm />
      </div>
    </>
  );
}
