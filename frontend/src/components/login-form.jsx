import { Button } from "@/components/ui/button"

export function LoginForm() {
  return (
    <Button
      type="button"
      className="h-12 w-full gap-3 rounded-none border border-[#c9d2dc]/35 bg-[#06070B] px-5 text-sm font-medium text-[#c9d2dc] shadow-none hover:border-[#c9d2dc] hover:bg-[#c9d2dc] hover:text-[#06070B] focus-visible:border-[#c9d2dc] focus-visible:ring-[#c9d2dc]/40"
    >
      <svg
        aria-hidden="true"
        className="size-[18px]"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M21.35 12.23c0-.71-.06-1.39-.18-2.05H12v3.88h5.24a4.48 4.48 0 0 1-1.95 2.94v2.44h3.16c1.85-1.7 2.9-4.2 2.9-7.21ZM12 21.75c2.65 0 4.88-.88 6.51-2.39l-3.16-2.44c-.88.59-2 .95-3.35.95-2.57 0-4.75-1.73-5.53-4.06H3.2v2.52A9.83 9.83 0 0 0 12 21.75ZM6.47 13.81a5.91 5.91 0 0 1 0-3.62V7.67H3.2a9.83 9.83 0 0 0 0 8.66l3.27-2.52ZM12 6.13c1.45 0 2.75.5 3.78 1.5l2.83-2.83C16.87 3.2 14.65 2.25 12 2.25a9.83 9.83 0 0 0-8.8 5.42l3.27 2.52C7.25 7.86 9.43 6.13 12 6.13Z" />
      </svg>
      Continue with Google
    </Button>
  )
}
