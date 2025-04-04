import PhimApi from "@/libs/phimapi.com";
import Description from "@/components/movie/description";
import Header from "@/components/header";
import Footer from "@/components/footer";

export async function generateMetadata({ searchParams }: any) {
  const { slug } = await searchParams;
  const api = new PhimApi();
  const { movie } = await api.get(slug);
  return {
    title: movie.name + " - Phim Ảnh",
    description: movie.content,
    keywords: `${movie.name}, ${movie.origin_name}, phim ảnh, phim chất lượng cao, phim, phim hd, phim kinh điển, phim viễn tưởng, phim kinh dị, phim bộ, anime`,
    openGraph: {
      images: [movie.poster_url],
    },
  };
}

export default async function WatchPage({ searchParams }: any) {
  const { slug } = await searchParams;
  const api = new PhimApi();
  const topics = api.listTopics();
  const categories = await api.listCategories();
  const { movie, server } = await api.get(slug);
  return (
    <main className="mx-auto max-w-screen-2xl px-4">
      <Header
        topics={topics}
        categories={categories}
        currentValue={undefined}
        isCategory={undefined}
      />
      <Description movie={movie} serverData={server} />
      <Footer />
    </main>
  );
}
