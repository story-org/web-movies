import { MovieMinimal } from "@/types/movie";
import Image from "next/image";
import Link from "next/link";

interface MovieMinimalProps {
  movie: MovieMinimal;
}

export default function MovieMinimalCard({ movie }: MovieMinimalProps) {
  return (
    <Link href={`/watch?slug=${movie.slug}`} className="h-full">
      <div className="group relative flex h-full flex-col overflow-hidden rounded-lg bg-gray-800 transition-transform hover:scale-105">
        <div className="relative aspect-[2/3] w-full">
          <Image
            src={movie.poster_url}
            alt={movie.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="flex h-full flex-col justify-between p-4">
          <h3 className="mb-2 text-lg font-semibold text-white line-clamp-1">
            {movie.name}
          </h3>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-300">{movie.year}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
