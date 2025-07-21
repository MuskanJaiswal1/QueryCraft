import React from "react";
import { Handle, Position } from "reactflow";

const CustomSQLNode = ({ data, id }) => {
  const handleLogicChange = (e) => {
    const value = e.target.value;
    data.onChange?.({ ...data, customLogic: value });
  };

  const handleLabelChange = (e) => {
    const label = e.target.value;
    data.onChange?.({ ...data, label });
  };

  return (
    <div className="bg-white border border-purple-300 text-[10px] p-2 rounded w-[200px] shadow-sm">
      <input
        className="w-full px-1 py-[2px] text-[12px] border border-gray-300 rounded mb-1"
        placeholder="e.g. LIKE, BETWEEN"
        value={data.label || "Custom Node Name"}
        onChange={handleLabelChange}
      />

      <textarea
        className="w-full px-1 py-[2px] text-[10px] border border-gray-300 rounded"
        rows={3}
        value={data.customLogic || ""}
        onChange={handleLogicChange}
        placeholder="e.g. CASE WHEN marks > 90 THEN 'Topper' ..."
      />

      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default CustomSQLNode;
