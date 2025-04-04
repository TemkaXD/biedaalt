import { useRouter } from "next/router";

export default function Index() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-black flex items-center justify-center py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl w-full px-4">
        <button onClick={() =>{router.push("mongolia")}} className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4 text-center text-black">API</h2>
          <div className="bg-gray-200 w-full h-40 flex items-center justify-center rounded-lg">
            <img src="/cv.jpeg" alt="index.js"/>
          </div>
        </button>

        <button onClick={() =>{router.push("weather")}} className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4 text-center text-black">WEATHER</h2>
          <div className="bg-gray-200 w-full h-40 flex items-center justify-center rounded-lg">
            <img src="/SEARCH.jpeg" alt="Weather.js"/>
          </div>
        </button>

        
        <button onClick={() =>{router.push("grid")}} className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4 text-center text-black">GRID</h2>
          <div className="bg-gray-200 w-full h-40 flex items-center justify-center rounded-lg">
            <img src="grid.jpeg" alt="grid"/>
          </div>
        </button>

      </div>
    </div>
  );
}