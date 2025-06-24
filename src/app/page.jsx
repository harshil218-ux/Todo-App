"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaTrash, FaCheck } from "react-icons/fa";

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const newTodo = {
      id: Date.now(),
      text: input,
      completed: false,
    };
    setTodos([...todos, newTodo]);
    setInput("");
  };

  const handleToggle = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center p-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-indigo-600 mb-6">
          Todo App
        </h1>
        <form onSubmit={handleAddTodo} className="flex gap-2 mb-6">
          <input
            type="text"
            placeholder="Add a new task..."
            className="flex-1 p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            type="submit"
            className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition"
          >
            Add
          </button>
        </form>
        <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
          {todos.length === 0 && (
            <p className="text-center text-gray-400">No tasks added yet.</p>
          )}
          {todos.map((todo) => (
            <motion.div
              key={todo.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex items-center justify-between p-3 rounded-lg shadow-md ${
                todo.completed ? "bg-green-100" : "bg-gray-100"
              }`}
            >
              <span
                className={`flex-1 ${
                  todo.completed ? "line-through text-gray-500" : ""
                }`}
              >
                {todo.text}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => handleToggle(todo.id)}
                  className="text-green-600 hover:text-green-800"
                >
                  <FaCheck />
                </button>
                <button
                  onClick={() => handleDelete(todo.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <FaTrash />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TodoApp;
