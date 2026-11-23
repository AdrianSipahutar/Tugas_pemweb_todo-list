import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TodoModal from "../components/TodoModal";

export default function TodoDetailPage({ todos, onUpdateTodo }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [feedback, setFeedback] = useState("");

  const todo = todos.find((item) => String(item.id) === String(id));

  if (!todo) {
    return (
      <div className="detail-wrapper">
        <div className="detail-card">
          <p>Tugas tidak ditemukan.</p>
          <button
            type="button"
            className="btn btn-red"
            style={{ marginTop: "16px" }}
            onClick={() => navigate("/")}
          >
            Kembali
          </button>
        </div>
      </div>
    );
  }

  const handleUpdate = (updatedFields) => {
    onUpdateTodo(todo.id, updatedFields);
    setIsUpdateModalOpen(false);
    setFeedback("Data tugas berhasil diperbarui!");
    setTimeout(() => setFeedback(""), 3000);
  };

  return (
    <div className="detail-wrapper">
      {feedback && <div className="feedback-banner">{feedback}</div>}

      <div className="detail-card">
        <div className="detail-grid">
          {/* Kolom Kiri: Judul & Deskripsi */}
          <div className="detail-left">
            <div className="detail-item">
              <h3>Judul</h3>
              <p>{todo.title}</p>
            </div>

            <div className="detail-item">
              <h3>Deskripsi</h3>
              <div className="description-box">
                {todo.description || "Tidak ada deskripsi."}
              </div>
            </div>
          </div>

          {/* Kolom Kanan: Status, Prioritas, Deadline & Tombol */}
          <div className="detail-right">
            <div className="detail-item">
              <h3>Status</h3>
              <p>{todo.status}</p>
            </div>

            <div className="detail-item">
              <h3>Prioritas</h3>
              <p>{todo.priority}</p>
            </div>

            <div className="detail-item">
              <h3>Deadline</h3>
              <p>{todo.deadline}</p>
            </div>

            <div className="detail-actions">
              <button
                type="button"
                className="btn btn-red"
                onClick={() => navigate("/")}
              >
                Kembali
              </button>
              <button
                type="button"
                className="btn btn-blue"
                onClick={() => setIsUpdateModalOpen(true)}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>

      <TodoModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        onSubmit={handleUpdate}
        initialData={todo}
        modalTitle="Update Todo"
        submitLabel="Update"
      />
    </div>
  );
}