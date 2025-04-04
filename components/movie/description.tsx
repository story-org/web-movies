"use client";

import { useState } from "react";
import Episode from "./episode";
import HLSPlayer from "../hls-player";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent } from "@/components/ui/dialog";

export default function Description({ movie, serverData }: any) {
  const [showTrailer, setShowTrailer] = useState(false);
  const [showMovie, setShowMovie] = useState(false);
  const [currentEpisodeUrl, setCurrentEpisodeUrl] = useState("");

  return (
    <Card className="p-6">
      <CardContent className="flex flex-col space-y-4 p-0">
        <div className="flex flex-col md:flex-row md:space-x-6">
          <div className="relative flex justify-center items-center md:w-1/3">
            <img
              src={movie.poster_url}
              alt={movie.name}
              className="max-w-full w-[300px] h-[500px] object-cover rounded-lg"
            />

            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
              <h1 className="text-3xl font-bold text-white mb-2">
                {movie.name}
              </h1>
              <div className="flex flex-wrap gap-2 text-sm">
                <Badge variant="secondary">{movie.quality}</Badge>
                <Badge variant="secondary">{movie.lang}</Badge>
                <Badge variant="secondary">{movie.time}</Badge>
                <Badge variant="secondary">{movie.year}</Badge>
              </div>
            </div>
          </div>

          <div className="md:w-2/3">
            <div className="flex flex-wrap gap-2 py-4">
              <Button
                variant="secondary"
                onClick={() => setShowMovie(!showMovie)}
              >
                {showMovie ? "Đóng" : "Xem Phim"}
              </Button>
              {movie.trailer_url && (
                <Button
                  variant="secondary"
                  onClick={() => setShowTrailer(true)}
                >
                  Xem Trailer
                </Button>
              )}
            </div>

            {showMovie && currentEpisodeUrl && (
              <div className="w-full h-auto rounded-lg mt-4">
                <HLSPlayer videoUrl={currentEpisodeUrl} />
              </div>
            )}

            {showMovie && (
              <Episode
                serverData={serverData}
                onSelectEpisode={(link: string) => setCurrentEpisodeUrl(link)}
              />
            )}

            <h2 className="text-xl text-muted-foreground mt-4">
              {movie.origin_name}
            </h2>

            <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground mt-4">
              <div>
                <p className="font-semibold">Đạo diễn:</p>
                <p>{movie.director.join(", ")}</p>
              </div>
              <div>
                <p className="font-semibold">Diễn viên:</p>
                <p>{movie.actor.join(", ")}</p>
              </div>
              <div>
                <p className="font-semibold">Thể loại:</p>
                <p>
                  {movie.category
                    .map((cat: { name: string }) => cat.name)
                    .join(", ")}
                </p>
              </div>
              <div>
                <p className="font-semibold">Quốc gia:</p>
                <p>
                  {movie.country
                    .map((c: { name: string }) => c.name)
                    .join(", ")}
                </p>
              </div>
            </div>

            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">
                Nội dung phim
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {movie.content}
              </p>
            </div>
          </div>
        </div>

        <Dialog open={showTrailer} onOpenChange={setShowTrailer}>
          <DialogContent className="sm:max-w-4xl">
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                src={`https://www.youtube.com/embed/${
                  movie.trailer_url.split("v=")[1]
                }`}
                className="w-full h-[400px] rounded-lg"
                allowFullScreen
              />
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
