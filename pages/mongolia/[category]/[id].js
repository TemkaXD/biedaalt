import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function ID() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!router.isReady) return; // Router ачаалж дуусахыг хүлээнэ

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://mongol-api-rest.vercel.app/clothes");
        const result = await response.json();
        setData(result.clothes);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router.isReady]); // Router ачаалагдсаны дараа ажиллана

  const selectedItem = data.length > 0 ? data.find((item) => String(item.id) === String(router.query.id)) : null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <button
        className="mb-4 px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
        onClick={() => router.back()}
      >
        Back
      </button>

      {loading ? (
        <p className="text-gray-600">Loading...</p>
      ) : selectedItem ? (
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center">
          <img src={selectedItem.images} alt={selectedItem.name} className="w-40 mx-auto mb-4 rounded-lg" />
          <h2 className="text-xl font-semibold text-gray-800">{selectedItem.name}</h2>
          <p className="text-gray-600 mt-2">{selectedItem.description}</p>
        </div>
      ) : (
        <p className="text-red-500 font-semibold">{router.query.id} ID-тай хувцас олдсонгүй!</p>
      )}
    </div>
  );
}

