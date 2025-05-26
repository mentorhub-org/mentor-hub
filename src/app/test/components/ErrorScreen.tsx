'use client'

interface ErrorScreenProps {
  message?: string
}

const ErrorScreen = ({ message = 'An error occurred' }: ErrorScreenProps) => {
  return (
    <main className="flex flex-col justify-center items-center w-full h-screen bg-gray-100">
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-red-600 mb-2">Error</h2>
        <p className="text-gray-700">{message}</p>
      </div>
    </main>
  )
}

export default ErrorScreen