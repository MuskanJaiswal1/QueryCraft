import { toast } from "react-hot-toast";

export const generatePromptFromFlow = (nodes, edges, nodeRegistry) => {
  const sorted = topologicalSort(nodes, edges);
  if (!sorted.length) return null;

  const parts = sorted.map((node) => {
    const getPrompt = nodeRegistry[node.type]?.getPrompt;
    return getPrompt ? getPrompt(node.data) : "";
  });

  return parts.filter(Boolean).join(", then ");
};

const topologicalSort = (nodes, edges) => {
  const adjList = new Map();
  const inDegree = new Map();

  nodes.forEach((node) => {
    adjList.set(node.id, []);
    inDegree.set(node.id, 0);
  });

  edges.forEach((edge) => {
    adjList.get(edge.source).push(edge.target);
    inDegree.set(edge.target, (inDegree.get(edge.target) || 0) + 1);
  });

  const queue = [];
  inDegree.forEach((deg, nodeId) => {
    if (deg === 0) queue.push(nodeId);
  });

  const sorted = [];
  while (queue.length) {
    const current = queue.shift();
    const currentNode = nodes.find((n) => n.id === current);
    if (currentNode) sorted.push(currentNode);

    adjList.get(current).forEach((neighbor) => {
      inDegree.set(neighbor, inDegree.get(neighbor) - 1);
      if (inDegree.get(neighbor) === 0) queue.push(neighbor);
    });
  }

  return sorted;
};

export const askAI = async ({ sql = "", explanation = "", nodes = [], edges = [], nodeRegistry, mode = "flow" }) => {
  toast.loading("Asking AI...");

  let prompt = "";
const baseResponseInstructions = `
Respond in **pure JSON only**, with these keys:
- "sql": SQL query string
- "explanation": What this query does (plain text)
- "suggestions": Concise optimization tips or best practices pointwise
- "visualFlow": An object with key "blocks", which is an array of logical step objects.

Each block must be a valid operation step with a "type" (like select, table, filter, join, groupBy, having, case, distinct, like, between, limit, etc.) and its relevant fields.
// Inside baseResponseInstructions
"If a step does not match any standard block type (like groupBy, having, case), use type 'custom' and include a 'label' and 'logic' or explanation."

Examples of block shapes:
- { "type": "select", "columns": ["name", "salary"] }
- { "type": "table", "name": "employees" }
- { "type": "like", "field": "name", "pattern": "A%" }
- { "type": "between", "field": "salary", "lowerBound": 50000, "upperBound": 100000 }
- { "type": "orderBy", "field": "department" }
- { "type": "filter", "condition":"salary>20000"}
- { "type": "join", "leftTable": "students", "leftAlias": "s", "rightTable": "enrollments", "rightAlias": "e", "on": "s.student_id = e.student_id", "joinType": "INNER JOIN" }

DO NOT include \`\`\`json or any Markdown syntax.
`.trim();

if (mode === "flow") {
  const flowPrompt = generatePromptFromFlow(nodes, edges, nodeRegistry);

  if (!flowPrompt) {
    toast.dismiss();
    return { error: "Invalid query flow." };
  }

  prompt = `
You are an intelligent SQL assistant embedded inside a visual query builder.

You will receive a sequence of user intent described in plain language — each step represents a logical block of a SQL query.

Your job:
1. Generate a clean, correct SQL query.
2. Explain what the query does in simple language.
3. Suggest 2–3 tips to optimize it.
4. Convert the logical steps into a JSON-based visualFlow containing ordered block objects.

${baseResponseInstructions}

Flow: ${flowPrompt}
`.trim();
}
 else if (mode === "sql") {
  prompt = `
You are a smart SQL assistant.

A user has written this SQL query:

"${sql}"

Do the following:
1. Explain in simple English what this query does.
2. Suggest 2 to 3 optimization tips or best practices. also Give the accurate sql query first properly highlighted as "improved sql query" if sql query given by user has some flaws. 
3. Decompose the SQL into a visual representation using logical block objects like: select, table, join, filter, orderBy, groupBy, having, case, like, between, distinct, limit, etc.

${baseResponseInstructions}
`.trim();
}
 else if (mode === "explanation") {
  prompt = `
You are a smart SQL assistant.

Based on the user's explanation, generate:
1. A valid SQL query.
2. A visual flow of logical SQL steps using appropriate blocks.
3. Suggestions to improve performance or reliability.

User explanation:
"${explanation}"

${baseResponseInstructions}
`.trim();
}
  
  try {
    // console.log("PROMPT: ",prompt);
    const res = await fetch("http://localhost:4000/generate-sql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    const data = await res.json();
    toast.dismiss();

    console.log("DATA: ", data);
    

   if (!res.ok || (!data.sql && !data.explanation)) {
  console.error("Backend error:", data);
  return { error: data.error || "AI response is incomplete." };
}


    return {
      sql: data.sql.trim(),
      explanation: data.explanation?.trim() || "",
      suggestions: data.suggestions?.trim() || "",
      visualFlow: data.visualFlow || [],
    };
  } catch (err) {
    toast.dismiss();
    console.error("Fetch error:", err);
    return { error: "Failed to fetch from AI." };
  }
};


import { useFlow } from "../context/FlowContext";
import { nodeRegistry } from "../nodes/nodeRegistry"; 

export const askAIFromCurrentInput = async (sql, explanation) => {
  const mode = sql
    ? "sql"
    : explanation
    ? "explanation"
    : "flow"; 

  const nodes = window.currentNodes || [];
  const edges = window.currentEdges || [];

  const result = await askAI({
    sql,
    explanation,
    nodes,
    edges,
    nodeRegistry,
    mode,
  });

  if (result.error) {
    toast.error(result.error);
    return { error: result.error };
  }

  // Dispatch global event (if any listener like FlowCanvas needs it)
  const event = new CustomEvent("ai-generated", { detail: result });
  window.dispatchEvent(event);

  return result;
};

