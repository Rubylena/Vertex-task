import Link from "next/link";

export default async function NotFound() {
  return (
    <div className="grid min-h-screen place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-lg font-semibold text-tbBlue">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Page not found
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6 mx-auto max-w-40">
          <Link href="/">
            <button
              className="flex items-center justify-center gap-2 w-full rounded-md bg-black p-2 text-sm font-semibold text-white shadow-sm hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {/* <ArrowLeftIcon className="w-5 h-5" /> */}
              Go back
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
