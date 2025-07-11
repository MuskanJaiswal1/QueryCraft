import React from 'react';
import { Handle, Position, useReactFlow } from 'reactflow';

const OrderByNode = ({ data, id }) => {
  const { setNodes } = useReactFlow();

  const handleChange = (e) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, order: e.target.value } } : node
      )
    );
  };

  return (
    <div className="node-block bg-purple-100 p-2 rounded w-60">
      <label className="block text-xs font-bold mb-1">Order By</label>
      <input name="order" value={data.order} onChange={handleChange} className="input" />

      <Handle type="source" position={Position.Bottom} />
      <Handle type="target" position={Position.Top} />
    </div>
  );
};

export default OrderByNode;
