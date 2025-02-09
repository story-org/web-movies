import { MetadataRoute } from "next";
import PhimApi from "@/libs/phimapi.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.BASE_URL;
  const api = new PhimApi();

  const [newMovies] = await api.newAdding(1);
  const categories = await api.listCategories();
  const topics = api.listTopics();

  const routes = ["", "/search"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 1,
  }));

  const topicRoutes = topics.map((topic) => ({
    url: `${baseUrl}/topic/${topic.slug}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.8,
  }));

  const categoryRoutes = categories.map((category: any) => ({
    url: `${baseUrl}/category/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.8,
  }));

  const movieRoutes = newMovies.map((movie: any) => {
    const lastModified = new Date();
    return {
      url: `${baseUrl}/movie/${movie.slug}`,
      lastModified: isNaN(lastModified.getTime()) ? new Date() : lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.5,
    };
  });

  return [...routes, ...topicRoutes, ...categoryRoutes, ...movieRoutes];
}
