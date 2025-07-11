import { nodeRegistry } from "../nodes/nodeRegistry";

export const nodeTypes = Object.fromEntries(
  Object.entries(nodeRegistry).map(([key, val]) => [key, val.component])
);