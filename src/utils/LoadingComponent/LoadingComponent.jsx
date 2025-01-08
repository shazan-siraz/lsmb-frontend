const LoadingComponent = () => {
  return (
    <div className=" w-full flex justify-center" style={{ paddingTop: 'calc(100vh / 4)' }}>
      <span className="loading loading-spinner loading-lg"></span>
    </div>
  );
};

export default LoadingComponent;