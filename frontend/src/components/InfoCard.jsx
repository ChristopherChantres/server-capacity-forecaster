/**
 * Reusable info card component for displaying explanatory content.
 * @param {Object} props
 * @param {React.ReactNode} props.icon - Icon component to display
 * @param {string} props.title - Card title
 * @param {string} props.description - Card description text
 * @param {string} [props.imageUrl] - Optional image URL to display
 * @param {string} props.borderColor - Color name (e.g., 'purple', 'green')
 */
const InfoCard = ({ icon, title, description, imageUrl, borderColor = 'purple' }) => {
  return (
    <div className={`bg-gray-800 p-6 rounded-xl border-l-4 border-${borderColor}-500 shadow-lg`}>
      <div className="flex items-center gap-3 mb-4">
        {icon}
        <h3 className="text-lg font-bold">{title}</h3>
      </div>
      <div className={imageUrl ? 'flex gap-4' : ''}>
        {imageUrl && (
          <img
            src={imageUrl}
            alt={title}
            className="w-1/3 h-24 object-cover rounded border border-gray-700"
          />
        )}
        <p className="text-sm text-gray-300 leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

export default InfoCard;
