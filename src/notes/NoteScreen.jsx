import React from 'react'
import { NoteAppBar } from './NoteAppBar'

export const NoteScreen = () => {
  return (
    <div className='notes__main-content'>
        <NoteAppBar />

        <div className="notes__content">
            <input type="text" placeholder='Some awesome title' className='notes__title-input' autoComplete='off' />
            <textarea placeholder='What happened today?' className='notes__textarea'></textarea>
            <div className="notes__image">
                <img src="https://c4.wallpaperflare.com/wallpaper/566/278/519/digital-digital-art-artwork-fantasy-art-futuristic-hd-wallpaper-preview.jpg" alt="imagen" />
            </div>
        </div>

    </div>
  )
}
