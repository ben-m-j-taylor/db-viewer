import QueryResults from "../types/QueryResult";

type ResultsViewProps = {
  queryResults: QueryResults | undefined;
};

export default function ResultsView({ queryResults }: ResultsViewProps) {
  return (
    <div className="results-view grey-border">
      {queryResults ? (
        <div className="results-tables">
          {queryResults.results.map((result, i) => (
            <table key={i}>
              <thead>
                {result.columns.map((column) => (
                  <th key={`${i}-${column}`}>{column}</th>
                ))}
              </thead>
              <tbody>
                {result.rows.map((row, i2) => (
                  <tr key={`${i}-${i2}`}>
                    {row.values.map((value, i3) => (
                      <td key={`${i}-${i2}-${i3}`}>{value}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          ))}
        </div>
      ) : null}

      <div className="results-view-stats-bar">
        Time Elapsed:{" "}
        {queryResults?.timeElapsed ? `${queryResults.timeElapsed}ms` : "-"}
      </div>
    </div>
  );
}
