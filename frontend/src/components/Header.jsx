import { Calculator, Trash2 } from 'lucide-react';

/**
 * Header component with title, subtitle, and action buttons.
 * @param {Object} props
 * @param {Function} props.onTrainModel - Callback when train button is clicked
 * @param {Function} props.onClearPoints - Callback when clear button is clicked
 * @param {boolean} props.isLoading - Whether the model is currently training
 */
const Header = ({ onTrainModel, onClearPoints, isLoading = false }) => {
  return (
    <header className="mb-8 flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold text-blue-400">
          Server Capacity Forecaster
        </h1>
        <p className="text-gray-400">
          Predicting server crashes using Linear Regression (OLS)
        </p>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={onClearPoints}
          disabled={isLoading}
          className="bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2 transition-all cursor-pointer"
        >
          <Trash2 size={20} />
          Clear Points
        </button>
        <button
          onClick={onTrainModel}
          disabled={isLoading}
          className="bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2 transition-all shadow-lg shadow-blue-500/20 cursor-pointer"
        >
          <Calculator size={20} />
          {isLoading ? 'Training...' : 'Train Model (OLS)'}
        </button>
      </div>
    </header>
  );
};

export default Header;
