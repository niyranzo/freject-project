"use client";

import { useEffect, useState, } from "react";

import { createTask, getTasksByProject, updateTask, } from "@/lib/api/tasks";

interface Props {
  projectId: number;
}

export default function TasksSection({
  projectId,
}: Props) {

  const [tasks, setTasks] = useState<any[]>([]);
  const [newTask, setNewTask] = useState("");
  const [loading, setLoading] = useState(true);

  // FETCH TASKS
  useEffect(() => {
    const fetchTasks = async () => {
        try {
            const data =await getTasksByProject(projectId);
            setTasks(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
        };
        fetchTasks();
    }, [projectId]);

  // CREATE TASK
  const handleAddTask =
    async () => {if (!newTask.trim()) return;
      try {
        const createdTask =
          await createTask({
            title: newTask,
            id_project:
              projectId,
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

  // TOGGLE TASK
  const toggleTask =
    async (task: any) => {
      try {
        const newStatus =
          task.status ===
          "completed"
            ? "to_do"
            : "completed";

        await updateTask(
          task.id,
          {
            status: newStatus,
          }
        );

        setTasks(

          tasks.map((t) =>

            t.id === task.id
              ? {
                  ...t,
                  status:
                    newStatus,
                }
              : t
          )
        );

      } catch (error) {

        console.error(error);

      }
    };

  return (

    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 min-h-[500px]">

      {/* HEADER */}
      <div className="flex items-center justify-between">

        <h2 className="text-lg font-semibold text-slate-800">
          To-do
        </h2>

        <span className="text-sm text-slate-400">
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
            setNewTask(
              e.target.value
            )
          }
          className="flex-1 px-4 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
        />

        <button
          onClick={handleAddTask}
          className="px-4 py-2 bg-violet-600 text-white rounded-xl text-sm hover:bg-violet-700 transition"
        >
          +
        </button>

      </div>

      {/* TASKS */}
      <div className="mt-6 space-y-3">

        {loading ? (

          <p className="text-sm text-slate-400">
            Cargando tareas...
          </p>

        ) : tasks.length === 0 ? (

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">

            <p className="font-medium text-slate-700">
              No hay tareas todavía
            </p>

            <p className="text-sm text-slate-400 mt-1">
              Añade tu primera tarea
            </p>

          </div>

        ) : (

          tasks.map((task) => (

            <div
              key={task.id}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition"
            >

              {/* CHECKBOX */}
              <button
                onClick={() =>
                  toggleTask(
                    task
                  )
                }
                className={`w-5 h-5 rounded border flex items-center justify-center transition

                  ${
                    task.status ===
                    "completed"
                      ? "bg-violet-600 border-violet-600 text-white"
                      : "border-slate-300 bg-white"
                  }
                `}
              >

                {task.status ===
                  "completed" && "✓"}

              </button>

              {/* TITLE */}
              <p
                className={`text-sm transition

                  ${
                    task.status ===
                    "completed"
                      ? "line-through text-slate-400"
                      : "text-slate-700"
                  }
                `}
              >
                {task.title}
              </p>

            </div>

          ))

        )}

      </div>

    </div>

  );
}