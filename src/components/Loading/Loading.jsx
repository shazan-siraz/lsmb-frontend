/* eslint-disable react/prop-types */
import './Loading.css'; // Make sure to create this CSS file for styling

const Loading = ({ isLoading, message = 'Loading...' }) => {
  if (!isLoading) return null;

  return (
    <div className="loading-overlay">
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p className="loading-message">{message}</p>
      </div>
    </div>
  );
};

export default Loading;
