import {
  MovieDetail,
  MovieMinimal,
  ServerData,
  PageInfo,
  Category,
} from "@/types/movie";

export default class PhimApi {
  private apiUrl = " https://phimapi.com";
  constructor() {
    this.apiUrl = "https://phimapi.com";
  }

  async get(
    slug: string
  ): Promise<{ movie: MovieDetail; server: ServerData[] }> {
    const url = `${this.apiUrl}/phim/${slug}`;
    const response = await fetch(url);
    const data = await response.json();
    return {
      movie: data.movie,
      server: data.episodes,
    };
  }

  async listCategories(): Promise<Category[]> {
    const url = `${this.apiUrl}/the-loai`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }

  async landing(index: number = 1): Promise<[MovieMinimal[], PageInfo]> {
    const url = `${this.apiUrl}/danh-sach/phim-moi-cap-nhat?page=${index}`;
    const response = await fetch(url);
    const data = await response.json();
    return [data.items, data.pagination];
  }

  async search(
    query: string,
    index: number = 1
  ): Promise<{ items: MovieMinimal[]; page: PageInfo }> {
    const url = `${this.apiUrl}/v1/api/tim-kiem?keyword=${query}&limit=10&page=${index}`;
    const response = await fetch(url);
    const data = await response.json();
    return {
      items: data.data.items,
      page: data.data.pagination,
    };
  }

  async byCategory(
    slug: string,
    index: number = 1
  ): Promise<{ items: MovieMinimal[]; page: PageInfo }> {
    const url = `${this.apiUrl}/v1/api/the-loai/${slug}?page=${index}`;
    const response = await fetch(url);
    const data = await response.json();
    return {
      items: data.data.items,
      page: data.data.pagination,
    };
  }

  async byTopic(
    slug: string,
    index: number = 1
  ): Promise<{ items: MovieMinimal[]; page: PageInfo }> {
    const url = `${this.apiUrl}/v1/api/danh-sach/${slug}?page=${index}`;
    const response = await fetch(url);
    const data = await response.json();
    return {
      items: data.data.items,
      page: data.data.pagination,
    };
  }
}
