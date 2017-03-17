import { Modal, Button, Icon, Switch } from 'antd';
import styles from './ContentEditor.css';
class EditableShape extends React.Component {
    
    state={
    	propertys:this.props.shape.propertys,
    	postion:{x:0,y:0}
    }
    onMouseDown=(e)=>{
    	
    	const that = this;
    	const onMouseMove=(e)=>{
	    	const px = e.pageX-that.state.postion.x;
	    	const py = e.pageY-that.state.postion.y;
	    	
	        that.state.propertys.left=px;
	    	that.state.propertys.top=py;
	    	
	    	that.setState({
	             ...that.state
	    	});
	    }
    	const onMouseUp=(e)=>{
	    	document.removeEventListener("mousemove",onMouseMove)
	    	document.removeEventListener("mouseup",onMouseUp)
	    }
    	var event=e||window.event;
        event.preventDefault();
        
        that.state.postion.x=e.pageX - that.refs.dragElement.offsetLeft;
        that.state.postion.y=e.pageY - that.refs.dragElement.offsetTop;
        document.addEventListener("mousemove",onMouseMove);
        document.addEventListener("mouseup",onMouseUp);
    }
    
	render() {
		const { page,num,active } = this.props;
		return(	
			<div ref="dragElement" className={styles.shape} style={{...this.state.propertys}} onMouseDown={this.onMouseDown} >{this.props.children}</div>
		);
	}
}

export default EditableShape;