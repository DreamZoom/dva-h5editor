import { Modal, Button, Icon, Switch } from 'antd';
import { Resizable, ResizableBox } from 'react-resizable';
import jquery from 'jquery';
import styles from './ContentEditor.css';
import resizeableStyles from './Resizeable.css';
import animations from "../utils/animations.js"

class EditableShape extends React.Component {
    
    state={
    	propertys:this.props.shape.propertys,
    	postion:{left:0,top:0,width:0,height:0}
    }
    onMouseDown=(e)=>{
    	const that = this;
    	const onMouseMove=(e)=>{
	    	const px = e.pageX-that.state.postion.left;
	    	const py = e.pageY-that.state.postion.top;
	    	
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
        
        that.state.postion.left=e.pageX - that.refs.dragElement.offsetLeft;
        that.state.postion.top=e.pageY - that.refs.dragElement.offsetTop;
        document.addEventListener("mousemove",onMouseMove);
        document.addEventListener("mouseup",onMouseUp);
    }
    
    
    onResizeStart=(e,resizehv)=>{
    	e.preventDefault();
    	e.stopPropagation();
    	const that = this;
        const down_evt = {...e};
    	const onMouseMove=(e)=>{
	    	const px = e.pageX-down_evt.pageX;
	    	const py = e.pageY-down_evt.pageY;
	    	
	    	const resizeUp=(propertys,posi)=>{
	    		propertys.top=that.state.postion.top+posi.py;
	    		propertys.height=that.state.postion.height-posi.py;
	    	}
	    	const resizeDown=(propertys,posi)=>{
	    		propertys.height=that.state.postion.height+posi.py;
	    	}
	    	const resizeLeft=(propertys,posi)=>{
	    		propertys.left=that.state.postion.left+posi.px;
	    		propertys.width=that.state.postion.width-posi.px;
	    	}
	    	const resizeRight=(propertys,posi)=>{
	    		propertys.width=that.state.postion.width+posi.px;
	    	}
	    	switch(resizehv){
	    		case "n":
	    			resizeUp(that.state.propertys,{px:px,py:py});
	    			break;
	    		case "e":
	    			resizeRight(that.state.propertys,{px:px,py:py});
	    			break;
	    		case "s":
	    			resizeDown(that.state.propertys,{px:px,py:py});
	    			break;
	    		case "w":
	    			resizeLeft(that.state.propertys,{px:px,py:py});
	    			break;
	    		case "nw":
	    			resizeUp(that.state.propertys,{px:px,py:py});
	    			resizeLeft(that.state.propertys,{px:px,py:py});
	    			break;
	    		case "ne":
	    			resizeUp(that.state.propertys,{px:px,py:py});
	    			resizeRight(that.state.propertys,{px:px,py:py});
	    			break;
	    		case "sw":
	    			resizeDown(that.state.propertys,{px:px,py:py});
	    			resizeLeft(that.state.propertys,{px:px,py:py});
	    			break;
	    		case "se":
	    			resizeDown(that.state.propertys,{px:px,py:py});
	    			resizeRight(that.state.propertys,{px:px,py:py});
	    			break;
	    	}
	        
	    	that.setState({
	             ...that.state
	    	});
	    }
    	const onMouseUp=(e)=>{
	    	document.removeEventListener("mousemove",onMouseMove)
	    	document.removeEventListener("mouseup",onMouseUp)
	    }
    	
    	that.state.postion.left= that.refs.dragElement.offsetLeft;
		that.state.postion.top= that.refs.dragElement.offsetTop;
		that.state.postion.height= that.refs.dragElement.offsetHeight;
		that.state.postion.width= that.refs.dragElement.offsetWidth;
		
    	document.addEventListener("mousemove",onMouseMove);
        document.addEventListener("mouseup",onMouseUp);
    	
    }
    
    
    onRoateStart=(e)=>{
    	e.preventDefault();
    	e.stopPropagation();
    	const that = this;
    	const onMouseMove=(e)=>{
	    	const px = e.pageX-that.state.postion.centerX;
	    	const py = e.pageY-that.state.postion.centerY;
	    	that.state.propertys.rotate=Math.atan2(py,px) *(180.0/ Math.PI )+90;
	    	that.setState({
	             ...that.state
	    	});
	    }
    	const onMouseUp=(e)=>{
	    	document.removeEventListener("mousemove",onMouseMove)
	    	document.removeEventListener("mouseup",onMouseUp)
	    }
        that.state.postion.centerX=jquery(that.refs.dragElement).offset().left+that.refs.dragElement.offsetWidth/2;
        that.state.postion.centerY=jquery(that.refs.dragElement).offset().top+that.refs.dragElement.offsetHeight/2;
       
        document.addEventListener("mousemove",onMouseMove);
        document.addEventListener("mouseup",onMouseUp);	
    }
    
	render() {
		const { shape,num,active,onClick,onEditContent,animation } = this.props;
		const resizeHandle=(
			<div className={resizeableStyles.resizable_selected} >
				<div className={resizeableStyles.rotate_circle} onMouseDown={this.onRoateStart}></div>
				<div className={resizeableStyles.rotate_line}></div>
				
				<div className={resizeableStyles.line+" "+resizeableStyles.line_n} onMouseDown={(e)=>{this.onResizeStart(e,"n")}}>
					<div className={resizeableStyles.circle}></div>
				</div>
				<div className={resizeableStyles.line+" "+resizeableStyles.line_e} onMouseDown={(e)=>{this.onResizeStart(e,"e")}}>
					<div className={resizeableStyles.circle}></div>
				</div>
				<div className={resizeableStyles.line+" "+resizeableStyles.line_s} onMouseDown={(e)=>{this.onResizeStart(e,"s")}}>
					<div className={resizeableStyles.circle}></div>
				</div>
				<div className={resizeableStyles.line+" "+resizeableStyles.line_w} onMouseDown={(e)=>{this.onResizeStart(e,"w")}}>
					<div className={resizeableStyles.circle}></div>
				</div>
				<div className={resizeableStyles.circle_nw +" "+resizeableStyles.circle} onMouseDown={(e)=>{this.onResizeStart(e,"nw")}}></div>
				<div className={resizeableStyles.circle_ne +" "+resizeableStyles.circle} onMouseDown={(e)=>{this.onResizeStart(e,"ne")}}></div>
				<div className={resizeableStyles.circle_se +" "+resizeableStyles.circle} onMouseDown={(e)=>{this.onResizeStart(e,"se")}}></div>
				<div className={resizeableStyles.circle_sw +" "+resizeableStyles.circle} onMouseDown={(e)=>{this.onResizeStart(e,"sw")}}></div>
			</div>
		);
		
		const {rotate}=this.state.propertys;
		const animation_style = {"animation":animation};
		const custom_styles ={transform:"rotateZ("+rotate+"deg)",...this.state.propertys}
		
		return(	
			<div ref="dragElement" className={"shape "+styles.shape+(active?" selected":"")} style={custom_styles} onMouseDown={this.onMouseDown} onClick={onClick} onDoubleClick={onEditContent} >
				<div className="element_content_warpper animation" style={animation_style}>
					{this.props.children}
				</div>
				{active?resizeHandle:""}
			</div>
		);
	}
	
	componentDidUpdate(){
		jquery(this.refs.dragElement).attr("data-animations",animations.getAnimations(this.props.shape.animations));
	}
}

export default EditableShape;