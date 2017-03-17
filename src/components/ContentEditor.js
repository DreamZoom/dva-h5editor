import { Modal, Button, Icon, Switch } from 'antd';
import styles from './ContentEditor.css';
class ContentEditor extends React.Component {

	render() {
		const { size,page } = this.props;
		
		if(!page){
			return(	
				<div className={styles.document_warpper} style={size}>
				    <h3 style={{textAlign:"center",marginTop:"50%"}}>请选择页面编辑</h3>
				</div>	
			);
		}

		const shapeElements = page.shapes.map(function(shape,i){
			return(				
				<div key={i}>{shape.guid}</div>
			);
		})
		
		return(	
			<div className={styles.document_warpper} style={size}>
			    {shapeElements}
			</div>		
		);
	}
}

export default ContentEditor;