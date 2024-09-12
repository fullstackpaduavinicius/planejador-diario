import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, name: "Limpar a casa", status: "red", photos: [] },
    { id: 2, name: "Responder e-mails", status: "red", photos: [] },
  ]);
  const [newTask, setNewTask] = useState("");
  const [isEditing, setIsEditing] = useState(null);
  const [editText, setEditText] = useState("");

  // Função para alternar a cor do status em sequência
  const handleStatusChange = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === id) {
          const newStatus =
            task.status === "red"
              ? "yellow"
              : task.status === "yellow"
              ? "green"
              : "red";
          return { ...task, status: newStatus };
        }
        return task;
      })
    );
  };

  // Função para adicionar nova tarefa
  const handleAddTask = () => {
    if (newTask.trim()) {
      setTasks([
        ...tasks,
        { id: tasks.length + 1, name: newTask, status: "red", photos: [] },
      ]);
      setNewTask("");
    }
  };

  // Função para adicionar fotos à tarefa
  const handleAddPhoto = (taskId, acceptedFiles) => {
    const newPhotos = acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? { ...task, photos: [...task.photos, ...newPhotos] }
          : task
      )
    );
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
            <th>Fotos</th>
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
                {/* Exibir fotos da tarefa */}
                <div>
                  {task.photos.map((photo, index) => (
                    <img
                      key={index}
                      src={photo.preview}
                      alt={`Tarefa ${task.id}`}
                      width="50"
                      height="50"
                    />
                  ))}
                </div>

                {/* Botão para upload de fotos */}
                <PhotoUpload taskId={task.id} onAddPhoto={handleAddPhoto} />
              </td>
              <td>
                {isEditing === task.id ? (
                  <button onClick={() => handleConfirmEdit(task.id)}>✔️</button>
                ) : (
                  <>
                    <button onClick={() => handleEditTask(task.id, task.name)}>
                      ✏️
                    </button>
                    <button onClick={() => handleDeleteTask(task.id)}>
                      🗑️
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
          <tr>
            <td>
              <input
                type="text"
                placeholder="Adicionar nova tarefa..."
                className="new-task-input"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
              />
            </td>
            <td></td>
            <td></td>
            <td>
              <button className="add-btn" onClick={handleAddTask}>
                +
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

// Componente de Upload de Foto
function PhotoUpload({ taskId, onAddPhoto }) {
  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [] },
    onDrop: (acceptedFiles) => onAddPhoto(taskId, acceptedFiles),
  });

  return (
    <div {...getRootProps()} className="dropzone">
      <input {...getInputProps()} />
      <button type="button">📷 Adicionar Foto</button>
    </div>
  );
}

export default App;
