import { types } from "../type/types";
import { db } from "../firebase/firebase-config";
import { loadNotes } from "../helpers/loadNotes";
import Swal from "sweetalert2";
import { fileUpload } from "../helpers/fileUpload";


export const startNewNote = () => {
  
    return async( dispatch, getState ) => {
      const { uuid } = getState().auth;
      const newNote = {
        title: '',
        body: '',
        date: new Date().getTime(),
      }   

      const doc = await db.collection(`${ uuid }/journal/notes`).add(newNote);
      dispatch( activeNote( doc.id, newNote ) );
      dispatch( addNewNote(doc.id, newNote) );
    }
}

export const addNewNote = (id, note) => ({
  type: types.notesAddNew,
  payload: {
    id,
    ...note
  }
});

export const activeNote = ( id, note ) => ({
  type: types.notesActive,
  payload: {
      id,
      ...note
  }
});

export const setNotes = (notes) => ({
  type: types.notesLoad,
  payload: notes
});

export const startLoadingNotes = ( uid ) => {
  return async(dispatch) => {
    const notes = await loadNotes(uid);
    dispatch( setNotes(notes) );

    
  }
}

export const startSaveNote = (note) => {
  return async(dispatch, getState) => {
    const { uuid } = getState().auth;
    if(!note.url) {delete note.url};

    const noteToFirestore = {...note};
    delete noteToFirestore.id;
    await db.doc(`${ uuid }/journal/notes/${ note.id }`).update(noteToFirestore);

    dispatch( refreshNote(note.id, note) );

    Swal.fire('Saved', 'Your note was saved successfully', 'success');
  }
}



export const refreshNote = (id, note) => ({
  type: types.notesUpdated,
  payload: {
    id, 
    note: {
      id, 
      ...note
    }
  }
})

export const startUploadingImage = (file) => {

  return async(dispatch, getState) => {

    const { active: activeNote } = getState().notes;

    Swal.fire({
      title: 'Uploading...',
      text: 'Please wait...',
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      }
    })

    const fileUrl = await fileUpload(file);
    // console.log(fileUrl);
    activeNote.url = fileUrl;
    dispatch(startSaveNote(activeNote));

    Swal.close();

    // const { uuid } = getState().auth;
    // const fileName = file.name;
    // const filePath = `${ uuid }/journal/images/${ fileName }`;
    // const ref = await db.ref(filePath);
    // const task = await ref.put(file);
    // const url = await task.ref.getDownloadURL();
    // return url;
  }
}

export const startDeletingNote = (id) => {
  return async(dispatch, getState) => {
    const { uuid } = getState().auth;
    await db.doc(`${ uuid }/journal/notes/${ id }`).delete();

    dispatch( deleteNote(id) );
  }
}

export const deleteNote = (id) => ({
  type: types.notesDelete,
  payload: id
})

export const noteLogout = () => ({
  type: types.notesLogoutCleaning
})

