import React from 'react';
import { connect } from 'dva';
import styles from './Editor.css';
import PageList from '../components/PageList.js';
import ContentEditor from '../components/ContentEditor.js';
import ResourceList from '../components/ResourceList.js';
import { Layout, Menu, Breadcrumb, Icon, Button,Modal ,Input,Table,Upload,message} from 'antd';
const { Header, Content, Footer, Sider } = Layout;

function Editor({ dispatch, h5 }) {
	

	
	const TextEditModal=(
		<Modal title="编辑内容" visible={h5.text_editor_visible} onOk={()=>{dispatch({type: 'h5/endEditShape'})}} onCancel={()=>{dispatch({type: 'h5/endEditShape'})}}>
          <Input type="textarea" placeholder="请输入内容" autosize value={h5.selected_shape_model?h5.selected_shape_model.resource:""} onChange={(evt)=>{dispatch({type: 'h5/updateShapeContent',resource: evt.target.value})}}/>
        </Modal>
	);
	
	const upload_props = {
	  name: 'resource',
	  action: 'http://localhost:6531/resource/UploadResource?res_type=image',
	  headers: {
	    authorization: 'authorization-text',
	  },
	  onChange(info) {
	    if (info.file.status !== 'uploading') {
	      console.log(info.file, info.fileList);
	    }
	    if (info.file.status === 'done') {
	      message.success(`${info.file.name} file uploaded successfully`);
	    } else if (info.file.status === 'error') {
	      message.error(`${info.file.name} file upload failed.`);
	    }
	  },
	};

	const ResourcesEditModal=(
		<Modal title="编辑内容" visible={h5.resource_editor_visible} onOk={()=>{dispatch({type: 'h5/endEditShape'})}} onCancel={()=>{dispatch({type: 'h5/endEditShape'})}}>
          <Upload {...upload_props}>
		    <Button>
		      <Icon type="upload" /> Click to Upload
		    </Button>
		  </Upload>
          <ResourceList />
        </Modal>
	);
	

	return(
		<Layout className={styles.page_editor}>
		    <Header>
		      <div className="logo" />
		      <div className={styles.editor_tools}>
			      <Button ghost={true} onClick={()=>{dispatch({type: 'h5/addNewShape',shape_type:"text"})}}>文本</Button>
			      <Button ghost={true} onClick={()=>{dispatch({type: 'h5/addNewShape',shape_type:"image"})}}>图片</Button>
			      <Button ghost={true} onClick={()=>{dispatch({type: 'h5/addNewShape',shape_type:"page"})}}>页面</Button>
			      <Button ghost={true} onClick={()=>{dispatch({type: 'h5/addNewShape',shape_type:"video"})}}>视频</Button>
			      <Button ghost={true} onClick={()=>{dispatch({type: 'h5/addNewShape',shape_type:"music"})}}>音乐</Button>
		      </div>
		    </Header>
		    
		    <Layout>
		      <Sider className={styles.page_slider}>
		        <PageList pagelist={h5.pages} selected_page={h5.selected_page} onNewPage={()=>{dispatch({type: 'h5/addNewPage'})}} onSelectPage={(page)=>{dispatch({type: 'h5/selectPage',page:page})}}>
		        </PageList>
		      </Sider>
		      <Layout >		        
		        <Content className={styles.page_content}>
		            <div className={styles.document_main}>
			        	<div className={styles.page_main}>
			              <ContentEditor page={h5.selected_page_model} selected_shape={h5.selected_shape}  size={h5.config.size} onSelectShape={(shape)=>{dispatch({type: 'h5/selectShape',shape:shape})}} onEditShape={(shape)=>{dispatch({type: 'h5/editShape',shape:shape})}}></ContentEditor>
			            </div>
		            </div>
		            {TextEditModal}
		            {ResourcesEditModal}
		        </Content>
		      </Layout>
		    </Layout>
		</Layout>

	);
}

Editor.propTypes = {};

export default connect(({ h5 }) => ({ h5 }))(Editor);