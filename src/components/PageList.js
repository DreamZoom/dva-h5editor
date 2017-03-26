import { Modal, Button, Icon, Switch } from 'antd';
import PageItem from "./PageItem.js"
import styles from './PageList.css';
import { sortable } from 'react-sortable';
import SortableItem from "./SortableItem.js";
const SortablePageItem = sortable(SortableItem);

import iScroll from 'iscroll';
import ReactIScroll from 'react-iscroll';

class PageList extends React.Component {

	state = {
		draggingIndex: null,
		data: this.props.pagelist
	}

	updateState = (obj) => {
		this.setState(obj);
		if(this.props.onSortPage){
			this.props.onSortPage();
		}
		
	}
	
	render() {
		const { selected_page_guid, pagelist, onNewPage, onSelectPage,onSortPage } = this.props;

		return(
			<div className={styles.page_list}>
			  {
			  	this.props.pagelist.map((page,index)=>{			  		
				  	return (
				  		<SortablePageItem 
				  		    updateState={this.updateState}
				  		    draggingIndex={this.state.draggingIndex} 
				  		    key={index} 
				  		    sortId={index} 
				  		    items={this.state.data} outline="list">
				  			<PageItem onClick={()=>{onSelectPage(page)}}  page={page} active={(selected_page_guid==page.guid)} num={index+1}/> 
				  		</SortablePageItem>
				  	)
			  	})
			  }	
			  <div className={styles.page_item} onClick={onNewPage}> <Icon type="plus" className={styles.page_button_add} /> </div>
			</div>
		);
	}
}

export default PageList;