import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { startSaveNote, startUploadingImage } from '../../actions/notes';

export const NoteAppBar = () => {
  const { active } = useSelector( state => state.notes);
  const noteDate = moment(active.date);
  const dispatch = useDispatch();

  const handleSave = () => {
    // console.log(active);
    dispatch( startSaveNote(active));
  }

  const handlePictureClick = () => {
    document.querySelector('#file').click();
  }

  const hanldeFileChange = (event) => {
    const file = event.target.files[0];
    if(file) {
      dispatch ( startUploadingImage(file) )
    }else{
      console.log('No file selected');
    }
  }

  return (
    <div className='notes__appbar'>
         <span>{ `${noteDate.format('dddd')}  ${noteDate.format('Do')}  ${noteDate.format('MMMM')}  ${noteDate.format('YYYY')}` }</span>
         <input type="file" id='file' name="foto" style={{ display: 'none' }} onChange={hanldeFileChange} />
        <div>
            <button className='btn' onClick={handlePictureClick} >
                Picture
            </button>
            <button className='btn' onClick={handleSave}>
                Save
            </button>
        </div>
    </div>
  )
}
