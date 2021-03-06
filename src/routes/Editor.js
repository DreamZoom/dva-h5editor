import React from 'react';
import { connect } from 'dva';
import styles from './Editor.css';
import PageList from '../components/PageList.js';
import ContentEditor from '../components/ContentEditor.js';
import ResourceList from '../components/ResourceList.js';
import PropertyGrid from '../components/PropertyGrid.js';
import AnimationList from '../components/AnimationList.js';
import ResponsiveWarpper from '../components/ResponsiveWarpper.js';

import ChartEditor from '../components/ChartEditor.js';

import { Layout, Menu, Breadcrumb, Icon, Button, Modal, Input, Table, Upload, message, Tabs } from 'antd';
const TabPane = Tabs.TabPane;
const { Header, Content, Footer, Sider } = Layout;

function Editor({ dispatch, h5, location }) {
	
   let selected_pages = h5.pages.filter(function(page){return page.guid==h5.selected_page});
   let selected_page_model = selected_pages.length==0?null:selected_pages[0];
   
  
   let selected_shape_model = null;
   if(selected_pages.length!=0){
   	 	let selected_shapes = selected_page_model.shapes.filter(function(shape){return shape.guid==h5.selected_shape});
   	 	selected_shape_model =selected_shapes.length==0?null:selected_shapes[0];
   }

	const TextEditModal = (
		<Modal title="编辑内容" visible={h5.text_editor_visible} onOk={()=>{dispatch({type: 'h5/endEditShape'})}} onCancel={()=>{dispatch({type: 'h5/endEditShape'})}}>
          <Input type="textarea" placeholder="请输入内容" autosize value={selected_shape_model?selected_shape_model.resource:""} onChange={(evt)=>{dispatch({type: 'h5/updateShapeContent',resource: evt.target.value})}}/>
        </Modal>
	);

	

	const ResourcesEditModal = (
		<Modal title="编辑内容" visible={h5.resource_editor_visible} onOk={()=>{dispatch({type: 'h5/endEditShape'})}} onCancel={()=>{dispatch({type: 'h5/endEditShape'})}}>		 
          <ResourceList res_type={h5.resource_editor_type} onSelectResource={(res)=>{dispatch({type: 'h5/updateShapeContent',resource: res.ResContent});dispatch({type: 'h5/endEditShape',resource: res.ResContent})}} />
        </Modal>
	);
	
	const ChartEditModal = (
		<ChartEditor title="编辑内容" visible={h5.chart_editor_visible} onOk={(config)=>{dispatch({type: 'h5/updateShapeContent',resource: config});dispatch({type: 'h5/endEditShape'})}} onCancel={()=>{dispatch({type: 'h5/endEditShape'})}}>
        </ChartEditor>
	);

	return(
		<Layout className={styles.page_editor}>
		    <Header className={styles.editor_header}>
		      <div className={styles.logo}>Presentation编辑器</div>
		      <div className={styles.editor_right_tools}>
		      	  <Button ghost={true} onClick={()=>{dispatch({type: 'h5/savePage',payload:h5})}}>设置</Button>
		      	  <Button ghost={true} onClick={()=>{dispatch({type: 'h5/savePage',payload:h5})}}>保存</Button>
			      <Button ghost={true} onClick={()=>{dispatch({type: 'h5/goHome'})}}>退出</Button>
		      </div>
		      <div className={styles.editor_tools}>
			      <Button ghost={true} onClick={()=>{dispatch({type: 'h5/addNewShape',shape_type:"text"})}}>文本</Button>
			      <Button ghost={true} onClick={()=>{dispatch({type: 'h5/addNewShape',shape_type:"image"})}}>图片</Button>
			      <Button ghost={true} onClick={()=>{dispatch({type: 'h5/addNewShape',shape_type:"page"})}}>页面</Button>
			      <Button ghost={true} onClick={()=>{dispatch({type: 'h5/addNewShape',shape_type:"chart"})}}>图表</Button>
			      <Button ghost={true} onClick={()=>{dispatch({type: 'h5/addNewShape',shape_type:"video"})}}>视频</Button>			      
		      </div>
		      
		    </Header>
		    
		    <Layout>
		      <Sider className={styles.page_slider}>
		        <PageList pagelist={h5.pages} selected_page_guid={h5.selected_page} onNewPage={()=>{dispatch({type: 'h5/addNewPage'})}} onSelectPage={(page)=>{dispatch({type: 'h5/selectPage',page:page})}}  onSortPage={()=>{dispatch({type: 'h5/updateResource'})}}>
		        </PageList>
		      </Sider>
		      <Layout >		        
		        <Content className={styles.page_content} >
		            <ResponsiveWarpper 
		                 className={styles.document_main} 
		                 documentSize={h5.config.size}
		                 onClick={()=>{}}>
			        	 <ContentEditor 
				        	 page={selected_page_model}
				        	 selected_shape={h5.selected_shape}  
				        	 size={h5.config.size}
				        	 onSelectShape={(shape)=>{dispatch({type: 'h5/selectShape',shape:shape})}} 
				        	 onPropertyChange={(propertys)=>{dispatch({type: 'h5/updateShapePropertys',propertys:propertys})}} 
				        	 onEditShape={(shape)=>{dispatch({type: 'h5/editShape',shape:shape})}} />
			        	 
		            </ResponsiveWarpper>
		            
		        </Content>
		        {ChartEditModal}
		        {TextEditModal}
		        {ResourcesEditModal}
		      </Layout>
		      <Sider className={styles.page_slider}>
		        <Tabs defaultActiveKey="1" >
				    <TabPane tab="属性" key="1">
				    	<PropertyGrid shape={selected_shape_model} onPropertyChange={()=>{dispatch({type: 'h5/updateResource'})}} />
				    </TabPane>
				    <TabPane tab="动画" key="2">
				    	<AnimationList shape={selected_shape_model} onAnimationChange={()=>{dispatch({type: 'h5/updateResource'})}}/>
				    </TabPane>
				</Tabs>
		       	
		      </Sider>
		    </Layout>
		</Layout>

	);
}

Editor.propTypes = {};

export default connect(({ h5 }) => ({ h5 }))(Editor);