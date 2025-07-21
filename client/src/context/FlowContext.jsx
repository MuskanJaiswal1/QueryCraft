import React, { createContext, useState, useContext, useRef } from "react";

export const FlowContext = createContext();

export const FlowProvider = ({ children }) => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [sqlData, setSQLData] = useState({
    sql: "",
    explanation: "",
    suggestions: "",
  });
  const [uiState, setUIState] = useState({
    showExplanation: false,
    showSuggestions: false,
  });
  const [contextMenu, setContextMenu] = useState(null);
  const [aiFlow, setAIFlow] = useState({ nodes: [], edges: [] });
  const idRef = useRef(0);

  const incrementId = () => `node_${idRef.current++}`;

  return (
    <FlowContext.Provider
      value={{
        nodes,
        setNodes,
        edges,
        setEdges,
        sqlData,
        setSQLData,
        uiState,
        setUIState,
        contextMenu,
        setContextMenu,
        incrementId,
        aiFlow,
        setAIFlow
      }}
    >
      {children}
    </FlowContext.Provider>
  );
};

export const useFlow = () => useContext(FlowContext);
