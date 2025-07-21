import React from "react";
import { Handle, Position, useReactFlow } from "reactflow";

const SelectColumnsNode = ({ data, id }) => {
  const { setNodes } = useReactFlow();

  const handleChange = (e) => {
    const value = e.target.value;
    setNodes((nds) =>
      nds.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, columns: value } } : node
      )
    );
  };

  return (
    <div className="bg-yellow-100 border border-yellow-300 text-[10px] p-2 rounded w-[180px] shadow-sm">
      <p className="text-yellow-800 font-bold text-[12px] mb-1">📌 Select Columns</p>
      <input
        className="w-full px-1 py-[2px] text-[10px] border border-gray-300 rounded"
        placeholder="e.g. name, age"
        value={data.columns || ""}
        onChange={handleChange}
      />
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default SelectColumnsNode;
