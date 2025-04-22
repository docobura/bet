"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Navbar from "../components/navbar";

interface Team {
  position: number;
  team: {
    id: number;
    name: string;
    crest: string;
  };
  playedGames: number;
  won: number;
  draw: number;
  lost: number;
  points: number;
  goalDifference: number;
}

const LeaguesPage: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStandings = async () => {
      try {
        const response = await fetch("livescores/api/standings"); 


        const data = await response.json(); 
        const standings = data?.standings?.find(
          (s: any) => s.type === "TOTAL" && s.stage === "REGULAR_SEASON"
        );

        if (standings && standings.table) {
          setTeams(standings.table);
        } else {
          throw new Error("Standings no found");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch standings");
      } finally {
        setLoading(false);
      }
    };

    fetchStandings();
  }, []);

  if (loading) return <p className="text-center text-white">Loading standings...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="bg-gray-900 text-white min-h-screen p-6">
      <Navbar />
      <h1 className="text-2xl font-bold mb-4">Premier League 2021 Standings</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {teams.map((team) => (
          <div key={team.team.id} className="bg-gray-800 p-4 rounded-lg shadow-md">
            <div className="flex items-center gap-4">
              <Image
                src={team.team.crest}
                alt={team.team.name}
                width={40}
                height={40}
                className="rounded-full"
              />
              <h2 className="text-lg font-semibold">{team.position}. {team.team.name}</h2>
            </div>
            <p className="text-gray-400 mt-2">Played: {team.playedGames}</p>
            <p className="text-gray-400">Won: {team.won}, Draw: {team.draw}, Lost: {team.lost}</p>
            <p className="text-gray-300 font-bold mt-2">Points: {team.points}</p>
            <p className="text-gray-500">Goal Diff: {team.goalDifference}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeaguesPage;
