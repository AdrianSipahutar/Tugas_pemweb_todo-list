import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { initialTodos } from "./data/dummyTodos";
import HomePage from "./pages/HomePage";
import TodoDetailPage from "./pages/TodoDetailPage";

export default function App() {
  const [todos, setTodos] = useState(initialTodos);

  // Nambah tugas baru
  const handleAddTodo = (newTodo) => {
    const createdTodo = {
      id: Date.now(),
      ...newTodo,
    };
    setTodos((prev) => [createdTodo, ...prev]);
  };

  // utk memperbarui (berdasarkan id)
  const handleUpdateTodo = (id, updatedData) => {
    setTodos((prev) =>
      prev.map((todo) =>
        String(todo.id) === String(id) ? { ...todo, ...updatedData } : todo
      )
    );
  };

  // Utk ngehapus (by id)
  const handleDeleteTodo = (id) => {
    setTodos((prev) =>
      prev.filter((todo) => String(todo.id) !== String(id))
    );
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              todos={todos}
              onAddTodo={handleAddTodo}
              onDeleteTodo={handleDeleteTodo}
            />
          }
        />
        <Route
          path="/todo/:id"
          element={
            <TodoDetailPage
              todos={todos}
              onUpdateTodo={handleUpdateTodo}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}