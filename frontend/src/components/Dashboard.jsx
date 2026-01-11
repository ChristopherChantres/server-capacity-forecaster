import { useState } from 'react';
import { BrainCircuit, Calculator } from 'lucide-react';
import { trainModel } from '../services/api';
import Header from './Header';
import ChartPanel from './ChartPanel';
import DataTable from './DataTable';
import InfoCard from './InfoCard';

const INITIAL_DATA = [
  { x: 100, y: 15 },
  { x: 200, y: 25 },
  { x: 350, y: 45 },
];

const INFO_CARDS = [
  {
    id: 'ols',
    icon: <BrainCircuit className="text-purple-500" />,
    title: 'Why Ordinary Least Squares?',
    description:
      'For this microservice, Ordinary Least Squares (OLS) was selected as the algorithm over iterative Gradient Descent. Given the dataset is small and fits in memory, OLS provides a solution in O(N) time complexity with current implementation. This approach eliminates the need for hyperparameter tuning (e.g., Learning Rate) and removes the risk of non-convergence, ensuring the predictive engine is both deterministic and stateless.',
    imageUrl: null, // Optional: add image URL here
    borderColor: 'purple',
  },
  {
    id: 'stateless',
    icon: <Calculator className="text-green-500" />,
    title: 'Stateless Architecture',
    description:
      'The backend is 100% Stateless. The React frontend maintains the "Session State" (the points), and the FastAPI engine acts as a pure function f(data) → (slope, intercept).',
    imageUrl: null, // Optional: add image URL here
    borderColor: 'green',
  },
];

const Dashboard = () => {
  // State for Data Points
  const [data, setData] = useState(INITIAL_DATA);

  // State for the Regression Line (received from Backend)
  const [regressionLine, setRegressionLine] = useState(null);

  // State for loading indicator
  const [isLoading, setIsLoading] = useState(false);

  // State for error handling
  const [error, setError] = useState(null);

  // Add a new point to the data
  const handleAddPoint = (newPoint) => {
    setData((prevData) => [...prevData, newPoint]);
  };

  // Delete a point from the data
  const handleDeletePoint = (index) => {
    setData((prevData) => prevData.filter((_, i) => i !== index));
  };

  // Clear all points and reset the regression line
  const handleClearPoints = () => {
    setData([]);
    setRegressionLine(null);
    setError(null);
  };

  // Call the FastAPI Backend to train the model
  const handleTrainModel = async () => {
    if (data.length < 2) {
      setError('At least 2 data points are required to train the model');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const { slope, intercept } = await trainModel(data);
      console.log(slope, intercept);

      // Create two points to draw the regression line
      const lineStart = { x: 0, y: intercept };
      const lineEnd = { x: 1000, y: slope * 1000 + intercept };

      setRegressionLine([lineStart, lineEnd]);
    } catch (err) {
      console.error('Backend failed:', err);
      setError('Failed to train model. Please ensure the backend is running.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 font-sans">
      {/* Header */}
      <Header
        onTrainModel={handleTrainModel}
        onClearPoints={handleClearPoints}
        isLoading={isLoading}
      />

      {/* Error Message */}
      {error && (
        <div className="mb-6 bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Left: The Interactive Canvas */}
        <ChartPanel
          data={data}
          regressionLine={regressionLine}
          onAddPoint={handleAddPoint}
        />

        {/* Right: The Data Table */}
        <DataTable data={data} onDeletePoint={handleDeletePoint} />
      </div>

      {/* Bottom: The "Why OLS?" Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {INFO_CARDS.map((card) => (
          <InfoCard
            key={card.id}
            icon={card.icon}
            title={card.title}
            description={card.description}
            imageUrl={card.imageUrl}
            borderColor={card.borderColor}
          />
        ))}
      </div>

      {/* Footer */}
      <footer className="mt-12 pt-6 border-t border-gray-700 text-center text-gray-500 text-sm">
        Built by{' '}
        <a
          href="https://linkedin.com/in/christopher-chantres"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-300 transition-colors"
        >
          Christopher Chantres
        </a>
      </footer>
    </div>
  );
};

export default Dashboard;
