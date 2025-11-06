// // "use client";

// // import { useState, useCallback } from "react";
// // import ReactMarkdown from "react-markdown";
// // import remarkGfm from "remark-gfm";
// // import {mapAPI} from '../../../../constant';

// // export default function HomePage() {
// //   const [inputText, setInputText] = useState("");
// //   const [apiResponse, setApiResponse] = useState(null);
// //   const [loading, setLoading] = useState(false);
// //   const YOUR_API_KEY = mapAPI;

// //   const extractAndParseJSON = (data) => {
// //     if (!data?.text) return null;
// //     const match = data.text.match(/```json\s*([\s\S]*?)\s*```/);
// //     if (!match || !match[1]) return null;
// //     try {
// //       return JSON.parse(match[1]);
// //     } catch (error) {
// //       console.error("Error parsing JSON:", error);
// //       return null;
// //     }
// //   };

// //   const handleSubmit = useCallback(async () => {
// //     if (!inputText.trim()) return;
// //     setLoading(true);
// //     setApiResponse(null);

// //     try {
// //       const response = await fetch("http://localhost:3000/gemini/generate-text", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({ prompt: inputText }),
// //       });

// //       const data = await response.json();
// //       setApiResponse(data);
// //     } catch (error) {
// //       console.error("Error fetching tour plan:", error);
// //       setApiResponse({ error: "Failed to generate tour plan. Please try again." });
// //     } finally {
// //       setLoading(false);
// //     }
// //   }, [inputText]);

// //   const handleInputChange = (e) => setInputText(e.target.value);
// //   const parsedData = apiResponse?.text ? extractAndParseJSON(apiResponse) : null;

// //   const renderMapLinks = (links) => {
// //     return links.map((link, index) => (
// //       <iframe
// //         key={index}
// //         src={link.map_url}
// //         className="w-full h-64 mt-4 border rounded"
// //         allowFullScreen
// //         title={`Map ${index + 1}`}
// //       ></iframe>
// //     ));
// //   };

// //   const renderCombinedMap = (links) => {
// //     const allLocations = links.map(link => encodeURIComponent(link.location_name)).join("|");
// //     const combinedMapUrl = `https://www.google.com/maps/embed/v1/place?key=${YOUR_API_KEY}&q=${allLocations}`;
// //     return <iframe src={combinedMapUrl} className="w-full h-96 mt-4 border rounded" allowFullScreen title="Combined Map"></iframe>;
// //   };

// //   return (
// //     <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
// //       <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-2xl">
// //         <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">Tour Plan Generator 🏝️</h1>
// //         <div className="flex gap-2">
// //           <input type="text" value={inputText} onChange={handleInputChange} placeholder="Enter tour prompt" className="flex-1 p-2 border rounded-md" />
// //           <button onClick={handleSubmit} disabled={loading || !inputText.trim()} className="px-4 py-2 bg-blue-500 text-white rounded-md">{loading ? "Generating..." : "Generate"}</button>
// //         </div>
// //         {loading && <p>⏳ Generating tour plan...</p>}
// //         {apiResponse && (
// //           <div className="mt-4 bg-gray-50 p-4 rounded-md">
// //             {apiResponse.error ? (
// //               <p className="text-red-600">{apiResponse.error}</p>
// //             ) : parsedData ? (
// //               <div>
// //                 <h2 className="text-xl font-semibold text-gray-800">{parsedData.title}</h2>
// //                 <p className="text-gray-700">{parsedData.description}</p>
// //                 <p className="text-gray-700"><strong>Duration:</strong> {parsedData.duration}</p>
// //                 <ReactMarkdown className="prose" remarkPlugins={[remarkGfm]}>{parsedData.tour_plan_text}</ReactMarkdown>
// //                 {parsedData.map_links && renderMapLinks(parsedData.map_links)}
// //                 {parsedData.map_links && parsedData.map_links.length > 1 && (
// //                   <div className="mt-6">
// //                     <h3 className="text-lg font-semibold text-gray-800">Combined Map:</h3>
// //                     {renderCombinedMap(parsedData.map_links)}
// //                   </div>
// //                 )}
// //               </div>
// //             ) : (
// //               <pre>{JSON.stringify(apiResponse, null, 2)}</pre>
// //             )}
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// "use client";

// import { useState, useCallback } from "react";
// import ReactMarkdown from "react-markdown";
// import remarkGfm from "remark-gfm";
// import { mapAPI } from "../../../../constant";

// export default function HomePage() {
//   const [inputText, setInputText] = useState<any>("");
//   const [apiResponse, setApiResponse] = useState<any>(null);
//   const [loading, setLoading] = useState<any>(false);
//   // const YOUR_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY; // Use env variable
//   const YOUR_API_KEY = mapAPI;

//   const extractAndParseJSON = (data:any) => {
//     if (!data?.text) return null;
//     const match = data.text.match(/```json\s*([\s\S]*?)\s*```/);
//     if (!match || !match[1]) return null;
//     try {
//       return JSON.parse(match[1]);
//     } catch (error) {
//       console.error("Error parsing JSON:", error);
//       return null;
//     }
//   };

//   const handleSubmit = useCallback(async () => {
//     if (!inputText.trim()) return;
//     setLoading(true);
//     setApiResponse(null);

//     try {
//       const response = await fetch("http://localhost:3000/gemini/generate-text", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ prompt: inputText }),
//       });

//       const data = await response.json();
//       console.log("API Response:", data); // Debugging
//       setApiResponse(data);
//     } catch (error) {
//       console.error("Error fetching tour plan:", error);
//       setApiResponse({ error: "Failed to generate tour plan. Please try again." });
//     } finally {
//       setLoading(false);
//     }
//   }, [inputText]);

//   const handleInputChange = (e:any) => setInputText(e.target.value);
//   const parsedData = apiResponse?.text ? extractAndParseJSON(apiResponse) : null;

//   // --- Updated Individual Map Render ---
//   // Uses location_name to build a proper embed URL
//   const renderMapLinks = (links:any) => {
//     if (!Array.isArray(links) || links.length === 0) return null;
//     return links.map((link, index) => {
//       if (!link.location_name) return null; // Skip invalid names

//       const locationEncoded = encodeURIComponent(link.location_name);
//       const embedUrl = `https://www.google.com/maps/embed/v1/place?key=${YOUR_API_KEY}&q=${locationEncoded}`;

//       return (
//         <iframe
//           key={index}
//           src={embedUrl}
//           className="w-full h-64 mt-4 border rounded"
//           allowFullScreen
//           loading="lazy"
//           title={`Map ${index + 1}: ${link.location_name}`}
//         />
//       );
//     });
//   };

//   // --- Updated Combined Map Render ---
//   // Uses Directions embed mode when there are multiple locations
//   const renderCombinedMap = (links:any) => {
//     if (!Array.isArray(links) || links.length === 0) return null;

//     // Filter out any invalid or missing location names
//     const validLinks = links.filter((link) => link.location_name);
//     if (validLinks.length === 0) return null;

//     // If only one location, fall back to a single place map
//     if (validLinks.length === 1) {
//       const singleLocation = encodeURIComponent(validLinks[0].location_name);
//       const singleMapUrl = `https://www.google.com/maps/embed/v1/place?key=${YOUR_API_KEY}&q=${singleLocation}`;
//       return (
//         <iframe
//           src={singleMapUrl}
//           className="w-full h-96 mt-4 border rounded"
//           allowFullScreen
//           loading="lazy"
//           title={`Combined Map (Single): ${validLinks[0].location_name}`}
//         />
//       );
//     }

//     // For multiple locations, use Directions mode
//     const origin = encodeURIComponent(validLinks[0].location_name);
//     const destination = encodeURIComponent(validLinks[validLinks.length - 1].location_name);
//     const waypoints = validLinks
//       .slice(1, -1)
//       .map((link) => encodeURIComponent(link.location_name))
//       .join("|");

//     let combinedMapUrl = `https://www.google.com/maps/embed/v1/directions?key=${YOUR_API_KEY}&origin=${origin}&destination=${destination}`;
//     if (waypoints) {
//       combinedMapUrl += `&waypoints=${waypoints}`;
//     }

//     return (
//       <iframe
//         src={combinedMapUrl}
//         className="w-full h-96 mt-4 border rounded"
//         allowFullScreen
//         loading="lazy"
//         title="Combined Map (Multiple Locations)"
//       />
//     );
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
//       <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-2xl">
//         <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">Tour Plan Generator 🏝️</h1>
//         <div className="flex gap-2">
//           <input
//             type="text"
//             value={inputText}
//             onChange={handleInputChange}
//             placeholder="Enter tour prompt"
//             className="flex-1 p-2 border rounded-md"
//             disabled={loading}
//           />
//           <button
//             onClick={handleSubmit}
//             disabled={loading || !inputText.trim()}
//             className="px-4 py-2 bg-blue-500 text-white rounded-md"
//           >
//             {loading ? "Generating..." : "Generate"}
//           </button>
//         </div>

//         {loading && <p>⏳ Generating tour plan...</p>}

//         {apiResponse && (
//           <div className="mt-4 bg-gray-50 p-4 rounded-md">
//             {apiResponse.error ? (
//               <p className="text-red-600">{apiResponse.error}</p>
//             ) : parsedData ? (
//               <div>
//                 <h2 className="text-xl font-semibold text-gray-800">{parsedData.title}</h2>
//                 <p className="text-gray-700">{parsedData.description}</p>
//                 <p className="text-gray-700">
//                   <strong>Duration:</strong> {parsedData.duration}
//                 </p>
//                 <ReactMarkdown className="prose" remarkPlugins={[remarkGfm]}>
//                   {parsedData.tour_plan_text}
//                 </ReactMarkdown>
//                 {renderMapLinks(parsedData.map_links)}
//                 {parsedData.map_links && parsedData.map_links.length > 1 && (
//                   <div className="mt-6">
//                     <h3 className="text-lg font-semibold text-gray-800">Combined Map:</h3>
//                     {renderCombinedMap(parsedData.map_links)}
//                   </div>
//                 )}
//               </div>
//             ) : (
//               <pre>{JSON.stringify(apiResponse, null, 2)}</pre>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


"use client";

import { useState, useCallback, ChangeEvent } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const mapAPI = process.env.NEXT_PUBLIC_GOOGLE_MAP;

// Types
type MapLink = {
  location_name: string;
};

type ParsedData = {
  title: string;
  description: string;
  duration: string;
  tour_plan_text: string;
  map_links: MapLink[];
};

type ApiResponse = {
  text?: string;
  error?: string;
};

export default function HomePage() {
  const [inputText, setInputText] = useState<string>("");
  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);


  const extractAndParseJSON = (data: ApiResponse): ParsedData | null => {
    if (!data?.text) return null;

    const match = data.text.match(/```json\s*([\s\S]*?)\s*```/);
    if (!match || !match[1]) return null;

    try {
      return JSON.parse(match[1]) as ParsedData;
    } catch (error) {
      console.error("Error parsing JSON:", error);
      return null;
    }
  };

  const handleSubmit = useCallback(async () => {
    if (!inputText.trim()) return;
    setLoading(true);
    setApiResponse(null);

    try {
      const response = await fetch(`${apiUrl}gemini/generate-text`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: inputText }),
      });

      const data: ApiResponse = await response.json();
      console.log("API Response:", data);
      setApiResponse(data);
    } catch (error) {
      console.error("Error fetching tour plan:", error);
      setApiResponse({ error: "Failed to generate tour plan. Please try again." });
    } finally {
      setLoading(false);
    }
  }, [inputText]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => setInputText(e.target.value);
  const parsedData = apiResponse ? extractAndParseJSON(apiResponse) : null;

  const renderMapLinks = (links: MapLink[] | undefined) => {
    if (!links || links.length === 0) return null;

    return links.map((link, index) => {
      if (!link.location_name) return null;

      const locationEncoded = encodeURIComponent(link.location_name);
      const embedUrl = `https://www.google.com/maps/embed/v1/place?key=${mapAPI}&q=${locationEncoded}`;

      return (
        <iframe
          key={index}
          src={embedUrl}
          className="w-full h-64 mt-4 border rounded"
          allowFullScreen
          loading="lazy"
          title={`Map ${index + 1}: ${link.location_name}`}
        />
      );
    });
  };

  const renderCombinedMap = (links: MapLink[] | undefined) => {
    if (!links || links.length === 0) return null;

    const validLinks = links.filter((link) => link.location_name);
    if (validLinks.length === 0) return null;

    if (validLinks.length === 1) {
      const singleLocation = encodeURIComponent(validLinks[0].location_name);
      const singleMapUrl = `https://www.google.com/maps/embed/v1/place?key=${mapAPI}&q=${singleLocation}`;
      return (
        <iframe
          src={singleMapUrl}
          className="w-full h-96 mt-4 border rounded"
          allowFullScreen
          loading="lazy"
          title={`Combined Map (Single): ${validLinks[0].location_name}`}
        />
      );
    }

    const origin = encodeURIComponent(validLinks[0].location_name);
    const destination = encodeURIComponent(validLinks[validLinks.length - 1].location_name);
    const waypoints = validLinks.slice(1, -1).map((link) => encodeURIComponent(link.location_name)).join("|");

    let combinedMapUrl = `https://www.google.com/maps/embed/v1/directions?key=${mapAPI}&origin=${origin}&destination=${destination}`;
    if (waypoints) combinedMapUrl += `&waypoints=${waypoints}`;

    return (
      <iframe
        src={combinedMapUrl}
        className="w-full h-96 mt-4 border rounded"
        allowFullScreen
        loading="lazy"
        title="Combined Map (Multiple Locations)"
      />
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-2xl">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">Tour Plan Generator 🏝️</h1>
        <div className="flex gap-2">
          <input
            type="text"
            value={inputText}
            onChange={handleInputChange}
            placeholder="Enter tour prompt"
            className="flex-1 p-2 border rounded-md"
            disabled={loading}
          />
          <button
            onClick={handleSubmit}
            disabled={loading || !inputText.trim()}
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            {loading ? "Generating..." : "Generate"}
          </button>
        </div>

        {loading && <p>⏳ Generating tour plan...</p>}

        {apiResponse && (
          <div className="mt-4 bg-gray-50 p-4 rounded-md">
            {apiResponse.error ? (
              <p className="text-red-600">{apiResponse.error}</p>
            ) : parsedData ? (
              <div>
                <h2 className="text-xl font-semibold text-gray-800">{parsedData.title}</h2>
                <p className="text-gray-700">{parsedData.description}</p>
                <p className="text-gray-700">
                  <strong>Duration:</strong> {parsedData.duration}
                </p>
                <ReactMarkdown className="prose" remarkPlugins={[remarkGfm]}>
                  {parsedData.tour_plan_text}
                </ReactMarkdown>
                {renderMapLinks(parsedData.map_links)}
                {parsedData.map_links && parsedData.map_links.length > 1 && (
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold text-gray-800">Combined Map:</h3>
                    {renderCombinedMap(parsedData.map_links)}
                  </div>
                )}
              </div>
            ) : (
              <pre>{JSON.stringify(apiResponse, null, 2)}</pre>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
