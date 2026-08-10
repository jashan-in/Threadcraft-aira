import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#fff8f4] px-4">
      <SignUp
        appearance={{
          variables: {
            colorPrimary: "#d98186",
          },
        }}
      />
    </main>
  );
}