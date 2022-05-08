import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NoteAppBar } from './NoteAppBar'
import { useForm } from '../../hooks/useForm';
import { activeNote, startDeletingNote } from "../../actions/notes";

export const NoteScreen = () => {

  const { active:note } = useSelector( state => state.notes);
  const [ formValues, handleInputChange, reset ] = useForm(note);
  const { body, title, id } = formValues;

  const dispatch = useDispatch();

  const activeId = useRef( note.id );

  useEffect(() => {
    if(note.id !== activeId.current) {
      reset(note);
      activeId.current = note.id;
    }
  }, [ note, reset ]);

  useEffect(() => {
    
    dispatch( activeNote(formValues.id, {...formValues}) );
  
    
  }, [dispatch, formValues]);
  
  const handleDelete = () => {
    console.log('delete');
    dispatch( startDeletingNote(id))
  }
  
  return (
    <div className='notes__main-content'>
        <NoteAppBar />

        <div className="notes__content">
            <input type="text" placeholder='Some awesome title' name='title' onChange={handleInputChange} value={title} className='notes__title-input' autoComplete='off' />
            <textarea placeholder='What happened today?' name='body' onChange={handleInputChange} value={body} className='notes__textarea'></textarea>
            <div className="notes__image">
                <img src={note.url || 'https://c4.wallpaperflare.com/wallpaper/566/278/519/digital-digital-art-artwork-fantasy-art-futuristic-hd-wallpaper-preview.jpg'} alt="imagen" />
            </div>
        </div>

        <button className="btn btn-danger" onClick={handleDelete}>
            Delete
        </button>

    </div>
  )
}
