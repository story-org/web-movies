import PhimApi from "@/libs/phimapi.com";
import MovieMinimalCard from "@/components/movie/movie-minimal";
import Header from "@/components/ui/header";
import Pagination from "@/components/ui/pagination";
import Footer from "@/components/ui/footer";

type HomeProps = {
  searchParams: Promise<{
    index: number | 1;
    category: string | undefined;
    topic: string | undefined;
  }>;
};
export async function generateMetadata({ searchParams }: HomeProps) {
  const { index, category, topic } = await searchParams;
  const api = new PhimApi();
  const topics = api.listTopics();
  const categories = await api.listCategories();
  let postTitle;

  if (category) {
    postTitle = categories.find((c: any) => c.slug === category);
  } else if (topic) {
    postTitle = topics.find((t: any) => t.slug === topic);
  }

  const titleText =
    (postTitle ? `${postTitle.name} | ` : "") +
    "Phim Ảnh" +
    (index > 1 ? " - Trang " + index : "");
  return {
    title: titleText,
    description:
      "Khám phá kho tàng phim ảnh chất lượng cao với hình ảnh và âm thanh hoàn hảo. Trải nghiệm những tác phẩm điện ảnh kinh điển với chất lượng tuyệt đỉnh.",
    keywords:
      "phim ảnh, phim chất lượng cao, phim, phim hd, phim kinh điển, phim viễn tưởng, phim kinh dị, phim bộ, anime",
  };
}

export default async function Home({ searchParams }: HomeProps) {
  const { index, category, topic } = await searchParams;
  const api = new PhimApi();
  const topics = api.listTopics();
  const categories = await api.listCategories();
  const [movies, pageInfo] = await api.getList(
    category ? true : topic ? false : null,
    category ? category : topic ? topic : "",
    index,
  );
  return (
    <main className="mx-auto max-w-screen-2xl px-4">
      <Header
        currentValue={category ? category : topic ? topic : ""}
        isCategory={category ? true : topic ? false : undefined}
        topics={topics}
        categories={categories}
      />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {movies.map((movie: any) => (
          <MovieMinimalCard key={movie.slug} movie={movie} />
        ))}
      </div>
      <Pagination pageInfo={pageInfo} />
      <Footer />
    </main>
  );
}
