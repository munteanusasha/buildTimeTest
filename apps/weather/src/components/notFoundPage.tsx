import { Link } from "react-router";

export default function NotFoundPage() {
  return (
    <div>
      404 Not Found <br />
      <Link to="/"> Weather </Link>
      <br />
    </div>
  );
}
