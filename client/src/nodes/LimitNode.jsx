import React from "react";
import { Handle, Position, useReactFlow } from "reactflow";

const LimitNode = ({ data, id }) => {
  const { setNodes } = useReactFlow();

  const handleChange = (e) => {
    const value = e.target.value;
    setNodes((nds) =>
      nds.map((node) =>
        node.id === id
          ? { ...node, data: { ...node.data, limit: value } }
          : node
      )
    );
  };

  return (
    <div className="bg-gray-50 border border-gray-300 text-[10px] p-2 w-[200px] rounded shadow-sm">
      <p className="font-bold text-gray-700 mb-1 text-[12px]">🔽 Limit Rows</p>
      <input
        name="limit"
        value={data.limit}
        onChange={handleChange}
        placeholder="e.g. 100"
        className="w-full px-1 py-[2px] text-[10px] border border-gray-300 rounded"
      />
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default LimitNode;
