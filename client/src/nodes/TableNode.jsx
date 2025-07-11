import React from 'react';
import { Handle, Position } from 'reactflow';

const TableNode = ({ data }) => {
  const handleChange = (e) => {
    const value = e.target.value;
    if (data.onChange) {
      data.onChange({ tableName: value });
    }
  };

  return (
    <div className="bg-white rounded shadow border p-3 min-w-[160px] text-center">
      <strong className="text-blue-600">📄 Table</strong>
      <input
        className="mt-2 w-full text-sm px-2 py-1 border rounded"
        placeholder="users"
        value={data.tableName || ""}
        onChange={handleChange}
      />
      <Handle type="source" position={Position.Bottom} />
      <Handle type="target" position={Position.Top} />
    </div>
  );
};

export default TableNode;
