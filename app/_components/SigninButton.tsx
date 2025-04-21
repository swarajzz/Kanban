import { signInAction } from "@/_lib/actions";
import { auth } from "@/_lib/auth";
import { Github, Mail } from "lucide-react";
import { redirect } from "next/navigation";

function SignInButton(props: { provider: string; color: string }) {
  return (
    <button
      name="provider"
      value={props.provider}
      type="submit"
      className="group relative h-14 w-full overflow-hidden rounded-lg border border-neutral-600 transition-colors"
    >
      <div
        className={`absolute inset-0 w-2 ${props.color === "blue" ? "bg-blue-500" : "bg-gray-900"} transition-all duration-[250ms] ease-out group-hover:w-full`}
      ></div>
      <div className="relative flex items-center justify-center space-x-4 text-neutral-300 transition-colors duration-[250ms] group-hover:text-neutral-50">
        {props.provider === "Google" ? (
          <Mail className="h-5 w-5" />
        ) : (
          <Github className="h-5 w-5" />
        )}
        <span className="font-medium">{props.provider}</span>
      </div>
    </button>
  );
}

export default SignInButton;
