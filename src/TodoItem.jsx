import { TrashIcon } from '@heroicons/react/24/solid';


export default function TodoItem({ tarea, toggleCompleted, eliminarTarea }) {
  
  

  return (
    <div className=" flex  justify-between items-center bg-gray-800 text-white p-4 mb-2 rounded">
        <span className={tarea.completed ? 'line-through' : 'text-gray-400'}>{tarea.text}</span>
        




            <div className="flex items-center gap-3">
            <input className="w-4 h-4" type="checkbox" checked={tarea.completed} onChange={() => toggleCompleted(tarea.id)} />
            <button>
                <TrashIcon className="w-5 h-5 text-red-500" onClick={() => eliminarTarea(tarea.id)} />
            </button>
        </div>
    </div>
  );
}