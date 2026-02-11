import {
  Modal,
  ModalHeader,
  ModalBody,
  TextInput,
  Button,
  Textarea,
} from "flowbite-react";
import { useState, useEffect } from "react";
import type { BookRequest } from "../models/BookCard.types";

interface CreateBookModalProps {
  show: boolean;
  onClose: () => void;
  onSave: (book: Omit<BookRequest, "isFavorite">) => void;
}

export function CreateBookModal({
  show,
  onClose,
  onSave,
}: CreateBookModalProps) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [coverImage, setCoverImage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !author.trim()) return;
    onSave({ title, author, description, coverImage });
    setTitle("");
    setAuthor("");
    setDescription("");
    setCoverImage("");
    onClose();
  };

  const handleCancel = () => {
    setTitle("");
    setAuthor("");
    setDescription("");
    setCoverImage("");
    onClose();
  };

  useEffect(() => {
    if (!show) {
      setTitle("");
      setAuthor("");
      setDescription("");
      setCoverImage("");
    }
  }, [show]);

  return (
    <Modal show={show} onClose={onClose}>
      <ModalHeader>Create Book</ModalHeader>
      <ModalBody>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <TextInput
            placeholder="Book title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <TextInput
            placeholder="Book author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
          <Textarea
            maxLength={250}
            className="max-h-75 min-h-25 resize-none"
            placeholder="Book description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <TextInput
            placeholder="Book Image"
            value={coverImage}
            onChange={(e) => setCoverImage(e.target.value)}
          />
          <div className="flex gap-2">
            <Button type="submit">Save</Button>
            <Button color="gray" type="button" onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </ModalBody>
    </Modal>
  );
}
