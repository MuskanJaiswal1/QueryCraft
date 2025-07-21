import TableNode from "./TableNode";
import SelectColumnsNode from "./SelectColumnsNode";
import JoinNode from "./JoinNode";
import FilterNode from "./FilterNode";
import OrderByNode from "./OrderByNode";
import CustomSQLNode from "./CustomSQLNode";
import LimitNode from "./LimitNode";
import LikeNode from "./LikeNode";
import BetweenNode from "./BetweenNode";
import HavingNode from "./HavingNode";
import AggregateNode from "./AggregateNode";

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
  aggregateNode: {
  label: "Aggregate",
  description: "Apply aggregate function (COUNT, AVG, etc.)",
  defaultData: { function: "COUNT", field: "*" },
  component: AggregateNode,
  getPrompt: (data) => `${data.function}(${data.field}) as an aggregate`,
},
  orderByNode: {
    label: "Order By",
    description: "Sort the result set",
    defaultData: { order: "marks DESC" },
    component: OrderByNode,
    getPrompt: (data) => `Order the results by ${data.order}`,
  },
  betweenNode: {
  label: "BETWEEN",
  description: "Value between a lower and upper bound",
  defaultData: { field: "salary", lowerBound: "50000", upperBound: "100000" },
  component: BetweenNode,
  getPrompt: (data) => `Filter where ${data.field} BETWEEN ${data.lowerBound} AND ${data.upperBound}`,
},
  likeNode: {
  label: "LIKE",
  description: "Pattern matching on column",
  defaultData: { field: "name", pattern: "A%" },
  component: LikeNode,
  getPrompt: (data) => `Filter where ${data.field} LIKE '${data.pattern}'`,
},
havingNode: {
  label: "HAVING",
  description: "Filter groups after aggregation",
  defaultData: { condition: "AVG(salary) > 60000" },
  component: HavingNode,
  getPrompt: (data) => `Filter groups having condition: ${data.condition}`,
},
filterNode: {
    label: "Filter",
    description: "Filter the result set",
    defaultData: { condition: "marks > 90" },
    component: FilterNode,
    getPrompt: (data) => `Filter rows where ${data.condition}`,
  },
   limitNode: {
    label: "Limit",
    description: "Limit number of rows returned",
    defaultData: { limit: "10" },
    component: LimitNode,
    getPrompt: (data) => `Limit results to ${data.limit} rows`,
  },
  customSQLNode: {
    label: "Custom SQL",
    description: "Write custom SQL logic",
    defaultData: { customLogic: "" },
    component: CustomSQLNode,
    getPrompt: (data) => data.customLogic || "",
  },
};
