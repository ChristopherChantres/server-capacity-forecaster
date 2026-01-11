import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const MAX_USERS = 1000;
const MAX_CPU = 100;

/**
 * Interactive scatter chart panel for server load visualization.
 * @param {Object} props
 * @param {Array<{x: number, y: number}>} props.data - Data points to display
 * @param {Array<{x: number, y: number}>|null} props.regressionLine - Regression line points
 * @param {Function} props.onAddPoint - Callback when chart is clicked to add a point
 */
const ChartPanel = ({ data, regressionLine, onAddPoint }) => {
  const handleClick = () => {
    // Generate a random point simulating new server log data
    const newPoint = {
      x: Math.floor(Math.random() * MAX_USERS),
      y: Math.floor(Math.random() * MAX_CPU),
    };
    onAddPoint(newPoint);
  };

  return (
    <div className="lg:col-span-2 bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-2xl relative">
      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
        Server Load Simulation
      </h3>

      <div
        className="h-[400px] w-full cursor-crosshair bg-gray-800/50 rounded-lg"
        onClick={handleClick}
      >
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis
              type="number"
              dataKey="x"
              name="Active Users"
              stroke="#9CA3AF"
              domain={[0, MAX_USERS]}
            />
            <YAxis
              type="number"
              dataKey="y"
              name="CPU %"
              stroke="#9CA3AF"
              unit="%"
              domain={[0, MAX_CPU]}
              allowDataOverflow={true}
            />
            <Tooltip
              cursor={{ strokeDasharray: '3 3' }}
              contentStyle={{
                backgroundColor: '#1F2937',
                borderColor: '#374151',
              }}
            />

            {/* The Data Points */}
            <Scatter name="Server Logs" data={data} fill="#60A5FA" />

            {/* The Prediction Line (Only appears after training) */}
            {regressionLine && (
              <Scatter
                name="OLS Line"
                data={regressionLine}
                line={{ stroke: '#EF4444', strokeWidth: 3 }}
                shape={() => null}
              />
            )}
          </ScatterChart>
        </ResponsiveContainer>
        <p className="absolute bottom-4 right-4 text-sm text-yellow-400 bg-gray-700/60 px-3 py-1.5 rounded-md">
          Click anywhere to simulate incoming traffic data
        </p>
      </div>
    </div>
  );
};

export default ChartPanel;
