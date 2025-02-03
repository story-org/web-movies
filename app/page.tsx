import PhimApi from "@/libs/phimapi.com";
import MovieMinimalCard from "@/components/movie/movie-minimal";

type HomeProps = {
  searchParams: Promise<{
    index: number;
  }>;
};

export async function generateMetadata({ searchParams }: HomeProps) {
  const { index } = await searchParams;
  if (index) {
    return {
      title: "Phim Ảnh Remaster - Trang " + index,
      description: "Phim Ảnh Remaster",
      keywords: "phim Ảnh remaster",
    };
  }
  return {
    title: "Phim Ảnh Remaster",
    description: "Phim Ảnh Remaster",
    keywords: "phim Ảnh remaster",
  };
}

export default async function Home({ searchParams }: HomeProps) {
  const { index } = await searchParams;
  const pa = new PhimApi();
  const [movies, pages] = await pa.landing(index || 1);
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {movies.map((movie) => (
        <MovieMinimalCard key={movie.slug} movie={movie} />
      ))}
    </div>
  );
}
