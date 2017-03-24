import React from 'react';
import { connect } from 'dva';
import PresentationList from '../components/PresentationList.js';
import { Layout, Menu, Breadcrumb, Icon, Button,Modal ,Input,Table,Upload,message,Tabs} from 'antd';

function Presentation({ dispatch, presentation }) {
	return(
		<div>
			<Button>创建</Button>
			<PresentationList onEdit={(record)=>{ dispatch({type: 'presentation/changePage',payload:{id:record.ID}}) }} />
		</div>
	);
	
}

export default connect(({ presentation }) => ({ presentation }))(Presentation);