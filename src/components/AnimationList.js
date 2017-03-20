import { Row, Col,Input,Collapse,Button   } from 'antd';
const Panel = Collapse.Panel;
import styles from './AnimationList.css';
class AnimationList extends React.Component {
	
	state={
		shape:this.props.shape
	}
	
	handleAddAnimation=()=>{
		
		this.props.shape.animations.push({
			name:"test",
			duration:1,
			delay:0,
			animationIterationCount:1
		});
		this.setState({
			shape:this.props.shape
		});
		
		this.props.onAnimationChange();
	}
	
	render() {
		
		const animation_list = this.props.shape.animations.map(function(animation,i){
			
			return(
				<Panel header={"动画"+i} key={i+1} className={styles.panel_list}>
			      	<Row>
				      <Col span={12}>
				      	动画
				      </Col>
				      <Col span={12}>
				      	
				      </Col>
				    </Row>
			    </Panel>
			);
			
		});
		
		
		return (
	      <div>
	      	<Collapse defaultActiveKey={['1']} bordered={false} >
			    {animation_list}
			</Collapse>
			<div className={styles.padding_button}>
			 	<Row>
			      <Col span={12}>
			      	<Button type="success" onClick={this.handleAddAnimation}>添加动画</Button>
			      </Col>
			      <Col span={12}>
			      	<Button type="primary">预览动画</Button>
			      </Col>
			    </Row>
			</div>
	      </div>
	    )
	}
}

export default AnimationList;