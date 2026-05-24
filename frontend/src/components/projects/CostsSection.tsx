"use client";

import { useEffect, useState } from "react";

import { IM_Fell_French_Canon } from "next/font/google";
import { Cost } from "@/interfaces/cost";
import {
  createCost,
  getCostsByProject,
  updateCost,
  deleteCost,
} from "@/lib/api/costs";
import Spinner from "../ui/Spinner";

interface Props {
  projectId: number;
}

const imFell =
  IM_Fell_French_Canon({
    subsets: ["latin"],
    weight: "400",
  });

export default function CostsSection({
  projectId,
}: Props) {

  const [costs, setCosts] =
    useState<Cost[]>([]);

  const [
    newCostTitle,
    setNewCostTitle,
  ] = useState("");

  const [
    newCostAmount,
    setNewCostAmount,
  ] = useState("");

  const [
    editingId,
    setEditingId,
  ] = useState<number | null>(
    null
  );

  const [
    editingTitle,
    setEditingTitle,
  ] = useState("");

  const [
    editingAmount,
    setEditingAmount,
  ] = useState("");

  const [loading, setLoading] =
    useState(true);

  // FETCH COSTS

  useEffect(() => {

    const fetchCosts =
      async () => {

        try {

          const data =
            await getCostsByProject(
              projectId
            );

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
            title:
              newCostTitle,
            amount: Number(
              newCostAmount
            ),
            id_project:
              projectId,
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
    (cost: Cost) => {

      setEditingId(cost.id);

      setEditingTitle(
        cost.title
      );

      setEditingAmount(
        String(cost.amount)
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
          title:
            editingTitle,
          amount: Number(
            editingAmount
          ),
        });

        setCosts(

          costs.map((cost) =>

            cost.id === id
              ? {
                  ...cost,
                  title:
                    editingTitle,
                  amount:
                    editingAmount,
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
        acc +
        Number(cost.amount),
      0
    );

  return (

    <div className="bg-lightpurple/50 h-125 rounded-2xl border border-dashed border-blackback shadow-sm p-5 flex flex-col overflow-hidden">

      {/* HEADER */}

      <div className="flex items-center justify-between">

        <div>

          <h2
            className={
              imFell.className +
              " text-3xl font-semibold"
            }
          >
            Costs
          </h2>

          <p className="text-sm mt-1">
            Total:
            {" "}
            <span className="text-red-500 font-bold">
              €
              {totalCosts.toFixed(
                2
              )}
            </span>
          </p>

        </div>

        <span
          className={
            imFell.className +
            " flex justify-center align-middle w-9 h-9 text-3xl font-semibold border border-blackback rounded-full"
          }
        >
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
          className="flex-1 px-4 py-2 rounded-xl border border-blackback text-sm"
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
          className="w-28 px-4 py-2 rounded-xl border border-blackback text-sm"
        />

        <button
          onClick={
            handleAddCost
          }
          className="px-4 py-2 bg-blackback text-white rounded-xl text-sm hover:bg-lightpink/50 hover:border hover:border-blackback hover:text-blackback transition"
        >
          +
        </button>

      </div>

      {/* COSTS */}

      <div className="mt-6 flex-1 min-h-0 overflow-y-auto pr-1">

        {loading ? (
          <Spinner />
        ) : costs.length ===
          0 ? (

          <div className="p-4 rounded-xl flex flex-col items-center gap-2">

            <p className="font-medium text-blackback border-b border-blackback/50 rounded-xl px-3 py-1">
              No hay costos
            </p>

            <p className="text-sm text-blackback/70 mt-1">
              Excelente margen
              por ahora
            </p>

          </div>

        ) : (

          costs.map((cost) => (

            <div
              key={cost.id}
              className="flex items-center justify-between gap-3 p-3 rounded-xl hover:border hover:border-blackback/50 transition"
            >

              {/* CONTENT */}

              <div className="flex-1">

                {editingId ===
                cost.id ? (

                  <div className="flex gap-2">

                    <input
                      type="text"
                      value={
                        editingTitle
                      }
                      onChange={(
                        e
                      ) =>
                        setEditingTitle(
                          e.target
                            .value
                        )
                      }
                      className="flex-1 px-3 py-2 rounded-xl border border-blackback text-sm bg-transparent"
                    />

                    <input
                      type="number"
                      value={
                        editingAmount
                      }
                      onChange={(
                        e
                      ) =>
                        setEditingAmount(
                          e.target
                            .value
                        )
                      }
                      className="w-28 px-3 py-2 rounded-xl border border-blackback text-sm bg-transparent"
                    />

                    <button
                      onClick={() =>
                        handleSaveEdit(
                          cost.id
                        )
                      }
                      className="text-xs px-3 py-1 rounded-lg bg-blackback text-white hover:opacity-80 transition"
                    >
                      Guardar
                    </button>

                  </div>

                ) : (

                  <div className="flex items-center justify-between">

                    <div
                      onDoubleClick={() =>
                        handleStartEdit(
                          cost
                        )
                      }
                      className="cursor-pointer"
                    >

                      <p className="text-sm text-slate-700">
                        {cost.title}
                      </p>

                    </div>

                    <p className="text-sm font-medium text-red-500">
                      - €
                      {Number(
                        cost.amount
                      ).toFixed(2)}
                    </p>

                  </div>

                )}

              </div>

              {/* DELETE */}

              <button
                onClick={() =>
                  handleDeleteCost(
                    cost.id
                  )
                }
                className="
                  w-7 h-7
                  flex items-center justify-center
                  rounded-full
                  bg-red-500
                  text-white
                  hover:scale-110
                  transition
                  text-sm
                "
              >
                ✕
              </button>

            </div>

          ))

        )}

      </div>

    </div>

  );
} 