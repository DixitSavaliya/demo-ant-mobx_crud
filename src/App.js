import React from 'react';
import {inject, observer} from 'mobx-react';
import RouterList from './router';

const App = inject("store")(observer(({store, otherProp}) => {
  return (
    <div className="App">
      <RouterList/>
    </div>
  );
}));

export default App;
