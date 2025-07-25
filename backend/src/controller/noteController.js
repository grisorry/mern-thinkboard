import Note from "../models/Note.js";

export async function getAllNotes(_,res) {
   try {
    const notes = await Note.find().sort({createdAt: -1});
    if (!notes) return res.status(404).json({message:"Notes are empty."})

    res.status(200).json(notes);
   } catch (error) {
    console.log("Error in getAllNotes controller.");
    res.status(500).json({message:"Internal server error."});
   }
};

export async function getNoteByID(req,res){
    try {
        const note = await Note.findById(req.params.id);
        if (!note) return res.status(404).json({message:"Note not found."});

        res.status(200).json(note);
    } catch (error) {
        console.log("Error in getNoteByID controller.")
        res.status(500).json({message:"Internal server error."})
    }
}

export async function createNote(req,res) {
    try {
        const {title,content} = req.body;
        const note = new Note({title, content});

        const savedNote = await note.save()
        res.status(201).json(savedNote)

    } catch (error) {
        res.status(500).json({message:"Error in createNote controller."})
        res.status(500).json({message:"Internal server error."})
    }
};  

export async function deleteNote(req,res){

    try {
        const deleteNote = await Note.findByIdAndDelete(req.params.id);
        if (!deleteNote) return res.status(404).json({message:"Note not found."});

        res.status(200).json({message:"Note deleted."})
    } catch (error) {
        res.status(500).json({message:"Error in deleteNote controller."});
        res.status(500).json({message:"Internal server error."});
    }

};

export async function updateNote(req,res){
    try {
        const {title, content} = req.body;
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, {title, content},{
            new:  true
        });
        if (!updatedNote) return res.status(404).json({message:"Note not found."});

        res.status(200).json({message:"Updated successfully."})

    } catch (error) {
        res.status(500).json({message:"Error in updateNote controller."})
        res.status(500).json({message:"Internal server error."})
    }
}