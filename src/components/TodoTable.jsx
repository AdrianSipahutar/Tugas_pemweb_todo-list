import { useNavigate } from "react-router-dom";

export default function TodoTable({ todos, onDelete }) {
  const navigate = useNavigate();

  if (todos.length === 0) {
    return (
      <div className="empty-state">
        Belum ada daftar tugas. Klik <strong>Tambah Todo</strong> untuk membuat tugas baru.
      </div>
    );
  }

  return (
    <div className="table-wrapper">
      <table className="todo-table">
        <thead>
          <tr>
            <th>Judul</th>
            <th>Status</th>
            <th>Prioritas</th>
            <th>Deadline</th>
            <th className="text-center">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.id}>
              <td className="td-title" title={todo.title}>
                {todo.title}
              </td>
              <td>{todo.status}</td>
              <td>{todo.priority}</td>
              <td>{todo.deadline}</td>
              <td>
                <div className="action-buttons">
                  <button
                    type="button"
                    className="btn-icon btn-blue"
                    title="Lihat Detail Tugas"
                    onClick={() => navigate(`/todo/${todo.id}`)}
                  >
                    {/* Ikon Mata */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  </button>

                  <button
                    type="button"
                    className="btn-icon btn-red"
                    title="Hapus Tugas"
                    onClick={() => onDelete(todo)}
                  >
                    {/* Ikon Tempat Sampah */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M3 6h18" />
                      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                      <line x1="10" x2="10" y1="11" y2="17" />
                      <line x1="14" x2="14" y1="11" y2="17" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}