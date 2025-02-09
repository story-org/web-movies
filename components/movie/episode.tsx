"use client";

import { useEffect } from "react";

export default function Episode({ serverData, onSelectEpisode }: any) {
  useEffect(() => {
    onSelectEpisode(serverData[0].server_data[0].link_m3u8);
  });
  return (
    <div className="w-full dark:bg-gray-900">
      <select
        className="w-full p-2 rounded-lg bg-gray-700 dark:bg-gray-800 text-white border border-gray-600 dark:border-gray-700 focus:outline-none focus:border-blue-500"
        onChange={(e: any) => onSelectEpisode(e.target.value)}
      >
        {serverData.map((server: any, serverIndex: number) => (
          <optgroup
            key={serverIndex}
            label={server.server_name}
            className="bg-gray-800 dark:bg-gray-900"
          >
            {server.server_data.map((episode: any, episodeIndex: number) => (
              <option
                key={episodeIndex}
                value={episode.link_m3u8}
                className="py-1 px-2 hover:bg-gray-600 dark:hover:bg-gray-700"
              >
                {episode.name} - {episode.filename}
              </option>
            ))}
          </optgroup>
        ))}
      </select>
    </div>
  );
}
