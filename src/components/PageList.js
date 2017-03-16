import { Modal, Button, Icon, Switch } from 'antd';
import PageItem from "./PageItem.js"
class PageList extends React.Component {

	render() {
		const { pagelist, onSelectPage } = this.props;
		return(
			<div>
			  {pagelist.map((page,index)=>{ return (<PageItem key={index}  page={page}/>)})}
			</div>
		);
	}
}

export default PageList;