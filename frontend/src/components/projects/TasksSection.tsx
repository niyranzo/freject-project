"use client";

import { useEffect, useState } from "react";
import { IM_Fell_French_Canon } from "next/font/google";

import {
  createTask,
  getTasksByProject,
  updateTask,
  deleteTask,
} from "@/lib/api/tasks";

import { Task } from "@/interfaces/task";
import Spinner from "../ui/Spinner";

interface Props {
  projectId: number;
}

const imFell = IM_Fell_French_Canon({
  subsets: ["latin"],
  weight: "400",
});

export default function TasksSection({ projectId }: Props) {

  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const [loading, setLoading] = useState(true);

  const [editingTaskId, setEditingTaskId] =
    useState<number | null>(null);

  const [editingTitle, setEditingTitle] =
    useState("");

  useEffect(() => {

    const fetchTasks = async () => {

      try {

        const data =
          await getTasksByProject(projectId);

        setTasks(data);

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }

    };

    fetchTasks();

  }, [projectId]);

  const handleAddTask = async () => {

    if (!newTask.trim()) return;

    try {

      const createdTask =
        await createTask({
          title: newTask,
          id_project: projectId,
          status: "to_do",
        });

      setTasks([
        ...tasks,
        createdTask,
      ]);

      setNewTask("");

    } catch (error) {

      console.error(error);

    }

  };

  const toggleTask = async (task: Task) => {

    try {

      const newStatus =
        task.status === "completed"
          ? "to_do"
          : "completed";

      await updateTask(task.id, {
        status: newStatus,
      });

      setTasks(

        tasks.map((t) =>

          t.id === task.id
            ? {
                ...t,
                status: newStatus,
              }
            : t

        )

      );

    } catch (error) {

      console.error(error);

    }

  };

  const handleStartEdit = (task: Task) => {

    setEditingTaskId(task.id);

    setEditingTitle(task.title);

  };

  const handleSaveEdit = async (task: Task) => {

    try {

      const updatedTask =
        await updateTask(task.id, {
          title: editingTitle,
        });

      setTasks(

        tasks.map((t) =>
          t.id === task.id
            ? updatedTask
            : t
        )

      );

      setEditingTaskId(null);

      setEditingTitle("");

    } catch (error) {

      console.error(error);

    }

  };

  const handleDeleteTask = async (id: number) => {

    try {

      await deleteTask(id);

      setTasks(

        tasks.filter(
          (task) => task.id !== id
        )

      );

    } catch (error) {

      console.error(error);

    }

  };

  return (

    <div className="bg-lightpink/50 h-125 rounded-2xl border border-dashed border-blackback shadow-sm p-5 flex flex-col overflow-hidden">

      <div className="flex items-center justify-between">

        <h2 className={imFell.className + " text-3xl font-semibold"}>
          To-do
        </h2>

        <span
          className={
            imFell.className +
            " flex justify-center items-center w-9 h-9 text-3xl font-semibold border border-blackback rounded-full"
          }
        >
          {tasks.length}
        </span>

      </div>

      {/* INPUT */}

      <div className="flex gap-2 mt-5">

        <input
          type="text"
          placeholder="Nueva tarea..."
          value={newTask}
          onChange={(e) =>
            setNewTask(e.target.value)
          }
          className="flex-1 px-4 py-2 rounded-xl border border-blackback text-sm"
        />

        <button
          onClick={handleAddTask}
          className="px-4 py-2 bg-blackback text-white rounded-xl text-sm hover:bg-lightpink/50 hover:border hover:border-blackback hover:text-blackback transition"
        >
          +
        </button>

      </div>

      {/* TASKS */}

      <div className="mt-6 flex-1 min-h-0 overflow-y-auto pr-1">
        <div className="">

        {loading ? (

          <Spinner />

        ) : tasks.length === 0 ? (

          <div className="p-4 rounded-xl flex flex-col items-center gap-2">

            <p className="font-medium text-blackback border-b border-blackback/50 rounded-xl px-3 py-1">
              No hay tareas todavía
            </p>

            <p className="text-sm text-blackback/70 mt-1">
              Añade tu primera tarea
            </p>

          </div>

        ) : (

          tasks.map((task) => (

            <div
              key={task.id}
              className="flex items-center justify-between gap-3 p-3 rounded-xl hover:border hover:border-blackback/50 transition"
            >

              <div className="flex items-center gap-3 flex-1">

                {/* CHECKBOX */}

                <button
                  onClick={() =>
                    toggleTask(task)
                  }
                  className={`w-5 h-5 rounded border flex items-center justify-center transition ${
                    task.status === "completed"
                      ? "bg-blackback text-white"
                      : "border-blackback"
                  }`}
                >

                  {task.status === "completed" && "✓"}

                </button>

                {/* TITLE */}

                {editingTaskId === task.id ? (

                  <input
                    type="text"
                    value={editingTitle}
                    onChange={(e) =>
                      setEditingTitle(
                        e.target.value
                      )
                    }
                    onBlur={() =>
                      handleSaveEdit(task)
                    }
                    onKeyDown={(e) =>
                      e.key === "Enter" &&
                      handleSaveEdit(task)
                    }
                    autoFocus
                    className="flex-1 px-3 py-2 rounded-xl border border-blackback text-sm bg-transparent"
                  />

                ) : (

                  <div className="flex items-center justify-between flex-1 gap-2">

                    <p
                      onDoubleClick={() =>
                        handleStartEdit(task)
                      }
                      className={`text-sm transition cursor-pointer ${
                        task.status === "completed"
                          ? "line-through text-slate-400"
                          : "text-slate-700"
                      }`}
                    >
                      {task.title}
                    </p>

                    {/* MOBILE EDIT */}

                    <button
                      onClick={() => handleStartEdit(task)}
                      className="md:hidden text-slate-500"
                    >
                      <i className="fa-solid fa-pen text-xs"></i>
                    </button>

                  </div>

                )}

              </div>

              {/* ACTIONS */}

              <div className="flex items-center gap-2">

                {/* DESKTOP DELETE */}

                <button
                  onClick={() =>
                    handleDeleteTask(task.id)
                  }
                  className="w-7 h-7 flex items-center justify-center rounded-full bg-red-500
                text-white hover:scale-110 transition text-sm">
                  ✕
                </button>

                {/* MOBILE DELETE */}

                <button
                  onClick={() =>
                    handleDeleteTask(task.id)
                  }
                  className="md:hidden w-6 h-6 flex items-center justify-center text-red-500"
                >
                  <i className="fa-solid fa-xmark text-sm"></i>
                </button>

              </div>

            </div>

          ))

        )}
        </div>

      </div>

    </div>

  );

}