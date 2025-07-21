import React, { useEffect } from "react";
import { ReactFlowProvider, useReactFlow } from "reactflow";
import { FlowProvider, useFlow } from "../context/FlowContext";
import FlowEditor from "./FlowEditor";
import OutputPanel from "./OutputPanel";
import { convertVisualBlocksToFlow } from "../utils/flowParser";

const CanvasWithListener = () => {
  const { setNodes, setEdges } = useReactFlow();
  const { setSQLData, setAIFlow, nodes, edges } = useFlow(); // using current state directly

  useEffect(() => {
    const handleAIResult = (e) => {
      const { sql, explanation, suggestions, visualFlow } = e.detail;
      setSQLData({ sql, explanation, suggestions });

        // Don't override if user already has a flow
        if (visualFlow?.blocks?.length) {
  const { nodes: aiNodes, edges: aiEdges } = convertVisualBlocksToFlow(visualFlow.blocks);
  setAIFlow({ nodes: aiNodes, edges: aiEdges }); // Save for optional replace
  if (nodes.length === 0 && edges.length === 0) {
          setNodes(aiNodes);
          setEdges(aiEdges);
        }
}
      
    };

    window.addEventListener("ai-generated", handleAIResult);
    return () => window.removeEventListener("ai-generated", handleAIResult);
  }, [setNodes, setEdges, setSQLData, nodes, edges]);

  return (
    <div className="flex flex-col md:flex-row h-screen w-full">
  <div className="w-full md:w-[65%] h-[50vh] md:h-full">
        <FlowEditor />
      </div>
      <OutputPanel />
    </div>
  );
};

const FlowCanvas = () => {
  return (
    <ReactFlowProvider>
      <FlowProvider>
        <CanvasWithListener />
      </FlowProvider>
    </ReactFlowProvider>
  );
};

export default FlowCanvas;
