import React from "react";
import { Handle, Position, useReactFlow } from "reactflow";

const LikeNode = ({ data, id }) => {
  const { setNodes } = useReactFlow();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNodes((nds) =>
      nds.map((node) =>
        node.id === id
          ? { ...node, data: { ...node.data, [name]: value } }
          : node
      )
    );
  };

  return (
    <div className="bg-pink-50 border border-pink-300 text-[10px] p-2 w-[200px] rounded shadow-sm">
      <p className="font-bold text-pink-700 mb-1 text-[12px]">🔤 LIKE Condition</p>

      <input
        name="field"
        value={data.field}
        onChange={handleChange}
        placeholder="Field (e.g. name)"
        className="w-full mb-1 px-1 py-[2px] text-[10px] border rounded"
      />

      <input
        name="pattern"
        value={data.pattern}
        onChange={handleChange}
        placeholder="Pattern (e.g. A%)"
        className="w-full px-1 py-[2px] text-[10px] border rounded"
      />

      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default LikeNode;
