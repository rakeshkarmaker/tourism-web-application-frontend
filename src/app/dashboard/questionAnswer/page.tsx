// "use client"; // Mark this file as a client component

// import { useState } from 'react';

// export default function HomePage() {
//   const [inputText, setInputText] = useState('');
//   const [apiResponse, setApiResponse] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async () => {
//     setLoading(true);
//     setApiResponse(null);

//     try {
//       const response = await fetch('http://localhost:3000/gemini/generate-text', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ promt: inputText }),
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const data = await response.json();
//       setApiResponse(data);
//     } catch (error) {
//       console.error("Could not fetch tour plan:", error);
//       setApiResponse({ error: 'Failed to generate tour plan. Please try again.' });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleInputChange = (event) => {
//     setInputText(event.target.value);
//   };

//   return (
//     <div>
//       <h1>Tour Plan Generator</h1>
//       <div>
//         <input
//           type="text"
//           placeholder="Enter your tour prompt (e.g., Cox's Bazar tour)"
//           value={inputText}
//           onChange={handleInputChange}
//           style={{ width: '500px', padding: '10px', margin: '10px' }}
//         />
//         <button
//           onClick={handleSubmit}
//           disabled={loading}
//           style={{ padding: '10px', margin: '10px', cursor: 'pointer' }}
//         >
//           {loading ? 'Generating...' : 'Generate Tour Plan'}
//         </button>
//       </div>

//       {apiResponse && (
//         <div style={{ marginTop: '20px', border: '1px solid #ccc', padding: '20px', borderRadius: '5px', backgroundColor: '#f9f9f9' }}>
//           <h2>API Response:</h2>
//           <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
//             {JSON.stringify(apiResponse, null, 2)}
//           </pre>
//         </div>
//       )}
//     </div>
//   );
// }



// "use client"; // Mark this file as a client component

// import { useState } from 'react';
// import ReactMarkdown from 'react-markdown';

// export default function HomePage() {
//   const [inputText, setInputText] = useState('');
//   const [apiResponse, setApiResponse] = useState(null);
//   const [loading, setLoading] = useState(false);

//   // Helper function to extract JSON from a Markdown code block
//   const extractAndParseJSON = (data) => {
//     // This regex will match a code block starting with "```json" and ending with "```"
//     const codeBlockRegex = /```json\s*([\s\S]*?)\s*```/;
//     const match = data.text.match(codeBlockRegex);
//     if (match && match[1]) {
//       try {
//         return JSON.parse(match[1]);
//       } catch (error) {
//         console.error("Error parsing JSON:", error);
//         return null;
//       }
//     }
//     return null;
//   };

//   const handleSubmit = async () => {
//     setLoading(true);
//     setApiResponse(null);

//     try {
//       const response = await fetch('http://localhost:3000/gemini/generate-text', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ promt: inputText }),
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const data = await response.json();
//       setApiResponse(data);
//     } catch (error) {
//       console.error("Could not fetch tour plan:", error);
//       setApiResponse({ error: 'Failed to generate tour plan. Please try again.' });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleInputChange = (event) => {
//     setInputText(event.target.value);
//   };

//   // Try to parse the API response if available
//   let parsedData = null;
//   if (apiResponse && apiResponse.text) {
//     parsedData = extractAndParseJSON(apiResponse);
//   }

//   return (
//     <div style={{ padding: '20px' }}>
//       <h1>Tour Plan Generator</h1>
//       <div>
//         <input
//           type="text"
//           placeholder="Enter your tour prompt (e.g., Cox's Bazar tour)"
//           value={inputText}
//           onChange={handleInputChange}
//           style={{ width: '500px', padding: '10px', margin: '10px' }}
//         />
//         <button
//           onClick={handleSubmit}
//           disabled={loading}
//           style={{ padding: '10px', margin: '10px', cursor: 'pointer' }}
//         >
//           {loading ? 'Generating...' : 'Generate Tour Plan'}
//         </button>
//       </div>

//       {apiResponse && (
//         <div
//           style={{
//             marginTop: '20px',
//             border: '1px solid #ccc',
//             padding: '20px',
//             borderRadius: '5px',
//             backgroundColor: '#f9f9f9',
//           }}
//         >
//           {apiResponse.error && <p>{apiResponse.error}</p>}
          
//           {parsedData ? (
//             <div>
//               <h2>{parsedData.title}</h2>
//               <p>{parsedData.description}</p>
//               <p>
//                 <strong>Duration:</strong> {parsedData.duration}
//               </p>

//               <div>
//                 <h3>Tour Plan:</h3>
//                 {/* Renders the Markdown (from tour_plan_text) as HTML */}
//                 <ReactMarkdown>{parsedData.tour_plan_text}</ReactMarkdown>
//               </div>

//               {parsedData.map_links && parsedData.map_links.length > 0 && (
//                 <div>
//                   <h3>Map Links:</h3>
//                   <ul>
//                     {parsedData.map_links.map((link, index) => (
//                       <li key={index}>
//                         <a href={link.map_url} target="_blank" rel="noopener noreferrer">
//                           {link.location_name}
//                         </a>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               )}
//             </div>
//           ) : (
//             // Fallback: display the raw response if parsing fails
//             <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
//               {JSON.stringify(apiResponse, null, 2)}
//             </pre>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }



"use client";

import { useState, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function HomePage() {
  const [inputText, setInputText] = useState("");
  const [apiResponse, setApiResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  // Extract and parse JSON from Markdown response
  const extractAndParseJSON = (data: any) => {
    if (!data?.text) return null;

    const match = data.text.match(/```json\s*([\s\S]*?)\s*```/);
    if (!match || !match[1]) return null;

    try {
      return JSON.parse(match[1]);
    } catch (error) {
      console.error("Error parsing JSON:", error);
      return null;
    }
  };

  // Handle API request
  const handleSubmit = useCallback(async () => {
    if (!inputText.trim()) return;

    setLoading(true);
    setApiResponse(null);

    try {
      const response = await fetch("http://localhost:3000/gemini/generate-text", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: inputText }),
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();
      setApiResponse(data);
    } catch (error) {
      console.error("Could not fetch tour plan:", error);
      setApiResponse({ error: "Failed to generate tour plan. Please try again." });
    } finally {
      setLoading(false);
    }
  }, [inputText]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  // Parse API response
  let parsedData = apiResponse && apiResponse.text ? extractAndParseJSON(apiResponse) : null;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-2xl">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Tour Plan Generator 🏝️
        </h1>

        {/* Input Field & Button */}
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Enter your tour prompt (e.g., Cox's Bazar tour)"
            value={inputText}
            onChange={handleInputChange}
            className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={handleSubmit}
            disabled={!inputText.trim() || loading}
            className={`px-4 py-2 text-white font-semibold rounded-md transition ${
              loading ? "bg-gray-500 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {loading ? "Generating..." : "Generate"}
          </button>
        </div>

        {/* Loading Indicator */}
        {loading && <p className="text-gray-500 mt-2">⏳ Generating tour plan...</p>}

        {/* Response Section */}
        {apiResponse && (
          <div className="mt-6 border rounded-md p-4 bg-gray-50">
            {apiResponse.error ? (
              <p className="text-red-600">{apiResponse.error}</p>
            ) : parsedData ? (
              <div>
                <h2 className="text-xl font-semibold text-gray-800">{parsedData.title}</h2>
                <p className="text-gray-700">{parsedData.description}</p>
                <p className="text-gray-700">
                  <strong>Duration:</strong> {parsedData.duration}
                </p>

                {/* Markdown-rendered tour plan */}
                <div className="mt-4">
                  <h3 className="text-lg font-semibold text-gray-800">Tour Plan:</h3>
                  <ReactMarkdown className="prose" remarkPlugins={[remarkGfm]}>
                    {parsedData.tour_plan_text}
                  </ReactMarkdown>
                </div>

                {/* Map Links */}
                {parsedData.map_links && parsedData.map_links.length > 0 && (
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold text-gray-800">Map Links:</h3>
                    <ul className="list-disc pl-5">
                      {parsedData.map_links.map((link: any, index: number) => (
                        <li key={index}>
                          <a
                            href={link.map_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline"
                          >
                            {link.location_name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <pre className="text-sm text-gray-600 bg-gray-200 p-2 rounded-md">
                {JSON.stringify(apiResponse, null, 2)}
              </pre>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
