"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import TasksSection from "@/components/projects/TasksSection";
import CostsSection from "@/components/projects/CostsSection";
import RequestsSection from "@/components/projects/RequestsSection";

import { getProjectById } from "@/lib/api/projects";

interface Project {
  id: number;
  name: string;
  price: number;
  status:
    | "pending"
    | "in_progress"
    | "completed"
    | "cancelled";
  create_date: string;
}

export default function ProjectDetailsPage() {

  const params = useParams();

  const projectId = Number(params.id);

  const [project, setProject] =
    useState<Project | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const fetchProject = async () => {

      try {

        const data =
          await getProjectById(projectId);

        setProject(data);

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }
    };

    if (projectId) {

      fetchProject();

    }

  }, [projectId]);

  if (loading) {

    return (

      <main className="p-6">

        <div className="text-slate-500">
          Loading project...
        </div>

      </main>

    );
  }

  if (!project) {

    return (

      <main className="p-6">

        <div className="text-red-500">
          Project not found
        </div>

      </main>

    );
  }

  return (

    <main className="p-6 bg-[#f8f8f8] min-h-screen">

      {/* BACK BUTTON */}
      <Link
        href="/dashboard"
        className="
          inline-flex
          items-center
          gap-2
          text-sm
          text-blackback
          hover:opacity-70
          transition
          mb-6
        "
      >

        <ArrowLeft size={18} />

        Back to dashboard

      </Link>

      {/* HEADER */}
      <div
        className="
          bg-white
          border
          border-slate-200
          rounded-3xl
          p-7
          shadow-sm
          mb-8
        "
      >

        <div
          className="
            flex
            flex-col
            xl:flex-row
            xl:items-center
            xl:justify-between
            gap-6
          "
        >

          {/* LEFT */}
          <div>

            <div
              className="
                inline-flex
                items-center
                px-3
                py-1
                rounded-full
                bg-violet-100
                text-violet-700
                text-xs
                font-medium
                mb-4
                capitalize
              "
            >

              {project.status.replace("_", " ")}

            </div>

            <h1
              className="
                text-4xl
                font-bold
                text-blackback
                mb-3
              "
            >
              {project.name}
            </h1>

            <p className="text-slate-500">
              Manage tasks, requests and costs
            </p>

          </div>

          {/* RIGHT */}
          <div
            className="
              flex
              flex-wrap
              gap-4
            "
          >

            {/* PRICE */}
            <div
              className="
                bg-[#fafafa]
                border
                border-slate-200
                rounded-2xl
                px-5
                py-4
                min-w-[160px]
              "
            >

              <p className="text-xs text-slate-400 mb-1">
                Budget
              </p>

              <p className="text-2xl font-bold text-blackback">
                €{project.price}
              </p>

            </div>

            {/* STATUS */}
            <div
              className="
                bg-[#fafafa]
                border
                border-slate-200
                rounded-2xl
                px-5
                py-4
                min-w-[160px]
              "
            >

              <p className="text-xs text-slate-400 mb-1">
                Status
              </p>

              <p
                className="
                  text-sm
                  font-semibold
                  text-violet-600
                  capitalize
                "
              >
                {project.status.replace("_", " ")}
              </p>

            </div>

            {/* DATE */}
            <div
              className="
                bg-[#fafafa]
                border
                border-slate-200
                rounded-2xl
                px-5
                py-4
                min-w-[160px]
              "
            >

              <p className="text-xs text-slate-400 mb-1">
                Created
              </p>

              <p className="text-sm font-medium text-blackback">

                {new Date(
                  project.create_date
                ).toLocaleDateString()}

              </p>

            </div>

          </div>

        </div>

      </div>

      {/* CONTENT */}
      <div
        className="
          grid
          grid-cols-1
          xl:grid-cols-3
          gap-6
        "
      >

        <TasksSection
          projectId={projectId}
        />

        <CostsSection
          projectId={projectId}
        />

        <RequestsSection
          projectId={projectId}
        />

      </div>

    </main>
  );
}