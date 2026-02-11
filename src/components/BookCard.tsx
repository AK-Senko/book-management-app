import { Card, Button } from "flowbite-react";
import { FaHeart, FaTrashAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { BookResponse } from "../models/BookCard.types";
import { useState, useEffect } from "react";
interface BookCardProps {
  book: BookResponse;
  onLike: (book: BookResponse) => void;
  onEdit: (book: BookResponse) => void;
  onDelete: (id: string) => void;
}

function BookCard({ book, onLike, onDelete, onEdit }: BookCardProps) {
  const [isFavorite, setIsFavorite] = useState(book.isFavorite);

  useEffect(() => {
    setIsFavorite(book.isFavorite);
  }, [book.isFavorite]);

  const handleLike = () => {
    setIsFavorite(!isFavorite);
    onLike({ ...book, isFavorite: !isFavorite });
  };
  const handleEdit = () => {
    onEdit(book);
  };
  const handleDelete = () => {
    onDelete(book.id);
  };

  return (
    <Card className="flex h-full flex-col text-center">
      <div className="rounded-t-lg bg-gray-900">
        <img
          className="h-60 w-full object-contain"
          src={book.coverImage}
          alt={book.title}
        />
      </div>
      <h1 className="truncate text-2xl font-bold">{book.title}</h1>
      <p className="truncate text-gray-500">{book.author}</p>
      <p className="mt-2 line-clamp-5 grow">{book.description}</p>
      <span className="flex flex-row justify-between">
        <Button color={isFavorite ? "green" : "gray"} onClick={handleLike}>
          <FaHeart />
        </Button>
        <Button color={"blue"} onClick={handleEdit}>
          <MdEdit />
        </Button>
        <Button color={"red"} onClick={handleDelete}>
          <FaTrashAlt />
        </Button>
      </span>
    </Card>
  );
}

export default BookCard;
