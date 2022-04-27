import { types } from "../type/types";
import { db } from "../firebase/firebase-config";
import { loadNotes } from "../helpers/loadNotes";


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
    }
}


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
  }
}

