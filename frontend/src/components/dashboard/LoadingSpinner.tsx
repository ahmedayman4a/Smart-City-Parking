export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center h-32">
      <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500 border-solid"></div>
      <span className="ml-4 text-gray-700">Loading...</span>
    </div>
  );
}
