import { LoginForm } from "../components/login-form";
import { Brand } from "../components/Brand";
import { Card, CardContent } from "../components/ui/card";

export default function Login() {
  return <main className="login-page">
    <Card className="login-wrap border-0 bg-white p-0 shadow-none">
      <CardContent className="p-0">
      <div className="brand login-brand"><Brand /> AUTONIX</div>
      <div className="login-heading"><h1>Welcome to Autonix</h1><p>Build and manage useful AI agents from one simple workspace.</p></div>
      <LoginForm />
      <p className="login-note">By continuing, you agree to use Autonix responsibly. Your workspace is private to your account.</p>
      </CardContent>
    </Card>
  </main>;
}
