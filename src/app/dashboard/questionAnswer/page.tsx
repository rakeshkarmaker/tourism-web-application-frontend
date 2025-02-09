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



"use client"; // Mark this file as a client component

import { useState } from 'react';
import ReactMarkdown from 'react-markdown';

export default function HomePage() {
  const [inputText, setInputText] = useState('');
  const [apiResponse, setApiResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  // Helper function to extract JSON from a Markdown code block
  const extractAndParseJSON = (data) => {
    // This regex will match a code block starting with "```json" and ending with "```"
    const codeBlockRegex = /```json\s*([\s\S]*?)\s*```/;
    const match = data.text.match(codeBlockRegex);
    if (match && match[1]) {
      try {
        return JSON.parse(match[1]);
      } catch (error) {
        console.error("Error parsing JSON:", error);
        return null;
      }
    }
    return null;
  };

  const handleSubmit = async () => {
    setLoading(true);
    setApiResponse(null);

    try {
      const response = await fetch('http://localhost:3000/gemini/generate-text', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ promt: inputText }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setApiResponse(data);
    } catch (error) {
      console.error("Could not fetch tour plan:", error);
      setApiResponse({ error: 'Failed to generate tour plan. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  // Try to parse the API response if available
  let parsedData = null;
  if (apiResponse && apiResponse.text) {
    parsedData = extractAndParseJSON(apiResponse);
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Tour Plan Generator</h1>
      <div>
        <input
          type="text"
          placeholder="Enter your tour prompt (e.g., Cox's Bazar tour)"
          value={inputText}
          onChange={handleInputChange}
          style={{ width: '500px', padding: '10px', margin: '10px' }}
        />
        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{ padding: '10px', margin: '10px', cursor: 'pointer' }}
        >
          {loading ? 'Generating...' : 'Generate Tour Plan'}
        </button>
      </div>

      {apiResponse && (
        <div
          style={{
            marginTop: '20px',
            border: '1px solid #ccc',
            padding: '20px',
            borderRadius: '5px',
            backgroundColor: '#f9f9f9',
          }}
        >
          {apiResponse.error && <p>{apiResponse.error}</p>}
          
          {parsedData ? (
            <div>
              <h2>{parsedData.title}</h2>
              <p>{parsedData.description}</p>
              <p>
                <strong>Duration:</strong> {parsedData.duration}
              </p>

              <div>
                <h3>Tour Plan:</h3>
                {/* Renders the Markdown (from tour_plan_text) as HTML */}
                <ReactMarkdown>{parsedData.tour_plan_text}</ReactMarkdown>
              </div>

              {parsedData.map_links && parsedData.map_links.length > 0 && (
                <div>
                  <h3>Map Links:</h3>
                  <ul>
                    {parsedData.map_links.map((link, index) => (
                      <li key={index}>
                        <a href={link.map_url} target="_blank" rel="noopener noreferrer">
                          {link.location_name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            // Fallback: display the raw response if parsing fails
            <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
              {JSON.stringify(apiResponse, null, 2)}
            </pre>
          )}
        </div>
      )}
    </div>
  );
}
