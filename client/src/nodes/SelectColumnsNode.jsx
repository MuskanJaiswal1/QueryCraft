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
    <div className="bg-yellow-100 p-3 rounded shadow border text-sm w-52">
      <strong className="text-yellow-800">📌 Select Columns</strong>
      <div className="mt-2">
        <input
          className="w-full p-1 border rounded"
          placeholder="e.g., name, age"
          value={data.columns || ""}
          onChange={handleChange}
        />
      </div>
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default SelectColumnsNode;
