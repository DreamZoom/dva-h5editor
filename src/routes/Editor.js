import React from 'react';
import { connect } from 'dva';
import styles from './Editor.css';
import PageList from '../components/PageList.js';

import { Layout, Menu, Breadcrumb,Icon  } from 'antd';
const { Header, Content, Footer ,Sider } = Layout;

function Editor({ dispatch, h5 }) {
	
	return(
		<Layout className={styles.page_editor}>
		    <Header>
		      <div className="logo" />
		      <Menu theme="dark" mode="horizontal" style={{ lineHeight: '64px' }}>
		        <Menu.Item key="1">nav 1</Menu.Item>
		        <Menu.Item key="2">nav 2</Menu.Item>
		        <Menu.Item key="3">nav 3</Menu.Item>
		      </Menu>
		    </Header>
		    
		    <Layout>
		      <Sider className={styles.page_slider}>
		        <PageList pagelist={h5.pages} selected_page={h5.selected_page} onNewPage={()=>{dispatch({type: 'h5/addNewPage'})}} onSelectPage={(page)=>{dispatch({type: 'h5/selectPage',page:page})}}></PageList>
		      </Sider>
		      <Layout >		        
		        <Content className={styles.page_content}>
		          Content
		        </Content>
		      </Layout>
		    </Layout>
		</Layout>
		
	);
}

Editor.propTypes = {};

export default connect(({ h5 }) => ({ h5 }))(Editor);