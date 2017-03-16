import { Modal, Button, Icon, Switch } from 'antd';
import styles from './PageList.css';
class PageList extends React.Component {

	render() {
		const { page,num,active } = this.props;
		return(
			<div className={styles.page_item} onClick={this.props.onClick}>
			  <span className={`${styles.page_item_num} ${active?styles.page_item_num_active:""}`}><span className={styles.page_item_num_em}>{num}</span></span>
			  <span className={styles.page_item_title}>{page.title}</span>
			</div>
		);
	}
}

export default PageList;