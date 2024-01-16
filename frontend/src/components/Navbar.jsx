import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="bg-zinc-700 flex justify-between px-3 py-4 rounded">
      <nav className="flex items-center">
        <ul className="flex space-x-4">
          <li>
            <Link
              to="/notes"
              className="bg-slate-500 text-white hover:text-gray-300 hover:bg-slate-600 font-bold py-2 px-4 rounded-md"
            >
              My notes
            </Link>
          </li>
          <li>
            <Link
              to="/new"
              className="bg-slate-500 text-white hover:text-gray-300 hover:bg-slate-600 font-bold py-2 px-4 rounded-md"
            >
              Create Note
            </Link>
          </li>
        </ul>
      </nav>

      <div>
        <Link
          to="/"
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md"
          onClick={() => {
            window.localStorage.removeItem("user_id");
          }}
        >
          Log out
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
