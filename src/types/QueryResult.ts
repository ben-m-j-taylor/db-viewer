export type QueryResultRow = {
  values: Array<String | null>;
};

export type QueryResult = {
  columns: String[];
  rows: QueryResultRow[];
};

type QueryResults = {
  timeElapsed: number;
  results: QueryResult[];
};

export default QueryResults;
