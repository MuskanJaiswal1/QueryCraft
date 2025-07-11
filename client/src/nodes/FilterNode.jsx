import React from 'react';
import { Handle, Position, useReactFlow } from 'reactflow';

const FilterNode = ({ data, id }) => {
  const { setNodes } = useReactFlow();

  const handleChange = (e) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, condition: e.target.value } } : node
      )
    );
  };

  return (
    <div className="node-block bg-yellow-100 p-2 rounded w-60">
      <label className="block text-xs font-bold mb-1">Filter Condition</label>
      <input name="condition" value={data.condition} onChange={handleChange} className="input" />

      <Handle type="source" position={Position.Bottom} />
      <Handle type="target" position={Position.Top} />
    </div>
  );
};

export default FilterNode;
