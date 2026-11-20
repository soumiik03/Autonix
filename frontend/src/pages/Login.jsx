import { LoginForm } from "../components/login-form";
import { Brand } from "../components/Brand";

export default function Login() {
  return <main className="login-page">
    <div className="login-wrap">
      <div className="brand login-brand"><Brand /> AUTONIX</div>
      <div className="login-heading"><h1>Welcome to Autonix</h1><p>Build and manage useful AI agents from one simple workspace.</p></div>
      <LoginForm />
      <p className="login-note">By continuing, you agree to use Autonix responsibly. Your workspace is private to your account.</p>
    </div>
  </main>;
}
