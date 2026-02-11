export interface BookRequest {
  title: string;
  author: string;
  description: string;
  coverImage: string;
  isFavorite: boolean;
}

export interface BookResponse extends BookRequest {
  id: string;
}
