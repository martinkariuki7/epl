export interface NotFoundInterface {}

const NotFound = () => {
  return (
    <div className="text-center mt-5">
      <h1>404</h1>
      <p>We could not find the page you are looking for</p>
    </div>
  );
};

export default NotFound;
