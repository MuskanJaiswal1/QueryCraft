// flowParser.jsx

export const convertVisualBlocksToFlow = (blocks) => {
  const normalizedBlocks = Array.isArray(blocks)
    ? (typeof blocks[0] === "string" ? convertStringArrayToBlockObjects(blocks) : blocks)
    : [];

  let nodeIdCounter = 0;
  const createNode = (type, data) => ({
    id: `ai-node-${nodeIdCounter++}`,
    type,
    data: {
      ...data,
      onChange: () => {},
    },
    position: { x: 100, y: nodeIdCounter * 100 },
    sourcePosition: "bottom",
    targetPosition: "top",
  });

  const nodes = [];
  const edges = [];
  let prevNodeId = null;

  normalizedBlocks.forEach((block) => {
    let node = null;

    switch (block.type) {
      case "table":
        node = createNode("tableNode", { tableName: block.name });
        break;
      case "select":
        node = createNode("selectColumnsNode", {
          columns: block.columns?.join(", ") || "",
        });
        break;
      case "filter":
        node = createNode("filterNode", { condition: block.condition || "" });
        break;
case "join": {
  const left = block.leftTable || block.leftAlias || "Left";
  const right = block.rightTable || block.rightAlias || "Right";

  node = createNode("joinNode", {
    joinType: block.joinType || "INNER JOIN",
    joinTable: `${left} (${block.leftAlias || ""}) ↔ ${right} (${block.rightAlias || ""})`,
    condition: block.on,
    alias: block.rightAlias || "",
    sourceAlias: block.leftAlias || "",
    sourceTable: block.leftTable || "",
    targetTable: block.rightTable || "",
  });
  break;
}
      case "orderBy":
        node = createNode("orderByNode", {
          order: block.field || block.order,
        });
        break;
      case "like": {
  node = createNode("likeNode", {
    field: block.field || "",
    pattern: block.pattern || "",
  });
  break;
}
     case "between": {
  node = createNode("betweenNode", {
    field: block.field || "",
    lowerBound: block.lowerBound || block.lower || "",
    upperBound: block.upperBound || block.upper || "",
  });
  break;
}
      case "having": {
  node = createNode("havingNode", {
    condition: block.condition || "",
  });
  break;
}
case "aggregate": {
  node = createNode("aggregateNode", {
    function: block.function || "COUNT",
    field: block.field || "*",
  });
  break;
}
        case "limit": {
  node = createNode("limitNode", {
    limit: block.value || "10",
  });
  break;
}
      default:
        node = createNode("customSQLNode", {
          label: block.type?.toUpperCase() || "Custom SQL",
          customLogic: JSON.stringify(block),
        });
    }

    if (node) {
      nodes.push(node);
      if (prevNodeId) {
        edges.push({
          id: `e-${prevNodeId}-${node.id}`,
          source: prevNodeId,
          target: node.id,
          animated: true,
          style: { stroke: "#4ade80", strokeWidth: 3 },
        });
      }
      prevNodeId = node.id;
    }
  });

  return { nodes, edges };
};

// Fallback parser for raw string arrays like: ["SELECT: name", "FROM: students"]
const convertStringArrayToBlockObjects = (arr) => {
  return arr
    .map((line) => {
      if (typeof line !== "string") return null;

      if (line.startsWith("SELECT:")) {
        const columns = line.replace("SELECT:", "").trim().split(",").map((c) => c.trim());
        return { type: "select", columns };
      }
      if (line.startsWith("FROM:")) {
        return { type: "table", name: line.replace("FROM:", "").trim() };
      }
      if (line.startsWith("WHERE:")) {
        return { type: "filter", condition: line.replace("WHERE:", "").trim() };
      }
      if (line.startsWith("ORDER BY:")) {
        return { type: "orderBy", field: line.replace("ORDER BY:", "").trim() };
      }

      return null;
    })
    .filter(Boolean);
};
