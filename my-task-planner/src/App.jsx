import React, { useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, name: "Limpar a casa", status: "red" },
    { id: 2, name: "Responder e-mails", status: "red" },
  ]);
  const [newTask, setNewTask] = useState("");
  const [isEditing, setIsEditing] = useState(null);
  const [editText, setEditText] = useState("");

  // Função para alternar a cor do status em sequência
  const handleStatusChange = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === id) {
          const newStatus = task.status === "red" ? "yellow" : task.status === "yellow" ? "green" : "red";
          return { ...task, status: newStatus };
        }
        return task;
      })
    );
  };

  // Função para adicionar nova tarefa
  const handleAddTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: tasks.length + 1, name: newTask, status: "red" }]);
      setNewTask("");
    }
  };

  // Função para iniciar a edição de uma tarefa
  const handleEditTask = (id, name) => {
    setIsEditing(id);
    setEditText(name);
  };

  // Função para confirmar a edição
  const handleConfirmEdit = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, name: editText } : task
      )
    );
    setIsEditing(null);
  };

  // Função para excluir uma tarefa
  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="container">
      <nav className="navbar">
        <button className="nav-link active">Organização</button>
        <button className="nav-link">Tarefas</button>
      </nav>

      <header className="header">
        <h1>Otimize seu tempo e se organize com o nosso Planejador Diário.</h1>
      </header>

      <table className="task-table">
        <thead>
          <tr>
            <th>Tarefa</th>
            <th>Status</th>
            <th>Opções</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>
                {isEditing === task.id ? (
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                ) : (
                  task.name
                )}
              </td>
              <td>
                <div
                  className={`status-circle ${task.status}`}
                  onClick={() => handleStatusChange(task.id)}
                ></div>
              </td>
              <td>
                {isEditing === task.id ? (
                  <button onClick={() => handleConfirmEdit(task.id)}>✔️</button>
                ) : (
                  <>
                    <button onClick={() => handleEditTask(task.id, task.name)}>✏️</button>
                    <button onClick={() => handleDeleteTask(task.id)}>🗑️</button>
                  </>
                )}
              </td>
            </tr>
          ))}
          <tr>
            <td>
              <input
                type="text"
                placeholder="Nova tarefa..."
                className="new-task-input"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
              />
            </td>
            <td></td>
            <td>
              <button className="add-btn" onClick={handleAddTask}>+</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default App;
