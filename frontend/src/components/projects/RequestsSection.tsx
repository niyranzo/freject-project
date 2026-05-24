"use client";

import { useEffect, useState } from "react";

import { IM_Fell_French_Canon } from "next/font/google";
import { Request } from "@/interfaces/request";
import {
  createRequest,
  getRequestsByProject,
  updateRequest,
  deleteRequest,
} from "@/lib/api/requests";
import Spinner from "../ui/Spinner";

interface Props {
  projectId: number;
}

const imFell =
  IM_Fell_French_Canon({
    subsets: ["latin"],
    weight: "400",
  });

export default function RequestsSection({
  projectId,
}: Props) {

  const [requests, setRequests] =
    useState<Request[]>([]);

  const [
    newRequest,
    setNewRequest,
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

  const [loading, setLoading] =
    useState(true);

  // FETCH REQUESTS

  useEffect(() => {

    const fetchRequests =
      async () => {

        try {

          const data =
            await getRequestsByProject(
              projectId
            );

          setRequests(data);

        } catch (error) {

          console.error(error);

        } finally {

          setLoading(false);

        }
      };

    fetchRequests();

  }, [projectId]);

  // CREATE REQUEST

  const handleAddRequest =
    async () => {

      if (
        !newRequest.trim()
      ) return;

      try {

        const createdRequest =
          await createRequest({
            title:
              newRequest,
            id_project:
              projectId,
          });

        setRequests([
          ...requests,
          createdRequest,
        ]);

        setNewRequest("");

      } catch (error) {

        console.error(error);

      }
    };

  // DELETE REQUEST

  const handleDeleteRequest =
    async (id: number) => {

      try {

        await deleteRequest(id);

        setRequests(

          requests.filter(
            (request) =>
              request.id !== id
          )
        );

      } catch (error) {

        console.error(error);

      }
    };

  // START EDIT

  const handleStartEdit =
    (request: Request) => {

      setEditingId(
        request.id
      );

      setEditingTitle(
        request.title
      );
    };

  // SAVE EDIT

  const handleSaveEdit =
    async (id: number) => {

      if (
        !editingTitle.trim()
      ) return;

      try {

        await updateRequest(
          id,
          {
            title:
              editingTitle,
          }
        );

        setRequests(

          requests.map(
            (request) =>

              request.id ===
              id

                ? {
                    ...request,
                    title:
                      editingTitle,
                  }

                : request
          )
        );

        setEditingId(null);

        setEditingTitle("");

      } catch (error) {

        console.error(error);

      }
    };

  return (

    <div className="bg-lightgreen/50 h-125 rounded-2xl border border-dashed border-blackback shadow-sm p-5 flex flex-col overflow-hidden">

      {/* HEADER */}

      <div className="flex items-center justify-between">

        <h2
          className={
            imFell.className +
            " text-3xl font-semibold"
          }
        >
          Requests
        </h2>

        <span
          className={
            imFell.className +
            " flex justify-center align-middle w-9 h-9 text-3xl font-semibold border border-blackback rounded-full"
          }
        >
          {requests.length}
        </span>

      </div>

      {/* INPUT */}

      <div className="flex gap-2 mt-5">

        <input
          type="text"
          placeholder="Nueva solicitud..."
          value={newRequest}
          onChange={(e) =>
            setNewRequest(
              e.target.value
            )
          }
          onKeyDown={(e) => {

            if (
              e.key === "Enter"
            ) {

              handleAddRequest();
            }
          }}
          className="flex-1 px-4 py-2 rounded-xl border border-blackback text-sm"
        />

        <button
          onClick={
            handleAddRequest
          }
          className="px-4 py-2 bg-blackback text-white rounded-xl text-sm hover:bg-lightpink/50 hover:border hover:border-blackback hover:text-blackback transition"
        >
          +
        </button>

      </div>

      {/* REQUESTS */}

      <div className="mt-6 flex-1 min-h-0 overflow-y-auto pr-1">

        {loading ? (

          <Spinner />

        ) : requests.length ===
          0 ? (

          <div className="p-4 rounded-xl flex flex-col items-center gap-2">

            <p className="font-medium text-blackback border-b border-blackback/50 rounded-xl px-3 py-1">
              No hay solicitudes
            </p>

            <p className="text-sm text-blackback/70 mt-1">
              Todo tranquilo por
              ahora
            </p>

          </div>

        ) : (

          requests.map(
            (request) => (

              <div
                key={
                  request.id
                }
                className="flex items-center justify-between gap-3 p-3 rounded-xl hover:border hover:border-blackback/50 transition"
              >

                {/* CONTENT */}

                <div className="flex-1">

                  {editingId ===
                  request.id ? (

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
                      onBlur={() =>
                        handleSaveEdit(
                          request.id
                        )
                      }
                      onKeyDown={(
                        e
                      ) => {

                        if (
                          e.key ===
                          "Enter"
                        ) {

                          handleSaveEdit(
                            request.id
                          );
                        }
                      }}
                      autoFocus
                      className="flex-1 w-full px-3 py-2 rounded-xl border border-blackback text-sm bg-transparent"
                    />

                  ) : (

                    <p
                      onDoubleClick={() =>
                        handleStartEdit(
                          request
                        )
                      }
                      className="text-sm text-slate-700 cursor-pointer"
                    >
                      {
                        request.title
                      }
                    </p>

                  )}

                </div>

                {/* DELETE */}

                <button
                  onClick={() =>
                    handleDeleteRequest(
                      request.id
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

            )
          )

        )}

      </div>

    </div>

  );
}