import { Link } from "react-router-dom";
import type { JSX } from "react";

const ErrorPage = (): JSX.Element => {
  return (
    <div>
      <h1>Oh no, this route doesn't exist</h1>
      <Link to={"/"}>
        You can go back to the home page by clicking here, though!
      </Link>
    </div>
  );
};

export default ErrorPage;
