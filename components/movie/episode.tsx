"use client";

import { useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Episode({ serverData, onSelectEpisode }: any) {
  useEffect(() => {
    onSelectEpisode(serverData[0].server_data[0].link_m3u8);
  });
  return (
    <div className="w-full dark:bg-gray-900">
      <Select onValueChange={onSelectEpisode} defaultValue={serverData[0].server_data[0].link_m3u8}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select episode" />
        </SelectTrigger>
        <SelectContent>
          {serverData.map((server: any, serverIndex: number) => (
            <SelectGroup key={serverIndex}>
              <SelectLabel>{server.server_name}</SelectLabel>
              {server.server_data.map((episode: any, episodeIndex: number) => (
                <SelectItem key={episodeIndex} value={episode.link_m3u8}>
                  {episode.name} - {episode.filename}
                </SelectItem>
              ))}
            </SelectGroup>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
