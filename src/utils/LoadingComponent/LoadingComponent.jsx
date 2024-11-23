const LoadingComponent = () => {
  return (
    <div className="h-screen w-full flex justify-center" style={{ paddingTop: 'calc(100vh / 3)' }}>
      <span className="loading loading-spinner loading-lg"></span>
    </div>
  );
};

export default LoadingComponent;