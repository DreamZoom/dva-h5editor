import React from 'react';
import { connect } from 'dva';
import Showing from '../components/Showing.js';

function Show({ dispatch,show }) {
	return(
		<Showing data={show.data} />
	);
	
}

export default connect(({ show }) => ({ show }))(Show);