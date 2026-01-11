import { Trash2 } from 'lucide-react';

/**
 * Data table component displaying server log data points.
 * @param {Object} props
 * @param {Array<{x: number, y: number}>} props.data - Data points to display
 * @param {Function} props.onDeletePoint - Callback when a point is deleted
 */
const DataTable = ({ data, onDeletePoint }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 flex flex-col h-[500px]">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Incoming Logs</h3>
        <span className="bg-gray-700 text-xs px-2 py-1 rounded text-gray-300">
          {data.length} Points
        </span>
      </div>

      <div className="flex-1 overflow-y-auto pr-4 custom-scrollbar">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-gray-400 border-b border-gray-700 text-sm">
              <th className="py-2">Users (X)</th>
              <th className="py-2">CPU (Y)</th>
              <th className="py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((point, idx) => (
              <tr
                key={idx}
                className="border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors"
              >
                <td className="py-3 font-mono text-blue-300">{point.x}</td>
                <td
                  className={`py-3 font-mono font-bold ${
                    point.y > 80 ? 'text-red-400' : 'text-green-400'
                  }`}
                >
                  {point.y}%
                </td>
                <td className="py-3 text-right">
                  <button
                    onClick={() => onDeletePoint(idx)}
                    className="text-gray-500 hover:text-red-400 transition-colors"
                    aria-label={`Delete point ${idx + 1}`}
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
