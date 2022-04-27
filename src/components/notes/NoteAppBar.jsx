import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { startSaveNote } from '../../actions/notes';

export const NoteAppBar = () => {
  const { active } = useSelector( state => state.notes);
  const noteDate = moment(active.date);
  const dispatch = useDispatch();

  const handleSave = () => {
    console.log(active);
    dispatch( startSaveNote(active));
  }

  return (
    <div className='notes__appbar'>
         <span>{ `${noteDate.format('dddd')}  ${noteDate.format('Do')}  ${noteDate.format('MMMM')}  ${noteDate.format('YYYY')}` }</span>
        <div>
            <button className='btn'>
                Picture
            </button>
            <button className='btn' onClick={handleSave}>
                Save
            </button>
        </div>
    </div>
  )
}
