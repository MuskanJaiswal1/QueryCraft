import React from "react";
import { Handle, Position, useReactFlow } from "reactflow";

const HavingNode = ({ data, id }) => {
  const { setNodes } = useReactFlow();

  const handleChange = (e) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === id
          ? { ...node, data: { ...node.data, condition: e.target.value } }
          : node
      )
    );
  };

  return (
    <div className="bg-red-50 border border-red-300 text-[10px] p-2 w-[200px] rounded shadow-sm">
      <p className="font-bold text-red-700 mb-1 text-[12px]">📊 HAVING Condition</p>

      <input
        name="condition"
        value={data.condition}
        onChange={handleChange}
        placeholder="e.g. AVG(salary) > 60000"
        className="w-full px-1 py-[2px] text-[10px] border rounded"
      />

      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default HavingNode;
