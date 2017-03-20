import { Row, Col,Input } from 'antd';
import styles from './PropertyGrid.css';
import propertyHelper from "../utils/propertyHelper.js";
class PropertyGrid extends React.Component {
	state={
		shape:this.props.shape
	}
	
	getPropertyValue=(propertyName)=>{
		if(!this.props.shape) return '';
		return  this.props.shape.propertys[propertyName];
	}
	
	handlePropertyChange=(propertyName,value)=>{
		this.state.shape.propertys[propertyName] = value;
		this.setState({...this.state});
		this.props.onPropertyChange(propertyName,value);
	}
	
	render() {
		const that = this;
		const propertys =propertyHelper.GetPropertys(that.props.shape);

		var fileds = propertys.map(function(property,i){
			return (
				<div key={i} className={styles.property_field}>
				   <Row>
				      <Col span={10}><span>{property.displayName}</span></Col>
				      <Col span={14}>
				         <span>
					         <Input type="text" placeholder={property.displayName}
						         value={that.getPropertyValue(property.name)} 
						         onChange={(e)=>{that.handlePropertyChange(property.name,e.target.value)}} />
				         </span>
				      </Col>
				   </Row>
				</div>
			);
		});
		
		return (
	      <div className="list-item">
	      		{fileds}
	      </div>
	    )
	}
}

export default PropertyGrid;