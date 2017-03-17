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
		draggingIndex:null,
		data:this.props.pagelist
	}
	
	updateState=(obj) =>  {
		console.log(obj)
	    this.setState(obj);
	}
	o={
			 mouseWheel: true,
             scrollbars: true
		}
	render() {
		const { selected_page,pagelist, onNewPage,onSelectPage } = this.props;
		
		return(
			<div className={styles.page_list}>
			  {
			  	this.state.data.map((page,index)=>{			  		
				  	return (
				  		<SortablePageItem 
				  		    updateState={this.updateState}
				  		    draggingIndex={this.state.draggingIndex} 
				  		    key={index} 
				  		    sortId={index} 
				  		    items={this.state.data} outline="list">
				  			<PageItem onClick={()=>{onSelectPage(page)}}  page={page} active={(selected_page==page.guid)} num={index+1}/> 
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