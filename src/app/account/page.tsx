import Header from "@/components/layout/Header";

export default function AccountPage() {
  return (
    <>
      <Header />

      <main className="container-main py-20">
        <h1 className="font-serif text-4xl text-[#2f2928]">
          My Account
        </h1>

        <p className="mt-3 text-neutral-500">
          Your account dashboard will appear here.
        </p>
      </main>
    </>
  );
}