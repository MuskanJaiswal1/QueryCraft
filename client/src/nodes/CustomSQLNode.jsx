import React from "react";
import { Handle, Position } from "reactflow";

const CustomSQLNode = ({ data, id }) => {
  const handleChange = (e) => {
    const value = e.target.value;
    data.onChange?.({ customLogic: value });
  };

  return (
    <div className="bg-white border p-3 rounded shadow min-w-[200px]">
      <strong className="text-purple-700">🛠 Custom SQL Node</strong>
      <textarea
        className="w-full text-sm mt-2 p-1 border rounded"
        rows={3}
        placeholder="e.g. CASE WHEN marks > 90 THEN 'Topper' ..."
        value={data.customLogic || ""}
        onChange={handleChange}
      />
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default CustomSQLNode;
