"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import addData from "@/firebase/firestore/addData";
import { useAuthContext } from "@/context/AuthContext";

function InsertData() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [sourceCodeLink, setSourceCodeLink] = useState("");
  const [tags, setTags] = useState([]);

  const { user } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (user == null) router.push("/");
  }, [user, router]);

  const handleAddProject = async (event) => {
    event.preventDefault();
    const result = await addData(
      "projects",
      name,
      description,
      image,
      sourceCodeLink,
      tags
    );
    if (result.error) {
      console.error(result.error);
    } else {
      console.log("Project added successfully!");
      router.push("/admin");
    }
  };

  const handleRemoveTag = () => {
    if (tags.length > 0) {
      const updatedTags = [...tags];
      updatedTags.pop(); // Remove the last tag
      setTags(updatedTags);
    }
  };

  if (user) {
    return (
      <div className="container mx-auto mt-8 p-4">
        <div className="mx-auto bg-white rounded p-6 flex flex-wrap justify-center">
          <h1 className="w-full text-2xl font-bold mb-6 text-center">
            Input Data
          </h1>
          <div className="w-full flex flex-wrap justify-center">
            <div className="w-full md:w-1/2 xl:w-1/3 ">
              <input
                type="name"
                id="name"
                name="name"
                className="my-1 shadow-sm bg-gray-50 border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Project Name"
                onChange={(e) => setName(e.target.value)}
              />

              <input
                type="description"
                id="description"
                name="description"
                className="my-1 shadow-sm bg-gray-50 border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Description"
                onChange={(e) => setDescription(e.target.value)}
              />

              <input
                type="ImageURL"
                id="ImageURL"
                name="ImageURL"
                className="my-1 shadow-sm bg-gray-50 border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Image URL"
                onChange={(e) => setImage(e.target.value)}
              />

              <input
                type="sourceCodeLink"
                id="sourceCodeLink"
                name="sourceCodeLink"
                className="my-1 shadow-sm bg-gray-50 border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Source Code Link"
                onChange={(e) => setSourceCodeLink(e.target.value)}
              />
            </div>

            <div className="w-full md:w-1/2 xl:w-1/3">
              <div className="mt-1">
                <button
                  onClick={() => setTags([...tags, { name: "", color: "" }])}
                  className="w-1/2 bg-blue-300 text-white rounded-xl
                  py-2 px-4 hover:bg-blue-500 focus:outline-none focus:ring-2
                  focus:ring-blue-500"
                >
                  Add Tag
                </button>
                <button
                  onClick={handleRemoveTag}
                  className="w-1/2 bg-red-300 text-white rounded-xl
                      py-2 px-4 hover:bg-red-500 focus:outline-none focus:ring-2
                      focus:ring-red-500"
                >
                  Remove Tag
                </button>

                {tags.map((tag, index) => (
                  <div key={index} className="flex mt-2">
                    <input
                      className="shadow-sm bg-gray-50 border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Tag name"
                      value={tag.name}
                      onChange={(e) => {
                        const updatedTags = [...tags];
                        updatedTags[index] = { ...tag, name: e.target.value };
                        setTags(updatedTags);
                      }}
                    />
                    <input
                      className="shadow-sm bg-gray-50 border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Tag color"
                      value={tag.color}
                      onChange={(e) => {
                        const updatedTags = [...tags];
                        updatedTags[index] = { ...tag, color: e.target.value };
                        setTags(updatedTags);
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <button
            className="w-full xl:w-8/12 bg-gray-600 text-white rounded-xl py-2 px-4 mt-5 hover:bg-gray-700"
            onClick={handleAddProject}
          >
            Submit
          </button>
        </div>
      </div>
    );
  }
}

export default InsertData;
