import { LoginForm } from "../components/login-form";
import { Brand } from "../components/Brand";
import { Card, CardContent } from "../components/ui/card";

export default function Login() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white px-6 py-10 sm:px-8">
      <div className="mb-6 flex flex-col items-center">
        <div className="brand mb-4"><Brand /> AUTONIX</div>
        <h1 className="m-0 text-center text-[28px] font-medium leading-[1.2] tracking-[-0.035em]">Welcome to Autonix</h1>
      </div>
      <Card className="w-full max-w-[550px] rounded-[28px] border border-[#d9d9d9] bg-white p-0 shadow-none ring-0">
        <CardContent className="p-8 sm:p-14">
          <p className="mb-8 text-center text-[18px] leading-[1.4] tracking-[-0.025em] text-[#737373]">Build and manage useful AI agents from one simple workspace.</p>
          <LoginForm />
          <p className="mt-6 text-center text-[12px] leading-[1.5] text-[#737373]">By continuing, you agree to use Autonix responsibly. Your workspace is private to your account.</p>
        </CardContent>
      </Card>
    </main>
  );
}
