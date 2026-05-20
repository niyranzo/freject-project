"use client";

import { useEffect, useState } from "react";

import {
  createCost,
  getCostsByProject,
  updateCost,
  deleteCost,
} from "@/lib/api/costs";

interface Props {
  projectId: number;
}

export default function CostsSection({
  projectId,
}: Props) {

  const [costs, setCosts] = useState<any[]>([]);
  const [newCostTitle, setNewCostTitle] = useState("");
  const [newCostAmount, setNewCostAmount] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingTitle, setEditingTitle] = useState("");
  const [editingAmount, setEditingAmount] = useState("");
  const [loading, setLoading] = useState(true);

  // FETCH COSTS
  useEffect(() => {

    const fetchCosts = async () => {

      try {

        const data =
          await getCostsByProject(projectId);

        setCosts(data);

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }
    };

    fetchCosts();

  }, [projectId]);

  // CREATE COST
  const handleAddCost =
    async () => {

      if (
        !newCostTitle.trim() ||
        !newCostAmount.trim()
      ) return;

      try {

        const createdCost =
          await createCost({
            title: newCostTitle,
            amount: Number(newCostAmount),
            id_project: projectId,
          });

        setCosts([
          ...costs,
          createdCost,
        ]);

        setNewCostTitle("");
        setNewCostAmount("");

      } catch (error) {

        console.error(error);

      }
    };

  // DELETE COST
  const handleDeleteCost =
    async (id: number) => {

      try {

        await deleteCost(id);

        setCosts(

          costs.filter(
            (cost) =>
              cost.id !== id
          )
        );

      } catch (error) {

        console.error(error);

      }
    };

  // START EDIT
  const handleStartEdit =
    (cost: any) => {

      setEditingId(cost.id);

      setEditingTitle(cost.title);

      setEditingAmount(
        cost.amount
      );

    };

  // SAVE EDIT
  const handleSaveEdit =
    async (id: number) => {

      if (
        !editingTitle.trim() ||
        !editingAmount
      ) return;

      try {

        await updateCost(id, {
          title: editingTitle,
          amount: Number(editingAmount),
        });

        setCosts(

          costs.map((cost) =>

            cost.id === id
              ? {
                  ...cost,
                  title: editingTitle,
                  amount: editingAmount,
                }
              : cost
          )
        );

        setEditingId(null);

        setEditingTitle("");

        setEditingAmount("");

      } catch (error) {

        console.error(error);

      }
    };

  // TOTAL
  const totalCosts =
    costs.reduce(
      (acc, cost) =>
        acc + Number(cost.amount),
      0
    );

  return (

    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 min-h-[500px]">

      {/* HEADER */}
      <div className="flex items-center justify-between">

        <div>

          <h2 className="text-lg font-semibold text-slate-800">
            Costos
          </h2>

          <p className="text-sm text-slate-400 mt-1">
            Total: €{totalCosts.toFixed(2)}
          </p>

        </div>

        <span className="text-sm text-slate-400">
          {costs.length}
        </span>

      </div>

      {/* INPUTS */}
      <div className="flex gap-2 mt-5">

        <input
          type="text"
          placeholder="Concepto..."
          value={newCostTitle}
          onChange={(e) =>
            setNewCostTitle(
              e.target.value
            )
          }
          className="flex-1 px-4 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
        />

        <input
          type="number"
          placeholder="€"
          value={newCostAmount}
          onChange={(e) =>
            setNewCostAmount(
              e.target.value
            )
          }
          className="w-28 px-4 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
        />

        <button
          onClick={handleAddCost}
          className="px-4 py-2 bg-violet-600 text-white rounded-xl text-sm hover:bg-violet-700 transition"
        >
          +
        </button>

      </div>

      {/* COSTS */}
      <div className="mt-6 space-y-3">

        {loading ? (

          <p className="text-sm text-slate-400">
            Cargando costos...
          </p>

        ) : costs.length === 0 ? (

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">

            <p className="font-medium text-slate-700">
              No hay costos
            </p>

            <p className="text-sm text-slate-400 mt-1">
              Excelente margen por ahora
            </p>

          </div>

        ) : (

          costs.map((cost) => (

            <div
              key={cost.id}
              className="flex items-center justify-between gap-3 p-3 rounded-xl hover:bg-slate-50 transition"
            >

              {/* CONTENT */}
              <div className="flex-1">

                {editingId === cost.id ? (

                  <div className="flex gap-2">

                    <input
                      type="text"
                      value={editingTitle}
                      onChange={(e) =>
                        setEditingTitle(
                          e.target.value
                        )
                      }
                      className="flex-1 px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                    />

                    <input
                      type="number"
                      value={editingAmount}
                      onChange={(e) =>
                        setEditingAmount(
                          e.target.value
                        )
                      }
                      className="w-28 px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                    />

                  </div>

                ) : (

                  <div className="flex items-center justify-between">

                    <p className="text-sm text-slate-700">
                      {cost.title}
                    </p>

                    <p className="text-sm font-medium text-red-500">
                      - €{Number(cost.amount).toFixed(2)}
                    </p>

                  </div>

                )}

              </div>

              {/* ACTIONS */}
              <div className="flex items-center gap-3">

                {editingId === cost.id ? (

                  <button
                    onClick={() =>
                      handleSaveEdit(
                        cost.id
                      )
                    }
                    className="text-sm text-green-600 hover:underline"
                  >
                    Guardar
                  </button>

                ) : (

                  <button
                    onClick={() =>
                      handleStartEdit(
                        cost
                      )
                    }
                    className="text-sm text-violet-600 hover:underline"
                  >
                    Editar
                  </button>

                )}

                <button
                  onClick={() =>
                    handleDeleteCost(
                      cost.id
                    )
                  }
                  className="text-sm text-red-500 hover:underline"
                >
                  Eliminar
                </button>

              </div>

            </div>

          ))

        )}

      </div>

    </div>

  );
}