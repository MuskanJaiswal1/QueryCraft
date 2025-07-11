import React, { useCallback, useRef, useState } from "react";
import {
  ReactFlow,
  ReactFlowProvider,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  Controls,
  Background,
  MiniMap,
  MarkerType,
  useReactFlow,
} from "reactflow";
import ContextMenu from "./ContextMenu";
import { toast } from "react-hot-toast";
import { nodeTypes } from "../utils/nodeTypes";
import { nodeRegistry } from "../nodes/nodeRegistry";
import AISQLResult from "./AISQLResult";

const FlowCanvasInner = () => {
  const { project, getNode } = useReactFlow();
  const reactFlowWrapper = useRef(null);
  const id = useRef(0);
  const { screenToFlowPosition } = useReactFlow();

  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [contextMenu, setContextMenu] = useState(null);
  const [generatedSQL, setGeneratedSQL] = useState("");
  const [generatedExplanation, setGeneratedExplanation] = useState("");
  const [generatedSuggestions, setGeneratedSuggestions] = useState("");

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const data = event.dataTransfer.getData("application/reactflow");
      if (!data) return;

      const block = JSON.parse(data);
      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const idStr = `node_${id.current++}`;
      const newNode = {
        id: idStr,
        type: block.type,
        position,
        data: {
          ...block,
          onChange: (updatedFields) => {
            setNodes((nds) =>
              nds.map((n) =>
                n.id === idStr
                  ? { ...n, data: { ...n.data, ...updatedFields } }
                  : n
              )
            );
          },
        },
        sourcePosition: "bottom",
        targetPosition: "top",
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [project]
  );

  const onConnect = useCallback(
    (params) => {
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            animated: true,
            style: { stroke: "#4ade80", strokeWidth: 4 },
            markerEnd: { type: MarkerType.ArrowClosed, color: "#4ade80" },
            selectable: true,
          },
          eds
        )
      );
    },
    [getNode]
  );

  const onNodeContextMenu = useCallback((event, node) => {
    event.preventDefault();
    setContextMenu({
      x: event.clientX,
      y: event.clientY,
      nodeId: node.id,
    });
  }, []);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const topologicalSort = (nodes, edges) => {
    const adjList = new Map();
    const inDegree = new Map();

    nodes.forEach((node) => {
      adjList.set(node.id, []);
      inDegree.set(node.id, 0);
    });

    edges.forEach((edge) => {
      adjList.get(edge.source).push(edge.target);
      inDegree.set(edge.target, (inDegree.get(edge.target) || 0) + 1);
    });

    const queue = [];
    inDegree.forEach((deg, nodeId) => {
      if (deg === 0) queue.push(nodeId);
    });

    const sorted = [];
    while (queue.length) {
      const current = queue.shift();
      const currentNode = nodes.find((n) => n.id === current);
      if (currentNode) sorted.push(currentNode);

      adjList.get(current).forEach((neighbor) => {
        inDegree.set(neighbor, inDegree.get(neighbor) - 1);
        if (inDegree.get(neighbor) === 0) queue.push(neighbor);
      });
    }

    return sorted;
  };

  const generatePromptFromFlow = (nodes, edges) => {
    const sortedNodes = topologicalSort(nodes, edges);
    if (!sortedNodes.length) return null;

    const parts = sortedNodes.map((node) => {
      const getPrompt = nodeRegistry[node.type]?.getPrompt;
      return getPrompt ? getPrompt(node.data) : "";
    });

    return parts.filter(Boolean).join(", then ");
  };

  return (
    <div
      className="flex flex-col h-screen w-full"
      ref={reactFlowWrapper}
      onDrop={onDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      {/* Top: Button */}
      <div className="p-4">
        <button
          className="bg-teal-600 text-white px-3 py-1 rounded"
          onClick={async () => {
            const prompt = generatePromptFromFlow(nodes, edges);
            if (!prompt) return toast.error("Invalid query flow.");
            toast.loading("Asking AI to generate SQL...");
            try {
              const res = await fetch("http://localhost:4000/generate-sql", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prompt }),
              });

              const data = await res.json();
              toast.dismiss();
              if (data.sql) {
                setGeneratedSQL(data.sql);
                setGeneratedExplanation(data.explanation || "");
                setGeneratedSuggestions(data.suggestions || "");
                toast.success("SQL generated! See below.");
              } else {
                toast.error("No SQL returned.");
              }
            } catch (err) {
              toast.dismiss();
              toast.error("Failed to get SQL from AI.");
              console.error(err);
            }
          }}
        >
          Ask AI to Generate SQL
        </button>
      </div>

      {/* Middle: Canvas */}
      <div className="flex-1 relative">
        <ReactFlow
          nodeTypes={nodeTypes}
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeContextMenu={onNodeContextMenu}
          selectNodesOnDrag
          deleteKeyCode={["Backspace", "Delete"]}
          multiSelectionKeyCode={["Meta", "Control"]}
          onNodesDelete={(d) => toast.success(`${d.length} node(s) deleted`)}
          onEdgesDelete={(d) => toast.success(`${d.length} edge(s) deleted`)}
          fitView
        >
          {contextMenu && (
            <ContextMenu
              position={contextMenu}
              onClose={() => setContextMenu(null)}
            />
          )}
          <Background gap={16} size={1.5} color="#aaa" />
          <Controls />
          <MiniMap
            nodeColor={() => "#10b981"}
            nodeStrokeWidth={2}
            position="bottom-right"
          />
        </ReactFlow>
      </div>

      {/* Bottom: SQL Output */}
      {generatedSQL && (
        <div className="max-h-[30vh] overflow-y-auto border-t border-gray-300 p-4 bg-white shadow-md">
          <AISQLResult
            sql={generatedSQL}
            explanation={generatedExplanation}
            suggestions={generatedSuggestions}
          />
        </div>
      )}
    </div>
  );
};

const FlowCanvas = () => (
  <ReactFlowProvider>
    <FlowCanvasInner />
  </ReactFlowProvider>
);

export default FlowCanvas;
