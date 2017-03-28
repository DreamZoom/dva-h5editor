import { Layout, Menu, Breadcrumb, Icon, Button, Modal, Input, Table, Upload, message, Tabs, Row, Col, InputNumber } from 'antd';
class SettingFrom extends React.Component {

	state = {
		data: {
			backgroundColor:"#fff"
		}
	}

	handleUpdate = (propertyName, value) => {
		this.state.data[propertyName] = value;
		this.setState({
			data: {
				...this.state.data,
			}
		});
	}

	handleOk = () => {
//		() => { dispatch({ type: 'presentation/go_create', payload: { id: -1, width: presentation.width, height: presentation.height } }) }
		this.props.onOk({...this.state.data});
	}

	handleCancel = () => {
//		() => { dispatch({ type: 'presentation/end_create' }) }
		this.props.onCancel();
	}
	render() {
		return(
			<Modal title="页面设置" visible={this.props.visible} onOk={this.handleOk} onCancel={this.handleCancel}>
				<Row >
			      <Col span={6}>
			      	背景色
			      </Col>
			      <Col span={18}>
			      	<Input placeholder="背景色" value={this.state.data.backgroundColor} onChange={(e)=>{ this.handleUpdate("title",e.target.value) }} />
			      </Col>
			    </Row>
			
	        </Modal>
		)
	}
}

export default SettingFrom;