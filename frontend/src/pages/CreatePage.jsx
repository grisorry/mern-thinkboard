import { ArrowLeftIcon } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
// eslint-disable-next-line no-unused-vars
import {motion} from "motion/react"
import api from "../lib/axios";

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault(); 

    if(!title.trim() || !content.trim()){
      toast.error("All field are required.")
      return;
    }

    setLoading(true);

    try {
      await api.post("/notes", {
        title,
        content
      })
      toast.success("Note created successfully.");
      navigate("/") //navigate to note details once made.
    } catch (error) {
      console.log("Error", error)

      if (error.response.status === 429){
        toast.error("Creating too many request!", {
          duration:4000})
      }else{
        toast.error("Failed to create note.")
      }

    }finally{
      setLoading(false);
    }

  };
  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center py-10">
      <div className="w-full max-w-3xl px-6">
        <Link to="/" className="btn btn-ghost flex items-center gap-2 mb-6">
          <ArrowLeftIcon className="w-5 h-5" />
          Back to Notes
        </Link>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="card bg-base-100 shadow-xl rounded-2xl overflow-hidden"
        >
          <div className="card-body space-y-6">
            <h2 className="text-3xl font-bold">Create New Note</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  name="title"
                  placeholder="Enter note title"
                  className="input input-bordered w-full"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Content</span>
                </label>
                <textarea
                  name="content"
                  placeholder="Write your note here..."
                  className="textarea textarea-bordered w-full h-40 resize-none"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className={`btn btn-primary ${loading ? 'btn-disabled btn-loading' : ''}`}
                  disabled={loading}
                >
                  {loading ? "Creating..." : "Create Note"}
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CreatePage;
