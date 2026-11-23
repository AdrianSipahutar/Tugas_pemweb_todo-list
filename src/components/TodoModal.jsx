import { useState, useEffect } from "react";

export default function TodoModal({
  isOpen,
  onClose,
  onSubmit,
  initialData = null,
  modalTitle = "Tambah Todo",
  submitLabel = "Tambah",
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("to-do");
  const [priority, setPriority] = useState("low");
  const [deadline, setDeadline] = useState("");

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || "");
      setDescription(initialData.description || "");
      setStatus(initialData.status || "to-do");
      setPriority(initialData.priority || "low");
      setDeadline(initialData.deadline || "");
    } else {
      setTitle("");
      setDescription("");
      setStatus("to-do");
      setPriority("low");
      setDeadline("");
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !deadline) return;

    onSubmit({
      title: title.trim(),
      description: description.trim(),
      status,
      priority,
      deadline,
    });
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-title">{modalTitle}</h2>

        <form onSubmit={handleFormSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="todo-title">Judul</label>
            <input
              id="todo-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="todo-description">Deskripsi</label>
            <textarea
              id="todo-description"
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="todo-status">Status</label>
              <select
                id="todo-status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="to-do">to-do</option>
                <option value="in progress">in progress</option>
                <option value="done">done</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="todo-priority">Prioritas</label>
              <select
                id="todo-priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="low">low</option>
                <option value="medium">medium</option>
                <option value="high">high</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="todo-deadline">Deadline</label>
            <input
              id="todo-deadline"
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              required
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="btn btn-red" onClick={onClose}>
              Batal
            </button>
            <button type="submit" className="btn btn-blue">
              {submitLabel}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}