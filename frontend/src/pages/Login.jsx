import { LoginForm } from "@/components/login-form"

export const Login = () => {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#06070B] px-5 py-12 text-[#c9d2dc]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(201,210,220,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(201,210,220,0.035)_1px,transparent_1px)] bg-[size:48px_48px]"
      />
      <section className="relative w-full max-w-[420px] border border-[#c9d2dc]/20 bg-[#06070B] p-8 shadow-[0_24px_100px_rgba(6,7,11,0.65)] sm:p-10">
        <div className="mb-10 flex items-center justify-center gap-3">
          <svg
            aria-hidden="true"
            className="size-9 text-[#c9d2dc]"
            viewBox="0 0 40 40"
            fill="none"
          >
            <path
              d="M20 3.5 35 12v16L20 36.5 5 28V12L20 3.5Z"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="square"
            />
            <path
              d="M13 27V13l14 14V13"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="square"
              strokeLinejoin="miter"
            />
          </svg>
          <span className="text-sm font-semibold tracking-[0.24em]">AUTONIX</span>
        </div>

        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold tracking-tight sm:text-[28px]">
            Welcome back
          </h1>
          <p className="mt-2 text-sm leading-6 text-[#c9d2dc]/60">
            Sign in to continue to your workspace.
          </p>
        </div>

        <LoginForm />
      </section>
    </main>
  )
}

export default Login
