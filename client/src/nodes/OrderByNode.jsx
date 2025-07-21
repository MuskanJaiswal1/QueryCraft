import React from 'react';
import { Handle, Position, useReactFlow } from 'reactflow';

const OrderByNode = ({ data, id }) => {
  const { setNodes } = useReactFlow();

  const handleChange = (e) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === id
          ? { ...node, data: { ...node.data, order: e.target.value } }
          : node
      )
    );
  };

  return (
    <div className="bg-purple-100 border border-purple-300 text-[10px] p-2 rounded w-[180px] shadow-sm">
      <p className="text-purple-800 font-bold text-[12px] mb-1">⬇️ Order By</p>
      <input
        name="order"
        value={data.order}
        onChange={handleChange}
        className="w-full px-1 py-[2px] text-[10px] border border-gray-300 rounded"
        placeholder="e.g. salary DESC"
      />
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default OrderByNode;
