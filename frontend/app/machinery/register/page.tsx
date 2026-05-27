import RegisterForm from "@/components/machinery/registerForm";

export default function RegisterPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-12 lg:py-16">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          List your machine
        </h1>
        <p className="mt-3 text-lg text-neutral-600">
          Fill in the details below and start getting rental requests from
          contractors nearby.
        </p>
      </div>

      <RegisterForm />
    </div>
  );
}