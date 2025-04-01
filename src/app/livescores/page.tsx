"use client"
import { useEffect, useState } from "react";
import Image from "next/image";
import Navbar from "../components/navbar";

interface League {
  league: {
    id: number;
    name: string;
    type: string;
    logo: string;
  };
  country: {
    name: string;
  };
}

const LeaguesPage: React.FC = () => {
  const [leagues, setLeagues] = useState<League[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLeagues = async () => {
      try {
        const response = await fetch("/api/leagues");
        const data = await response.json();
        if (data.data) {
          setLeagues(data.data);
        } else {
          throw new Error("Failed to fetch leagues");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchLeagues();
  }, []);

  if (loading) return <p className="text-center text-white">Loading leagues...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="bg-gray-900 text-white min-h-screen p-6">
      <Navbar />
      <h1 className="text-2xl font-bold mb-4">Football Leagues</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {leagues.map((league) => (
          <div key={league.league.id} className="bg-gray-800 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">{league.league.name}</h2>
            <p className="text-gray-400">Type: {league.league.type}</p>
            {league.league.logo && (
              <Image
                src={league.league.logo}
                alt={league.league.name}
                width={50}
                height={50}
                className="mt-2"
              />
            )}
            <p className="text-gray-400">Country: {league.country.name || "N/A"}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeaguesPage;
