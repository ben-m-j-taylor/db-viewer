import './ToolBar.css';

type ToolBarProps = {
  onRunQuery: () => void;
};

export default function ToolBar({ onRunQuery }: ToolBarProps): JSX.Element {
  return (
    <div className="toolbar">
      <button onClick={onRunQuery}>Run query</button>
    </div>
  );
}
