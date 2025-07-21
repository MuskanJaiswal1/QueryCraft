import React from 'react';
import { Handle, Position } from 'reactflow';

const TableNode = ({ data }) => {
  const handleChange = (e) => {
    const value = e.target.value;
    data.onChange?.({ tableName: value });
  };

  return (
    <div className="bg-white border border-blue-300 rounded p-2 w-[160px] text-center text-[10px] shadow-sm">
      <p className="text-blue-700 font-bold text-[12px] mb-1">📄 Table</p>
      <input
        className="w-full px-1 py-[2px] border border-gray-300 rounded text-[10px]"
        placeholder="e.g. users"
        value={data.tableName || ""}
        onChange={handleChange}
      />
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default TableNode;
