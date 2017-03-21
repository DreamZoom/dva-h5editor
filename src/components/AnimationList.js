import { Row, Col,Input,Collapse,Button,Select ,InputNumber ,Switch   } from 'antd';
const Panel = Collapse.Panel;
const Option = Select.Option;
const OptGroup = Select.OptGroup;
import styles from './AnimationList.css';
import animations from "../utils/animations.js"

class AnimationList extends React.Component {
	
	state={
		shape:this.props.shape
	}
	
	handleAddAnimation=()=>{
		
		this.props.shape.animations.push({
			name:"none",
			duration:1,
			delay:0,
			iterationCount:1,
			loop:false
		});
		this.setState({
			shape:this.props.shape
		});
		
		this.props.onAnimationChange();
	}
	
	handleUpdateAnimation=(animation,propertyName,value)=>{
		animation[propertyName]=value;
		this.setState({...this.state});
	}
	
	render() {
		
		const that = this;
		const animation_options=animations.ANIMATION_LIST.map(function(group,i){
			
			return (
				<OptGroup label={group.groupName} key={i}>
			     {
			     	group.animations.map(function(ani,index){
			     		return (<Option value={ani.name} key={index}>{ani.text}</Option>);
			     	})
			     }
			    </OptGroup>
			);
			
		});
		
		const animation_list = this.props.shape.animations.map(function(animation,i){
			
			return(
				<Panel header={"动画"+i} key={i+1} className={styles.panel_list}>
			      	<Row className={styles.animation_item}>
				      <Col span={8}>
				      	动画
				      </Col>
				      <Col span={16}>
				      	<Select defaultValue={animation.name} style={{width:'100%'}} onChange={(value)=>{ that.handleUpdateAnimation(animation,"name",value)}} >
				      		<Option value="none">无</Option>
						    {animation_options}
						</Select>
				      </Col>
				    </Row>
				    <Row className={styles.animation_item}>
				      <Col span={8}>
				      	时长
				      </Col>
				      <Col span={16}>
				      	<InputNumber min={1} max={10} defaultValue={animation.duration} onChange={(value)=>{ that.handleUpdateAnimation(animation,"duration",value)}} />
				      </Col>
				    </Row>
				    <Row className={styles.animation_item}>
				      <Col span={8}>
				      	延时
				      </Col>
				      <Col span={16}>
				      	<InputNumber min={1} max={10} defaultValue={animation.delay}  onChange={(value)=>{ that.handleUpdateAnimation(animation,"delay",value)}} />
				      </Col>
				    </Row>
				    <Row className={styles.animation_item}>
				      <Col span={8}>
				      	次数
				      </Col>
				      <Col span={16}>
				      	<InputNumber min={1} max={10} defaultValue={animation.iterationCount}  onChange={(value)=>{ that.handleUpdateAnimation(animation,"iterationCount",value)}} />
				      </Col>
				    </Row>
				    <Row className={styles.animation_item}>
				      <Col span={8}>
				      	循环
				      </Col>
				      <Col span={16}>
				      	<Switch checkedChildren={'开'} unCheckedChildren={'关'} defaultChecked={animation.loop} onChange={(value)=>{ that.handleUpdateAnimation(animation,"loop",value)}} />
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
			      	<Button type="success" icon="plus-circle-o" onClick={this.handleAddAnimation}>添加</Button>
			      </Col>
			      <Col span={12}>
			      	<Button type="primary" icon="play-circle">预览</Button>
			      </Col>
			    </Row>
			</div>
	      </div>
	    )
	}
}

export default AnimationList;