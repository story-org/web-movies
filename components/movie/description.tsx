"use client";

import { useState } from "react";
import Episode from "./episode";
import HLSPlayer from "../hls-player";

export default function Description({ movie, serverData }: any) {
  const [showTrailer, setShowTrailer] = useState(false);
  const [showMovie, setShowMovie] = useState(false);
  const [currentEpisodeUrl, setCurrentEpisodeUrl] = useState("");

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <div className="flex flex-col space-y-4">
        <div className="relative">
          <img
            src={movie.poster_url}
            alt={movie.name}
            className="w-full h-[500px] object-cover rounded-lg"
          />

          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
            <h1 className="text-3xl font-bold text-white mb-2">{movie.name}</h1>
            <div className="flex flex-wrap gap-2 text-sm">
              <span className="px-3 py-1 bg-blue-100/90 text-blue-800 rounded-full">
                {movie.quality}
              </span>
              <span className="px-3 py-1 bg-green-100/90 text-green-800 rounded-full">
                {movie.lang}
              </span>
              <span className="px-3 py-1 bg-purple-100/90 text-purple-800 rounded-full">
                {movie.time}
              </span>
              <span className="px-3 py-1 bg-yellow-100/90 text-yellow-800 rounded-full">
                {movie.year}
              </span>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setShowMovie(!showMovie)}
            className="px-4 py-2 text-white rounded-lg bg-slate-600 hover:bg-slate-700 transition-colors"
          >
            {showMovie ? "Đóng" : "Xem Phim"}
          </button>
          {showMovie && currentEpisodeUrl && (
            <div className="w-screen h-auto rounded-lg">
              <HLSPlayer videoUrl={currentEpisodeUrl} />
            </div>
          )}
          {movie.trailer_url && (
            <button
              onClick={() => setShowTrailer(true)}
              className={
                "px-4 py-2 text-white rounded-lg transition-colors" + showMovie
                  ? " bg-slate-600 hover:bg-slate-700"
                  : " bg-red-600 hover:bg-red-700"
              }
            >
              Xem Trailer
            </button>
          )}
        </div>

        {showMovie && (
          <Episode
            serverData={serverData}
            onSelectEpisode={(link: string) => setCurrentEpisodeUrl(link)}
          />
        )}

        <h2 className="text-xl text-gray-600 dark:text-gray-300">
          {movie.origin_name}
        </h2>

        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-300">
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
              {movie.country.map((c: { name: string }) => c.name).join(", ")}
            </p>
          </div>
        </div>

        <div className="mt-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Nội dung phim
          </h3>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            {movie.content}
          </p>
        </div>

        {showTrailer && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="relative w-[90%] max-w-4xl">
              <button
                onClick={() => setShowTrailer(false)}
                className="absolute -top-10 right-0 text-white text-xl"
              >
                ✕
              </button>
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  src={`https://www.youtube.com/embed/${
                    movie.trailer_url.split("v=")[1]
                  }`}
                  className="w-full h-[400px] rounded-lg"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
