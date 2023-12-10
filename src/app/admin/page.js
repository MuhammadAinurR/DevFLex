"use client";
import React, { useState, useEffect } from "react";
import { ComplexNavbar } from "@/component/navbar/ComplexNavbar";
import getDocument from "@/firebase/firestore/getData";
import Link from "next/link";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import deleteData from "@/firebase/firestore/deleteData";

function Admin() {
  const [projectList, setProjectList] = useState([]);
  const { user } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (user == null) router.push("/");
  }, [user, router]);

  useEffect(() => {
    async function getProjectList() {
      const { result, error } = await getDocument("projects");
      if (error) {
        console.log("error fetching", error);
      } else {
        setProjectList(result);
      }
    }
    getProjectList();
  }, []);

  const handleDelete = async (projectId) => {
    await deleteData(projectId);
    setProjectList((prevProjects) =>
      prevProjects.filter((project) => project.id !== projectId)
    );
  };

  if (user) {
    return (
      <>
        <ComplexNavbar />
        <div className="flex justify-end bg-[tomato]">
          <h1 className="me-2">Only logged in users can view this page</h1>
        </div>

        <div className="flex flex-wrap mr-2 ml-2">
          {projectList.map((project) => (
            <div
              key={project.id}
              className=" overflow-hidden w-full sm:w-1/2 md:w-1/3 xl:w-1/4"
            >
              <div className="shadow-lg border rounded-lg mx-1 my-1 h-[600px]">
                <div className="flex justify-center p-2  h-[300px]">
                  <img
                    src={project.image}
                    width={500}
                    height={500}
                    alt="Project"
                    className="object-contain h-full w-full rounded-lg bg-gray-100"
                  />
                </div>

                <div className="p-4  h-[220px] overflow-auto">
                  <h1 className="text-xl font-semibold mb-2">{project.name}</h1>
                  <p className="text-gray-700 mb-2">{project.description}</p>
                </div>
                <div className="h-50 px-4">
                  <div className="flex flex-wrap">
                    {project.tags.map((tag, index) => (
                      <span
                        key={index}
                        className={`px-1 text-md font-medium text-${tag.color}-500`}
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex justify-between items-center p-4 border-t rounded-lg">
                  <button
                    className="text-red-500 hover:text-red-900 transition duration-300"
                    onClick={() => handleDelete(project.id)}
                  >
                    Delete
                  </button>
                  <Link
                    href={project.source_code_link}
                    className="text-gray-700 hover:underline hover:text-gray-900"
                    target="_blank"
                  >
                    Source Code
                  </Link>
                  <button className="text-gray-700 hover:text-gray-900 transition duration-300">
                    View More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }
}

export default Admin;
