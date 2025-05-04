export default function LoadingSpinner() {
  return (
    <div className="w-full bg-white rounded-lg shadow-lg p-6 mt-3 mb-3 flex justify-center items-center h-96">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-darkblue"></div>
    </div>
  )
}