export default function UserProfile({ params }: any) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-3xl font-bold text-blue-600">Profile Page</h1>
        <p className="mt-4 text-lg text-gray-700">User ID: {params.id}</p>
      </div>
    );
  }
  
  