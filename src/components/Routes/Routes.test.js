import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import storeUtil from '../../utils/test/storeUtil';
import Routes from './Routes';

it('renders Routes without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Provider store={storeUtil}><Routes /></Provider>, div);
  ReactDOM.unmountComponentAtNode(div);
});

