import { Modal, Button, Icon, Switch } from 'antd';
import PageItem from "./PageItem.js"
import styles from './PageList.css';

class PageList extends React.Component {
	render() {
		const { selected_page,pagelist, onNewPage,onSelectPage } = this.props;
		return(
			<div className={styles.page_list}>
			  {
			  	pagelist.map((page,index)=>{
				  	return (<PageItem key={index} onClick={()=>{onSelectPage(page)}}  page={page} active={(selected_page==page.guid)} num={index+1}/>)
			  	})
			  }			  
			  <div className={styles.page_item} onClick={onNewPage}><Icon type="plus" className={styles.page_button_add} /></div>
			</div>
		);
	}
}

export default PageList;