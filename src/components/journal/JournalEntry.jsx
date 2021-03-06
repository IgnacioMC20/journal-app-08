import React from 'react'
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { activeNote } from "../../actions/notes";

export const JournalEntry = ({entry}) => {
    const {id, title, body, date, url} = entry;

    const dispatch = useDispatch();

    const noteDate = moment(date);

    const handleEntryClick = () => {
        dispatch( activeNote(id, entry) );
      }
    
    return (
        <div className='journal__entry' onClick={() => {
          handleEntryClick(id);
        }}>
            {
                url && <div className="journal__entry-picture" style={ {backgroundSize: 'cover', backgroundImage: `url(${url})`} }></div>
            }
            <div className="journal__entry-body">
                <p className="journal__entry-title">
                    { title }
                </p>
                <p className="journal__entry-content">
                    { body }
                </p>
            </div>
            <div className="journal__entry-date-box">
                <span>{ noteDate.format('dddd') }</span>
                <h4>{ noteDate.format('Do') }</h4>
                {/* {date} */}
            </div>
        </div>
    )
}
