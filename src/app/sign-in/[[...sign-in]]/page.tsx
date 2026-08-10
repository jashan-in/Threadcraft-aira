import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#fff8f4] px-4">
      <SignIn
        appearance={{
          variables: {
            colorPrimary: "#d98186",
          },
        }}
      />
    </main>
  );
}