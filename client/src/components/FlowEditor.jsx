import React, { useCallback, useRef, useEffect } from "react";
import {
  ReactFlow,
  Controls,
  Background,
  MiniMap,
  MarkerType,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  useReactFlow,
} from "reactflow";
import { useFlow } from "../context/FlowContext";
import { nodeTypes } from "../utils/nodeTypes";
import ContextMenu from "./NodeContextMenu";
import { toast } from "react-hot-toast";

const FlowEditor = () => {
  const reactFlowWrapper = useRef(null);
  const { screenToFlowPosition } = useReactFlow();

  const {
    nodes,
    setNodes,
    edges,
    setEdges,
    contextMenu,
    setContextMenu,
    idCounter,
    incrementId,
  } = useFlow();

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

      const newId = incrementId();

      const newNode = {
        id: newId,
        type: block.type,
        position,
        data: {
          ...block,
          onChange: (updatedFields) => {
            setNodes((nds) =>
              nds.map((n) =>
                n.id === newId
                  ? { ...n, data: { ...n.data, ...updatedFields } }
                  : n
              )
            );
          },
        },
        sourcePosition: "bottom",
        targetPosition: "top",
      };

      setNodes((nds) => [...nds, newNode]);
    },
    [screenToFlowPosition, idCounter, incrementId, setNodes]
  );

  const onConnect = useCallback(
    (params) => {
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            animated: true,
            style: { stroke: "#4ade80", strokeWidth: 2.5 },
            markerEnd: { type: MarkerType.ArrowClosed, color: "#4ade80" },
            selectable: true,
          },
          eds
        )
      );
    },
    [setEdges]
  );

  const onNodeContextMenu = useCallback(
    (event, node) => {
      event.preventDefault();

      const boundingRect = reactFlowWrapper.current.getBoundingClientRect();

      setContextMenu({
        x: event.clientX - boundingRect.left,
        y: event.clientY - boundingRect.top,
        nodeId: node.id,
      });
    },
    [setContextMenu]
  );

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  useEffect(() => {
    window.currentNodes = nodes;
  }, [nodes]);

  useEffect(() => {
    window.currentEdges = edges;
  }, [edges]);

  return (
    <div
      className="flex-1 relative h-full w-full"
      ref={reactFlowWrapper}
      onDrop={onDrop}
      onDragOver={(e) => e.preventDefault()}
    >
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
        <div className="hidden md:block">
          <MiniMap
            nodeColor={() => "#10b981"}
            nodeStrokeWidth={1}
            position="bottom-right"
          />
        </div>
      </ReactFlow>
    </div>
  );
};

export default FlowEditor;
