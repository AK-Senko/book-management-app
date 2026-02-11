import {
  Modal,
  ModalHeader,
  ModalBody,
  TextInput,
  Button,
  Textarea,
} from "flowbite-react";
import { useState, useEffect } from "react";
import type { BookRequest, BookResponse } from "../models/BookCard.types";

interface EditBookModalProps {
  show: boolean;
  onClose: () => void;
  onSave: (id: string, book: BookRequest) => void;
  bookToEdit: BookResponse | null;
}

export function EditBookModal({
  show,
  onClose,
  onSave,
  bookToEdit,
}: EditBookModalProps) {
  const [formData, setFormData] = useState<BookRequest>({
    title: "",
    author: "",
    description: "",
    coverImage: "",
    isFavorite: false,
  });

  useEffect(() => {
    if (bookToEdit) {
      setFormData({
        title: bookToEdit.title,
        author: bookToEdit.author,
        description: bookToEdit.description,
        coverImage: bookToEdit.coverImage,
        isFavorite: bookToEdit.isFavorite,
      });
    }
  }, [bookToEdit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (bookToEdit) {
      onSave(bookToEdit.id, formData);
      onClose();
    }
  };
  return (
    <Modal show={show} onClose={onClose}>
      <ModalHeader>Edit Book</ModalHeader>
      <ModalBody>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <TextInput
            maxLength={50}
            placeholder="Title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            required
          />
          <TextInput
            maxLength={30}
            placeholder="Author"
            value={formData.author}
            onChange={(e) =>
              setFormData({ ...formData, author: e.target.value })
            }
            required
          />
          <Textarea
            maxLength={250}
            className="max-h-75 min-h-25 resize-none"
            placeholder="Description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
          <TextInput
            placeholder="Image URL"
            value={formData.coverImage}
            onChange={(e) =>
              setFormData({ ...formData, coverImage: e.target.value })
            }
            required
          />
          <div className="flex gap-2">
            <Button type="submit" color="blue">
              Save Changes
            </Button>
            <Button color="gray" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </ModalBody>
    </Modal>
  );
}
