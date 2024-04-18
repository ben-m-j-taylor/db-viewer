export type QueryResultRow = {
  values: Array<string | null>;
};

export type QueryResult = {
  columns: string[];
  rows: QueryResultRow[];
};

type QueryResults = {
  timeElapsed: number;
  results: QueryResult[];
};

export default QueryResults;
