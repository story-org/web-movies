"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface MovieMinimalProps {
  movie: any;
}

export default function MovieMinimalCard({ movie }: MovieMinimalProps) {
  return (
    <Link href={`/watch?slug=${movie.slug}`} className="block h-full">
      <Card className="group relative h-full overflow-hidden transition-all hover:bg-gray-700/50 hover:shadow-xl dark:hover:bg-gray-700/30">
        <div className="relative aspect-[2/3] w-full">
          <img
            src={movie.poster_url}
            onError={(e) =>
              (e.currentTarget.src = `https://phimimg.com/${movie.poster_url}`)
            }
            alt={movie.name}
            loading="lazy"
            className="object-cover transition-transform group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <CardContent className="flex h-full flex-col justify-between p-4">
          <CardTitle className="mb-2 text-lg font-semibold line-clamp-1">
            {movie.name}
          </CardTitle>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-300">
              {movie.year}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
