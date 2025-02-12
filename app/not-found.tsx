import Link from "next/link";

function NotFound() {
  return (
    <main className="flex size-full flex-col items-center justify-center gap-6 bg-main_bkg">
      <h1 className="text-2xl font-semibold">
        This page could not be found :(
      </h1>
      <Link
        href="/"
        className="text-primary-800 inline-block bg-accent-500 px-6 py-3 text-lg"
      >
        Go back home
      </Link>
    </main>
  );
}

export default NotFound;
