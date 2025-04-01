import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-blue-900 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Sports Hub</h1>
        <ul className="flex space-x-6">
          <li>
            <Link href="/predictions" className="hover:text-yellow-400">Predictions</Link>
          </li>
          <li>
            <Link href="/livescores" className="hover:text-yellow-400">Live Scores</Link>
          </li>
          <li>
            <Link href="/betting-tips" className="hover:text-yellow-400">Betting Tips</Link>
          </li>
          <li>
            <Link href="/dashboard" className="hover:text-yellow-400">User Dashboard</Link>
          </li>
          <li>
            <Link href="/login" className="bg-yellow-500 text-blue-900 px-4 py-2 rounded-lg hover:bg-yellow-600">Login</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
