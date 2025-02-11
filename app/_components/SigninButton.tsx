"use client";

import { signInAction } from "@/_lib/actions";
import { Github, Mail } from "lucide-react";

function SignInButton() {
  return (
    <div className="flex h-full items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="w-full max-w-md animate-[fadeIn_0.5s_ease-out]">
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg">
          <div className="p-8">
            <h2 className="mb-2 text-center text-2xl font-bold text-gray-800">
              Welcome back
            </h2>
            <p className="mb-8 text-center text-gray-600">
              Choose your preferred sign in method
            </p>

            <div className="space-y-4">
              <button
                onClick={() => signInAction("google")}
                className="group relative h-14 w-full overflow-hidden rounded-lg border border-gray-200 transition-colors"
              >
                <div className="absolute inset-0 w-2 bg-blue-500 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
                <div className="relative flex items-center justify-center space-x-4 text-gray-600 transition-colors duration-[250ms] group-hover:text-white">
                  <Mail className="h-5 w-5" />
                  <span className="font-medium">Continue with Google</span>
                </div>
              </button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-4 text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>

              <button
                onClick={() => signInAction("github")}
                className="group relative h-14 w-full overflow-hidden rounded-lg border border-gray-200 transition-colors"
              >
                <div className="absolute inset-0 w-2 bg-gray-900 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
                <div className="relative flex items-center justify-center space-x-4 text-gray-600 transition-colors duration-[250ms] group-hover:text-white">
                  <Github className="h-5 w-5" />
                  <span className="font-medium">Continue with GitHub</span>
                </div>
              </button>
            </div>
          </div>

          <div className="border-t border-gray-100 bg-gray-50 px-8 py-6">
            <p className="text-center text-sm text-gray-500">
              By continuing, you agree to our Terms of Service and Privacy
              Policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignInButton;
