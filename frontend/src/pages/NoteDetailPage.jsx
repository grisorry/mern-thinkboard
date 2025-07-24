import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router';
import api from '../lib/axios';
import toast from 'react-hot-toast';
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from 'lucide-react';

const NoteDetailPage = () => {

  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const navigate = useNavigate();

  const {id} = useParams()


  useEffect(() => {
    const fetchNote = async () => {
      try {
        
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);

      } catch (error) {
        toast.error("Failed to fetch notes", error);
        
      } finally{
        setLoading(false);
      }
    }

    fetchNote();
  }, [id]);
  
  
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note successfully deleted.");
      navigate('/');
    } catch (error) {
      toast.error("Failed to delete note.", error);
    }
  }

  const handleSave = async () => {
    if (!note.title.trim() || !note.content.trim()){
      toast.error("Please add a title or content.");
      return;
    }

    setSaving(true);

    try {
      await api.put(`/notes/${id}`, note)
      toast.success("Note updated successfully");
    } catch (error) {
      toast.error("Error saving the note", error);
    } finally{
      setSaving(false)
    }
  }

  if (loading){
    return (
      <div className='min-h-screen bg-base-200 flex items-center justify-center'>
        <LoaderIcon className='animate-spin size-10' />
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-base-200'>
      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-2xl mx-auto'>
          <div className='flex items-center justify-between mb-6'>
            <Link to="/" className='btn btn-ghost'>
            <ArrowLeftIcon/>
            Back to notes
            </Link>
            <button className='btn btn-error btn-outline' onClick={handleDelete}><Trash2Icon className='h-5 w-5'/>Delete note</button>
          </div>
          <div className="card bg-base-100">
            <div className="card-body">
              <fieldset className="fieldset mb-4">
                <label className="label">
                  <span className='label-text'>Title</span>
                </label>
                <input type='text' placeholder='Note title' className='input w-full' value={note.title} onChange={(e) => setNote({... note, title:e.target.value})}>
                </input>
                <label className="label">
                  <span className='label-text'>Content</span>
                </label>
                <textarea placeholder='Write your note here...' className='textarea h-32 w-full' value={note.content} onChange={(e) => setNote({... note, content:e.target.value})}></textarea>
              </fieldset>
              <div className="card-actions justify-end">
                <button className='btn btn-primary' disabled={saving} onClick={handleSave}> 
                  {saving ? "Saving ..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NoteDetailPage