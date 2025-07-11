import React, { useState } from "react";

const AISQLResult = ({ sql, explanation, suggestions }) => {
  const [showExplanation, setShowExplanation] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  return (
    <div className="mt-6 border border-gray-300 rounded-md p-4 bg-white shadow-sm">
      <h2 className="text-lg font-semibold text-green-700 mb-2">📝 AI-Generated SQL</h2>
      <pre className="bg-gray-100 p-3 rounded text-sm whitespace-pre-wrap">{sql}</pre>

      {explanation && (
        <div className="mt-3">
          <button
            onClick={() => setShowExplanation((prev) => !prev)}
            className="text-blue-600 underline text-sm"
          >
            {showExplanation ? "Hide Explanation" : "Show Explanation"}
          </button>
          {showExplanation && (
            <div className="mt-2 bg-blue-50 border border-blue-300 rounded p-3 text-sm text-gray-800 whitespace-pre-wrap">
              <strong>💡 Explanation:</strong>
              <pre className="mt-1">{explanation}</pre>
            </div>
          )}
        </div>
      )}

      {suggestions && (
        <div className="mt-3">
          <button
            onClick={() => setShowSuggestions((prev) => !prev)}
            className="text-purple-600 underline text-sm"
          >
            {showSuggestions ? "Hide AI Suggestions" : "Show AI Suggestions"}
          </button>
          {showSuggestions && (
            <div className="mt-2 bg-purple-50 border border-purple-300 rounded p-3 text-sm text-gray-800 whitespace-pre-wrap">
              <strong>🔧 Suggestions:</strong>
              <pre className="mt-1">{suggestions}</pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AISQLResult;
