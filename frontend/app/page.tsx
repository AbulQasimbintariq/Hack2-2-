import Link from 'next/link'

export default function Home() {
  return (
    <main className= "flex min-h-screen flex-col items-center justify-center p-24" >
    <h1 className="text-4xl font-bold mb-8" > Task App </h1>
      < div className = "space-y-4" >
        <Link href="/login" className = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded block text-center" >
          Login
          </Link>
          < Link href = "/signup" className = "bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded block text-center" >
            Sign Up
              </Link>
              < Link href = "/tasks" className = "bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded block text-center" >
                Tasks(login first)
                </Link>
                </div>
                </main>
  )
}
