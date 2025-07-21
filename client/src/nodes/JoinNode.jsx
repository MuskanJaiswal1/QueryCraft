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

  const left = data.sourceTable || data.sourceAlias || "Left";
  const right = data.targetTable || data.alias || "Right";

  return (
    <div className="bg-green-50 border border-green-300 rounded-md shadow-sm px-2 py-1 w-[220px] text-[11px] leading-tight font-sans">
      <p className="text-green-800 font-bold mb-1 truncate text-[12px]">
        🔗 Join: <span className="font-medium">{left}</span> ↔ <span className="font-medium">{right}</span>
      </p>

      <div className="mb-1">
        <label className="block text-[10px] text-gray-700 font-medium">Join Type</label>
        <input
          name="joinType"
          value={data.joinType}
          onChange={handleChange}
          className="w-full px-1 py-[1px] border border-gray-300 rounded text-[10px]"
        />
      </div>

      <div className="flex gap-1 mb-1">
        <div className="flex-1">
          <label className="block text-[10px] font-medium text-gray-700">Left</label>
          <input
            name="sourceTable"
            value={data.sourceTable}
            onChange={handleChange}
            className="w-full px-1 py-[1px] border border-gray-300 rounded text-[10px]"
          />
        </div>
        <div className="flex-1">
          <label className="block text-[10px] font-medium text-gray-700">Right</label>
          <input
            name="targetTable"
            value={data.targetTable}
            onChange={handleChange}
            className="w-full px-1 py-[1px] border border-gray-300 rounded text-[10px]"
          />
        </div>
      </div>

      <div>
        <label className="block text-[10px] font-medium text-gray-700">Condition</label>
        <input
          name="condition"
          value={data.condition}
          onChange={handleChange}
          className="w-full px-1 py-[1px] border border-gray-300 rounded text-[10px]"
        />
      </div>

      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default JoinNode;
