import styles from './ContentEditor.css';
import EditableShape from "./EditableShape.js"
class ContentEditor extends React.Component {

	render() {
		const { size,page,selected_shape,onSelectShape,onEditShape} = this.props;
		
		if(!page){
			return(					
				<div className={styles.document_warpper} style={size}>
				    <h3 style={{textAlign:"center",marginTop:"50%"}}>请选择页面编辑</h3>
				</div>	
			);
		}
		
		
        const that = this;
		const shapeElements = page.shapes.map(function(shape,i){
			return(	
				<EditableShape key={i} shape={shape} active={shape.guid==selected_shape} 
					onClick={()=>{onSelectShape(shape)}}
					onEditContent={()=>{onEditShape(shape)}}
					>
				  <div className={styles.shape_content}>{shape.resource}</div>
				</EditableShape>
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