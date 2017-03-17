import React from 'react';
import { connect } from 'dva';
import styles from './Editor.css';
import PageList from '../components/PageList.js';
import ContentEditor from '../components/ContentEditor.js';
import { Layout, Menu, Breadcrumb, Icon, Button } from 'antd';
const { Header, Content, Footer, Sider } = Layout;

function Editor({ dispatch, h5 }) {

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
			              <ContentEditor page={h5.selected_page_model}  size={h5.config.size}></ContentEditor>
			            </div>
		            </div>
		        </Content>
		      </Layout>
		    </Layout>
		</Layout>

	);
}

Editor.propTypes = {};

export default connect(({ h5 }) => ({ h5 }))(Editor);