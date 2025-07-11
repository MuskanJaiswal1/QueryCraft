import React from "react";
import { Handle, Position, useReactFlow } from "reactflow";

const JoinNode = ({ data, id }) => {
  const { setNodes } = useReactFlow();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNodes((nds) =>
      nds.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, [name]: value } } : node
      )
    );
  };

  return (
    <div className="node-block bg-green-100 p-2 rounded w-60">
      <label className="block text-xs font-bold mb-1">Join Type</label>
      <input name="joinType" value={data.joinType} onChange={handleChange} className="input" />

      <label className="block text-xs font-bold mt-2 mb-1">Join Table</label>
      <input name="joinTable" value={data.joinTable} onChange={handleChange} className="input" />

      <label className="block text-xs font-bold mt-2 mb-1">Condition</label>
      <input name="condition" value={data.condition} onChange={handleChange} className="input" />

      <Handle type="source" position={Position.Bottom} />
      <Handle type="target" position={Position.Top} />
    </div>
  );
};

export default JoinNode;
