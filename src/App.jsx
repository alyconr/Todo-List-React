import TodoItem from "./TodoItem"
import { useState, useEffect } from "react"

export default function App() {

  const [tareas, setTareas] = useState([]);

  const [input, setInput] = useState("");


  const   agregarTarea = () => {

    const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:3000';
    if (input.trim()) {
      fetch(`${apiBase}/todos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: input.trim() })
      })
        .then(r => r.json())
        .then(nueva => {
          setTareas(prev => [...prev, nueva]);
          setInput("");
        })
        .catch(console.error);
    };

  }


  useEffect(() => {
    const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:3000';
    fetch(`${apiBase}/todos`)
      .then(r => r.json())
      .then(data => setTareas(data))
      .catch(() => setTareas([]));
  }, []);


  const toggleCompleted = (id) => {
    const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:3000';
    const tarea = tareas.find(t => t.id === id);
    if (!tarea) return;
    fetch(`${apiBase}/todos/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !tarea.completed })
    })
      .then(r => r.json())
      .then(updated => {
        setTareas(prev => prev.map(t => t.id === id ? updated : t));
      })
      .catch(console.error);
  };


  const eliminarTarea = (id) => {
    const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:3000';
    fetch(`${apiBase}/todos/${id}`, { method: 'DELETE' })
      .then(res => {
        if (res.status === 204) setTareas(prev => prev.filter((tarea) => tarea.id !== id));
      })
      .catch(console.error);

  }

  return (
    <div className="max-w-md mx-auto mt-10 p-2  rounded shadow">
      <h1 className="text-3xl font-bold mb-5 text-center">APLICACION DE TAREAS</h1>
      <div className="flex gap-3 mb-5">
        <input className="flex-1 p-2 border rounded" type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Añadir Tarea" />
        <button className="bg-blue-500 text-white px-4 p-y-2 rounded" onClick={agregarTarea} >Añadir Tareas</button>
      </div>

      <div className="space-y-2 ">
        {tareas.map((tarea) => (<TodoItem key={tarea.id} tarea={tarea} toggleCompleted={toggleCompleted} eliminarTarea={eliminarTarea} />))}
      </div>

    </div>
  )
}