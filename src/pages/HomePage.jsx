import { useState } from "react";
import TodoTable from "../components/TodoTable";
import TodoModal from "../components/TodoModal";

export default function HomePage({ todos, onAddTodo, onDeleteTodo }) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [feedback, setFeedback] = useState("");

  const showFeedback = (message) => {
    setFeedback(message);
    setTimeout(() => setFeedback(""), 3000);
  };

  const handleAdd = (newTodoData) => {
    onAddTodo(newTodoData);
    setIsAddModalOpen(false);
    showFeedback("Tugas baru berhasil ditambahkan!");
  };

  const handleDelete = (todo) => {
    const isConfirmed = window.confirm(
      `Apakah Anda yakin ingin menghapus tugas "${todo.title}"?`
    );
    if (isConfirmed) {
      onDeleteTodo(todo.id);
      showFeedback(`Tugas "${todo.title}" berhasil dihapus.`);
    }
  };

  return (
    <div className="container">
      {feedback && <div className="feedback-banner">{feedback}</div>}

      <header className="page-header">
        <h1>Todo List</h1>
        <button
          type="button"
          className="btn btn-blue"
          onClick={() => setIsAddModalOpen(true)}
        >
          Tambah Todo
        </button>
      </header>

      <TodoTable todos={todos} onDelete={handleDelete} />

      <TodoModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAdd}
        modalTitle="Tambah Todo"
        submitLabel="Tambah"
      />
    </div>
  );
}