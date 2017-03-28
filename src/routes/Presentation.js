import React from 'react';
import { connect } from 'dva';
import PresentationList from '../components/PresentationList.js';
import CreateFrom from '../components/CreateFrom.js';
import { Layout, Menu, Breadcrumb, Icon, Button,Modal ,Input,Table,Upload,message,Tabs,Row,Col,InputNumber} from 'antd';

function Presentation({ dispatch, presentation }) {
	console.log(presentation)
	
	const TextEditModal = (
        <CreateFrom visible={presentation.createing} 
        	onOk={(data)=>{dispatch({type: 'presentation/go_create',payload:{id:-1,...data}})}} 
        	onCancel={()=>{dispatch({type: 'presentation/end_create'})}}
       		/>
	);
	
	return(
		<div>
			<Button onClick={()=>{dispatch({type: 'presentation/create'})}}>创建</Button>
			<PresentationList onEdit={(record)=>{ dispatch({type: 'presentation/edit',payload:{id:record.ID}}) }}  onShow={(record)=>{ dispatch({type: 'presentation/show',payload:{id:record.ID}}) }}/>
			{TextEditModal}
		</div>
	);
	
}

export default connect(({ presentation }) => ({ presentation }))(Presentation);