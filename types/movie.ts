export interface MovieMinimal {
  modified: {
    time: string;
  };
  _id: string;
  name: string;
  slug: string;
  origin_name: string;
  poster_url: string;
  thumb_url: string;
  year: number;
}

export interface MovieDetail {
  tmdb: {
    type: any;
    id: any;
    season: any;
    vote_average: number;
    vote_count: number;
  };
  imdb: {
    id: any;
  };
  created: {
    time: string;
  };
  modified: {
    time: string;
  };
  _id: string;
  name: string;
  slug: string;
  origin_name: string;
  content: string;
  type: string;
  status: string;
  poster_url: string;
  thumb_url: string;
  is_copyright: boolean;
  sub_docquyen: string;
  chieurap: string;
  trailer_url: string;
  time: string;
  episode_current: string;
  episode_total: string;
  quality: string;
  lang: string;
  notify: string;
  showtimes: string;
  year: number;
  view: number;
  actor: string[];
  director: string[];
  category: Category[];
  country: Country[];
}

export interface ServerData {
  server_name: string;
  server_data: EpisodeInfo[];
}

export interface EpisodeInfo {
  name: string;
  slug: string;
  filename: string;
  link_embed: string;
  link_m3u8: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface Country {
  id: string;
  name: string;
  slug: string;
}

export interface Topic {
  name: string;
  path: string;
  slug: string;
}

export interface PageInfo {
  totalItems: number;
  totalItemsPerPage: number;
  currentPage: number;
  totalPages: number;
}
