import React from "react";
import { Handle, Position, useReactFlow } from "reactflow";

const AggregateNode = ({ data, id }) => {
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
    <div className="bg-indigo-50 border border-indigo-300 text-[10px] p-2 w-[200px] rounded shadow-sm">
      <p className="font-bold text-indigo-800 mb-1 text-[12px]">📈 Aggregation</p>

      <select
        name="function"
        value={data.function}
        onChange={handleChange}
        className="w-full mb-1 px-1 py-[2px] text-[10px] border rounded"
      >
        <option value="COUNT">COUNT</option>
        <option value="SUM">SUM</option>
        <option value="AVG">AVG</option>
        <option value="MAX">MAX</option>
        <option value="MIN">MIN</option>
      </select>

      <input
        name="field"
        value={data.field}
        onChange={handleChange}
        placeholder="e.g. salary"
        className="w-full px-1 py-[2px] text-[10px] border rounded"
      />

      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default AggregateNode;
