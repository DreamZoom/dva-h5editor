import styles from './ContentEditor.css';
import EditableShape from "./EditableShape.js"
import siteconfig from "../utils/siteconfig.js"

class ContentEditor extends React.Component {
	
	renderContent=(shape)=>{
		if(shape.shape_type=="text"){
			return (<div>{shape.resource}</div>)
		}
		if(shape.shape_type=="image"){
			return (<img src={siteconfig.URL(shape.resource)} />)
		}
	}

	render() {
		const { size,page,selected_shape,onSelectShape,onEditShape} = this.props;
		
		if(!page){
			return(					
				<div className={styles.page_warpper} style={size}>
				    <h3 style={{textAlign:"center",fontSize:24}}>请选择页面编辑</h3>
				</div>	
			);
		}
		
	    
		
        const that = this;
		const shapeElements = page.shapes.map(function(shape,i){
			
			return(	
				<EditableShape key={i} shape={shape} active={shape.guid==selected_shape} animation={shape.preview_animation}
					onClick={()=>{onSelectShape(shape)}}
					onEditContent={()=>{onEditShape(shape)}}>
				  <div className={styles.shape_content}>
				  	{that.renderContent(shape)}
				  </div>
				</EditableShape>
			);
		})
		
		return(	
			<div className={styles.page_warpper} style={size}>
			    {shapeElements}
			</div>		
		);
	}
}

export default ContentEditor;