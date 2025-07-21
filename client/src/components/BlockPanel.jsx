import React from "react";
import { nodeRegistry } from "../nodes/nodeRegistry";

const BlockPanel = () => {
  const handleDragStart = (e, type) => {
    const block = { type, ...nodeRegistry[type].defaultData };
    e.dataTransfer.setData("application/reactflow", JSON.stringify(block));
  };

  return (
    <div className="p-4 bg-gray-50 border-r w-60 h-screen overflow-y-auto">
  <div className="sticky top-0 bg-gray-50 pb-2">
    <h3 className="text-lg font-semibold mb-2">🧩 Blocks</h3>
  </div>
  {Object.entries(nodeRegistry).map(([key, config]) => (
    <div
      key={key}
      draggable
      onDragStart={(e) => handleDragStart(e, key)}
      className="bg-white shadow p-2 rounded border-l-4 mb-2 cursor-move hover:bg-gray-100"
      style={{ borderColor: config.color }}
    >
      <strong>{config.label}</strong>
      <p className="text-xs text-gray-600">{config.description}</p>
    </div>
  ))}
</div>
  );
};

export default BlockPanel;
