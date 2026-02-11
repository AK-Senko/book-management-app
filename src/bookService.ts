import { axiosInstance } from "./api/axiosInstance";
import { BookRequest, BookResponse } from "./models/BookCard.types";

export const bookService = {
  // get books
  getBooks: () => axiosInstance.get<BookResponse[]>("/books"),
  // create book (server generates `id`)
  createBook: (bookData: Omit<BookRequest, "isFavorite"> | BookRequest) =>
    axiosInstance.post<BookResponse>("/books", bookData),
  // update book
  updateBook: (id: string, bookData: BookRequest) =>
    axiosInstance.put<BookResponse>(`/books/${id}`, bookData),
  // delete book
  deleteBook: (id: string) => axiosInstance.delete<void>(`/books/${id}`),
};
