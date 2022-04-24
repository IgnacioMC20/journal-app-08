import React from 'react';
import { createRoot } from 'react-dom/client';

// import { Pokeapi } from './pokeapi/Pokeapi';
import './styles/styles.scss';

import { store } from './app/store';
import { Provider } from 'react-redux';
import { JournalApp } from './JournalApp';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
<Provider store={store}> 
      <JournalApp />
</Provider>
);
