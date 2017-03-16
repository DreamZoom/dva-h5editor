import React from 'react';
import { connect } from 'dva';
import styles from './Editor.css';
import PageList from '../components/PageList.js';

function Editor({ dispatch, h5 }) {
	return(
		<div className={styles.normal}> 
      <div className={styles.welcome} />
      <div className={styles.list}>
       	<PageList pagelist={h5.pages}></PageList>
      </div>
    </div>
	);
}

Editor.propTypes = {};

export default connect(({ h5 }) => ({ h5 }))(Editor);