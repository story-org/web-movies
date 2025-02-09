import PhimApi from "@/libs/phimapi.com";
import Description from "@/components/movie/description";
import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";

export async function generateMetadata({ searchParams }: any) {
  const { slug } = await searchParams;
  const api = new PhimApi();
  const { movie } = await api.get(slug);
  return {
    title: movie.name,
    description: movie.content,
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
