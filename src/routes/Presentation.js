import React from 'react';
import { connect } from 'dva';
import PresentationList from '../components/PresentationList.js';
import { Layout, Menu, Breadcrumb, Icon, Button,Modal ,Input,Table,Upload,message,Tabs,Row,Col,InputNumber} from 'antd';

function Presentation({ dispatch, presentation }) {
	console.log(presentation)
	
	const TextEditModal = (
		<Modal title="新建展现" visible={presentation.createing} 
		onOk={()=>{dispatch({type: 'presentation/go_create',payload:{id:-1,width:presentation.width,height:presentation.height}})}} 
		onCancel={()=>{dispatch({type: 'presentation/end_create'})}}>
            <Row >
		      <Col span={6}>
		      	宽度
		      </Col>
		      <Col span={18}>
		      	<InputNumber min={0} max={10000} step={1} defaultValue={presentation.width} onChange={(value)=>{ dispatch({type: 'presentation/set_width',width:value}) }} />
		      </Col>
		    </Row>
		    <Row >
		      <Col span={6}>
		      	 高度
		      </Col>
		      <Col span={18}>
		      	<InputNumber min={0} max={10000} step={1} defaultValue={presentation.height} onChange={(value)=>{ dispatch({type: 'presentation/set_height',width:value}) }} />
		      </Col>
		    </Row>
        </Modal>
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