import SignInButton from "@/_components/SigninButton";
import { signInAction } from "@/_lib/actions";
import { auth } from "@/_lib/auth";
import { redirect } from "next/navigation";

export default async function Login() {
  const session = await auth();

  if (session?.user?.id) {
    return redirect("/");
  }

  return (
    <div className="flex h-full items-center justify-center bg-gradient-to-br from-neutral-900 to-neutral-800 p-4">
      <div className="w-full max-w-md animate-[fadeIn_0.5s_ease-out]">
        <div className="overflow-hidden rounded-2xl border border-neutral-700 bg-neutral-800 shadow-xl">
          <div className="p-8">
            <h2 className="mb-2 text-center text-2xl font-bold text-neutral-100">
              Welcome back
            </h2>
            <p className="mb-8 text-center text-neutral-400">
              Choose your preferred sign in method
            </p>

            <form
              action={async (formData) => {
                "use server";

                const provider = formData.get("provider");

                if (provider === "Google") {
                  await signInAction("google");
                } else if (provider === "Github") {
                  await signInAction("github");
                }
              }}
            >
              <SignInButton provider="Google" color="blue" />
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-neutral-700"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-neutral-800 px-4 text-neutral-500">
                    Or continue with
                  </span>
                </div>
              </div>

              <SignInButton provider="Github" color="gray" />
            </form>
          </div>

          <div className="border-t border-neutral-700 bg-neutral-900 px-8 py-6">
            <p className="text-center text-sm text-neutral-500">
              By continuing, you agree to our Terms of Service and Privacy
              Policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
