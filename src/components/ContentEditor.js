import styles from './ContentEditor.css';
import EditableShape from "./EditableShape.js"
import siteconfig from "../utils/siteconfig.js"
import ShapeRender from "../utils/ShapeRender.js"
class ContentEditor extends React.Component {

	renderContent = (shape) => {
		return ShapeRender.render(shape);
	}

	render() {
		const { size, page, selected_shape, onSelectShape, onEditShape,onPropertyChange } = this.props;

		if(!page) {
			return(
				<div className={styles.page_warpper} style={size}>
				    <h3 style={{textAlign:"center",fontSize:24}}>请选择页面编辑</h3>
				</div>
			);
		}

		const that = this;
		const shapeElements = page.shapes.map(function(shape, i) {

			return(
				<EditableShape key={i} shape={shape} active={shape.guid==selected_shape}
					onClick={()=>{onSelectShape(shape)}}
					onPropertyChange={(propertys)=>{onPropertyChange(propertys)}}
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