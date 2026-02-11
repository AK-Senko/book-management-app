import BookCard from "./components/BookCard";
import { useState, useEffect } from "react";
import { bookService } from "./bookService";
import { BookResponse, type BookRequest } from "./models/BookCard.types";
import { Button } from "flowbite-react";
import { CreateBookModal } from "./components/CreateBookModal";
import { EditBookModal } from "./components/EditBookModal";

export default function App() {
  const [books, setBooks] = useState<BookResponse[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<BookResponse | null>(null);

  useEffect(() => {
    bookService
      .getBooks()
      .then((response) => {
        setBooks(response.data);
      })
      .catch((error) => console.error("Can't fetch books:", error));
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;
    try {
      await bookService.deleteBook(id);
      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  const handleLike = async (book: BookResponse) => {
    try {
      const updatedBookData = { ...book, isFavorite: !book.isFavorite };

      const response = await bookService.updateBook(book.id, updatedBookData);

      setBooks((prevBooks) =>
        prevBooks.map((b) => (b.id === book.id ? response.data : b)),
      );
    } catch (error) {
      console.error("Error updating like:", error);
    }
  };

  const handleCreateBook = async (
    bookData: Omit<BookRequest, "isFavorite">,
  ) => {
    try {
      const createData: BookRequest = { ...bookData, isFavorite: false };
      const response = await bookService.createBook(createData);
      setBooks((prevBooks) => [...prevBooks, response.data]);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error creating book:", error);
    }
  };

  const handleUpdateBook = async (id: string, bookData: BookRequest) => {
    try {
      const response = await bookService.updateBook(id, bookData);
      setBooks((prevBooks) =>
        prevBooks.map((book) => (book.id === id ? response.data : book)),
      );
      setEditingBook(null);
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };
  return (
    <div className="text-gra BG m-0 flex w-full flex-col justify-center bg-gray-800 px-10 py-4 text-gray-400">
      <Button color={"green"} onClick={() => setIsModalOpen(true)}>
        Create Book
      </Button>
      <h1 className="mt-4 mb-8 text-center text-3xl font-bold">My Books</h1>

      <CreateBookModal
        show={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleCreateBook}
      />

      <EditBookModal
        show={!!editingBook}
        onClose={() => setEditingBook(null)}
        onSave={handleUpdateBook}
        bookToEdit={editingBook}
      />

      <div className="bgt grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {books.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            onLike={() => handleLike(book)}
            onDelete={() => handleDelete(book.id)}
            onEdit={() => setEditingBook(book)}
          />
        ))}
      </div>
      {books.length === 0 && (
        <p className="mt-10 text-center text-gray-500">
          No books found! Please add a book.
        </p>
      )}
    </div>
  );
}
