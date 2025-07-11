import TableNode from "./TableNode";
import SelectColumnsNode from "./SelectColumnsNode";
import JoinNode from "./JoinNode";
import FilterNode from "./FilterNode";
import OrderByNode from "./OrderByNode";
import CustomSQLNode from "./CustomSQLNode";

export const nodeRegistry = {
  tableNode: {
    label: "Table",
    description: "Add a table name",
    defaultData: { tableName: "students" },
    component: TableNode,
    getPrompt: (data) => `Start with table '${data.tableName}'`,
  },
  selectColumnsNode: {
    label: "Select Columns",
    description: "Choose specific columns instead of *",
    defaultData: { columns: "name, age" },
    component: SelectColumnsNode,
    getPrompt: (data) =>
      data.columns ? `Select columns: ${data.columns}` : "",
  },
  joinNode: {
    label: "Join",
    description: "Join two tables",
    defaultData: {
      joinType: "INNER JOIN",
      joinTable: "courses",
      condition: "students.id = courses.student_id",
    },
    component: JoinNode,
    getPrompt: (data) =>
      `Join with table '${data.joinTable}' using ${data.joinType} ON ${data.condition}`,
  },
  filterNode: {
    label: "Filter",
    description: "Filter the result set",
    defaultData: { condition: "marks > 90" },
    component: FilterNode,
    getPrompt: (data) => `Filter rows where ${data.condition}`,
  },
  orderByNode: {
    label: "Order By",
    description: "Sort the result set",
    defaultData: { order: "marks DESC" },
    component: OrderByNode,
    getPrompt: (data) => `Order the results by ${data.order}`,
  },
  customSQLNode: {
    label: "Custom SQL",
    description: "Write custom SQL logic",
    defaultData: { customLogic: "" },
    component: CustomSQLNode,
    getPrompt: (data) => data.customLogic || "",
  },
};
