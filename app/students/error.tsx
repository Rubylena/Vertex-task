"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body className="flex items-center flex-col gap-2 justify-center max-h-screen bg-black text-white rounded p-5">
        <h2>Something went wrong! {error.message} in the students page.</h2>
        <button onClick={() => reset()}>Try again</button>
      </body>
    </html>
  );
}
