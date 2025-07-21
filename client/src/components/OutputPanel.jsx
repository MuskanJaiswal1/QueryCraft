import React, { useState, useEffect } from "react";
import { useFlow } from "../context/FlowContext";
import { toast } from "react-hot-toast";
import { askAIFromCurrentInput } from "../utils/aiUtils";

const OutputPanel = () => {
  const { sqlData, setSQLData, aiFlow, setNodes, setEdges } = useFlow();

  const [localSQL, setLocalSQL] = useState(sqlData.sql || "");
  const [localExplanation, setLocalExplanation] = useState(
    sqlData.explanation || ""
  );
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [aiGeneratedSQL, setAIGeneratedSQL] = useState(false);
  const [aiGeneratedExplanation, setAIGeneratedExplanation] = useState(false);

  // Sync with global state when sqlData updates
  useEffect(() => {
    setLocalSQL(sqlData.sql || "");
    setLocalExplanation(sqlData.explanation || "");
  }, [sqlData]);

  const handleAskAI = async () => {
    const nodes = window.currentNodes || [];
    const edges = window.currentEdges || [];
    const hasFlow = nodes.length > 0 && edges.length > 0;

    if (!localSQL && !localExplanation && !hasFlow) {
      return toast.error(
        "Please enter either SQL, Explanation, or create a flow."
      );
    }

    const userSQL = localSQL.trim();
    const userExplanation = localExplanation.trim();

    // Save user input to context (before asking AI)
    setSQLData((prev) => ({
      ...prev,
      sql: userSQL,
      explanation: userExplanation,
    }));

    const result = await askAIFromCurrentInput(userSQL, userExplanation);
    if (result?.error) return;

    // Determine what was filled by AI
    const sqlFromAI = !userSQL && !!result.sql;
    const explanationFromAI = !userExplanation && !!result.explanation;

    setAIGeneratedSQL(sqlFromAI);
    setAIGeneratedExplanation(explanationFromAI);

    const updatedSQL = userSQL || result.sql;
    const updatedExplanation = userExplanation || result.explanation;

    // Update context and local state
    setSQLData({
      sql: updatedSQL,
      explanation: updatedExplanation,
      suggestions: result.suggestions || "",
    });

    setLocalSQL(updatedSQL);
    setLocalExplanation(updatedExplanation);
  };

  return (
    <div className="w-full md:w-[35%] p-4 border-t md:border-t-0 md:border-l border-gray-300 bg-white space-y-4 overflow-y-auto max-h-screen">
      <div className="flex flex-col sm:flex-row gap-2">
        <button
          onClick={handleAskAI}
          className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-800 transition"
        >
          Ask AI
        </button>
        {aiFlow?.nodes?.length > 0 && (
          <button
            onClick={() => {
              setNodes(aiFlow.nodes);
              setEdges(aiFlow.edges);
              toast.success("Replaced with AI flow");
            }}
            className="ml-2 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition"
          >
            Replace with AI Flow
          </button>
        )}
      </div>

      {/* SQL Field */}
      <div>
        <label className="block font-medium text-gray-700 mb-1">
          SQL Query
        </label>
        <button
          onClick={() => {
            navigator.clipboard.writeText(localSQL);
            toast.success("SQL copied to clipboard!");
          }}
          className="text-xs bg-blue-100 text-blue-700 px-2 py-1 mb-2 rounded hover:bg-blue-200 transition"
        >
          Copy
        </button>
        <div className="relative">
          <textarea
            value={localSQL}
            onChange={(e) => {
              setLocalSQL(e.target.value);
              setAIGeneratedSQL(false);
            }}
            placeholder="Type or view SQL here..."
            className={`w-full p-2 border rounded font-mono text-sm h-32 resize-y ${
              aiGeneratedSQL ? "bg-yellow-50 border-yellow-300" : ""
            }`}
          />
        </div>
      </div>

      {/* Explanation Field */}
      <div>
        <label className="block font-medium text-gray-700 mb-1">
          Explanation
        </label>
        <textarea
          value={localExplanation}
          onChange={(e) => {
            setLocalExplanation(e.target.value);
            setAIGeneratedExplanation(false);
          }}
          placeholder="Type or view explanation here..."
          className={`w-full p-2 border rounded text-sm h-32 resize-y ${
            aiGeneratedExplanation ? "bg-yellow-50 border-yellow-300" : ""
          }`}
        />
      </div>

      {/* Suggestions */}
      {sqlData.suggestions && (
        <div className="pt-4 border-t border-gray-200">
          <button
            onClick={() => setShowSuggestions((prev) => !prev)}
            className="text-sm text-blue-600 underline"
          >
            {showSuggestions ? "Hide AI Suggestions" : "Show AI Suggestions"}
          </button>

          {showSuggestions && (
            <div className="mt-2">
              <h3 className="font-medium text-gray-700 mb-1">AI Suggestions</h3>
              <p className="text-sm text-gray-800 whitespace-pre-wrap">
                {sqlData.suggestions}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default OutputPanel;
