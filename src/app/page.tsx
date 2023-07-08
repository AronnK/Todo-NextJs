'use client'
import React from 'react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const TodoApp: React.FC = () => {
  const [todos, setTodos] = React.useState<Todo[]>([]);
  const [input, setInput] = React.useState<string>('');

  const addTodo = () => {
    if (input.trim() !== '') {
      const newTodo: Todo = {
        id: Date.now(),
        text: input,
        completed: false,
      };
      setTodos((prevTodos) => [...prevTodos, newTodo]);
      setInput('');
    }
  };

  const toggleTodo = (id: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-4 bg-gray-800">
      <div className="max-w-md w-full">
        <h1 className="text-3xl font-bold mb-6">Todo App</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addTodo();
          }}
        >
          <div className="flex mb-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Add a new todo"
              className="border border-gray-600 rounded px-4 py-2 w-full mr-2"
            />
            <button
              type="submit"
              className="bg-blue-450 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Add Todo
            </button>
          </div>
        </form>
        <ul className="space-y-2">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className={`flex items-center justify-between py-2 px-4 rounded border  ${
                todo.completed ? 'line-through bg-gray-100' : 'bg-white'
              }`}
              onClick={() => toggleTodo(todo.id)}
            >
              <span>{todo.text}</span>
              <input type='checkbox' className='cursor pointer peer-checked:line-through peer-checked:text-slate-500'  />
              <button
                onClick={() => deleteTodo(todo.id)}
                className="text-red-500 hover:text-red-600 font-bold"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};


export default (TodoApp);
