"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex size-full flex-col items-center justify-center gap-6 bg-primary-600">
      <h1 className="text-3xl font-semibold">Something went wrong!</h1>
      <p className="text-lg">{error.message}</p>

      <button
        className="text-primary-800 inline-block bg-accent-500 px-6 py-3 text-lg"
        onClick={reset}
      >
        Try again
      </button>
    </div>
  );
}
