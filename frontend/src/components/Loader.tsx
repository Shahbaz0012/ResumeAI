interface LoaderProps {
  text?: string;
}

export default function Loader({
  text = "Loading...",
}: LoaderProps) {
  return (
    <div className="flex min-h-[300px] flex-col items-center justify-center">

      <div className="h-16 w-16 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>

      <p className="mt-6 text-lg text-gray-300">
        {text}
      </p>

    </div>
  );
}