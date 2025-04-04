import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Mongolapi() {
    const router = useRouter();
    const [data, setData] = useState([]);
    const [search, setSearch] = useState("");
    const [isGridView, setIsGridView] = useState(true);

    

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                const endpoints = [
                    "clothes",
                    "instruments",
                    "HistoricalTools",
                    "EthnicGroups",
                    "Provinces",
                    "HistoricalFigures",
                    "TouristAttractions"
                ];

                const requests = endpoints.map(endpoint =>
                    fetch(`https://mongol-api-rest.vercel.app/${endpoint}`).then(res => res.json())
                );

                const results = await Promise.all(requests);
                const mergedData = results.flatMap(result => {
                    const key = Object.keys(result)[0];
                    return result[key] || [];
                });

                setData(mergedData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchAllData();
    }, []);

    const filteredData = data.filter(item =>
        item?.name?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-black p-5  flex flex-col items-center">
            <div className="mb-8 flex items-center justify-between w-full">
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search..."
                    className="flex-grow mb-4 p-2 rounded border shadow-lg focus:outline-none focus:ring-2 focus:ring-red-200 text-white"
                />
                <button
                    onClick={() => setIsGridView()}
                    className="ml-4 flex items-center px-5 py-3 bg-white text-black font-medium rounded-lg shadow-md hover:bg-blue-100 transition-transform transform hover:scale-105"
                >
                    {isGridView ? "List View" : "Grid View"}
                </button>
            </div>

            {filteredData.length > 0 ? (
                isGridView ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 m-4">
                        {filteredData.map((item) => (
                            <button key={item.id}
                            onClick={() => router.push('/mongolia/${item.category}/${item.id}')} className="border-2 text-black bg-white shadow rounded-lg p-4 text-center">
                                <img
                                    src={item?.images?.[0] || "https://via.placeholder.com/150"}
                                    alt={item.name || "Image"}
                                    className="w-full h-64 rounded-xl object-cover"
                                />
                                <p className="font-bold mt-2">{item.name}</p>
                                <p>{item.description}</p>
                                <p className="font-bold">{item.timePeriod}</p>
                                <p className="font-bold">{item?.materials}</p>
                            </button>
                        ))}
                    </div>
                ) : (
                    <div className="space-y-4 m-4 w-full">
                        {filteredData.map((item) => (
                            <div key={item.id} className="flex flex-col sm:flex-row items-start border-2 text-black bg-white shadow rounded-lg p-4">
                                <img
                                    src={item?.images?.[0] || "https://via.placeholder.com/150"}
                                    alt={item.name || "Image"}
                                    className="w-32 h-32 rounded-xl object-cover mb-4 sm:mb-0 sm:mr-4"
                                />
                                <div>
                                    <p className="font-bold">{item.name}</p>
                                    <p>{item.description}</p>
                                    <p className="font-bold">{item.timePeriod}</p>
                                    <p className="font-bold">{item?.materials}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )
            ) : (
                <p className="text-center text-white font-bold mt-10">No items found</p>
            )}
        </div>
    );
}
