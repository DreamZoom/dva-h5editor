import { Modal, Button, Icon, Switch } from 'antd';
import styles from './PageItem.css';
class PageList extends React.Component {

	render() {
		const { page } = this.props;
		return(
			<div className={styles.page_item}>
			  {page.title}
			</div>
		);
	}
}

export default PageList;