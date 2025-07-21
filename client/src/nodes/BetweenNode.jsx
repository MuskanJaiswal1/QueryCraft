import React from "react";
import { Handle, Position, useReactFlow } from "reactflow";

const BetweenNode = ({ data, id }) => {
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
    <div className="bg-blue-50 border border-blue-300 text-[10px] p-2 w-[200px] rounded shadow-sm">
      <p className="font-bold text-blue-800 mb-1 text-[12px]">🔽 BETWEEN Condition</p>

      <input
        name="field"
        value={data.field}
        onChange={handleChange}
        placeholder="Field (e.g. salary)"
        className="w-full mb-1 px-1 py-[2px] text-[10px] border rounded"
      />

      <input
        name="lowerBound"
        value={data.lowerBound}
        onChange={handleChange}
        placeholder="Lower Bound (e.g. 50000)"
        className="w-full mb-1 px-1 py-[2px] text-[10px] border rounded"
      />

      <input
        name="upperBound"
        value={data.upperBound}
        onChange={handleChange}
        placeholder="Upper Bound (e.g. 100000)"
        className="w-full px-1 py-[2px] text-[10px] border rounded"
      />

      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default BetweenNode;
