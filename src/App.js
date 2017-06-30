import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import Rotas from './Rotas';
import reducers from './reducers';

class App extends Component {

	render(){
		return(
			<Provider store={createStore(reducers)}>
		   	<Rotas />
		  </Provider>	
		);
	}	
}

export default App;
