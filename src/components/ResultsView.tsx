import styled from 'styled-components';

import QueryResults from '../types/QueryResult';

const StyledResultsView = styled.div`
  width: 50%;
  height: 100%;
  border: grey 1px solid;
`;

type ResultsViewProps = {
  queryResults: QueryResults | undefined;
};

export default function ResultsView({ queryResults }: ResultsViewProps) {
  return (
    <StyledResultsView>
      {queryResults ? (
        <div className="results-tables">
          {queryResults.results.map((result, i) => (
            <table key={i}>
              <thead>
                <tr>
                  {result.columns.map((column) => (
                    <th key={`${i}-${column}`}>{column}</th>
                  ))}
                </tr>
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
        Time Elapsed:{' '}
        {queryResults?.timeElapsed ? `${queryResults.timeElapsed}ms` : '-'}
      </div>
    </StyledResultsView>
  );
}
