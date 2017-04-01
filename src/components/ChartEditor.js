import createG2 from 'g2-react';
import { Stat } from 'g2';
import { Table, Input, Icon, Button, Popconfirm, Row, Col, Select, Modal } from 'antd';
const Option = Select.Option;

class ChartEditor extends React.Component {
	state = {
		rows: [],
		cols: []
	}
	
	constructor(props){
		super(props);
		var data = props.data;
		if(data){
			for (var i=0;i<data.length;i++) {
				var row = data[i];
				if(this.state.cols.length==0){
					for (var c in row) {
						this.state.cols.push({
							columnName: c
						})
					}
				}
				
				this.state.rows.push(row);
			}
		}
	}

	addColumns = () => {
		this.state.cols.push({
			columnName: "字段" + this.state.cols.length
		});

		this.setState({
			...this.state
		})
	}

	addRows = () => {
		this.state.rows.push({
			_index: this.state.rows.length
		});

		this.setState({
			...this.state
		})
	}

	handleUpdateValue = (row, colname, value) => {
		row[colname] = value;
		console.log(this.state);
		this.setState({
			...this.state
		})
	}

	handleUpdateColumn = (column, value) => {
		column.columnName = value;
		this.setState({
			...this.state
		})
	}

	handleChartType = (value) => {
		this.state.chartType = value;
		this.setState({
			...this.state
		})
	}

	handleSelectX = (value) => {
		this.state.xField = value;
		this.setState({
			...this.state
		})
	}

	handleSelectY = (value) => {
		this.state.yField = value;
		this.setState({
			...this.state
		})
	}

	handleOk = () => {
		
		var data=[];
		for (var ri=0;ri<this.state.rows.length;ri++) {
			var row = this.state.rows[ri];
			var d={};
			for (var ci=0;ci< this.state.cols.length;ci++) {
				var col = this.state.cols[ci];
				try{
					d[col.columnName]=parseFloat(row[col.columnName]);
				}catch(e){
					d[col.columnName]=row[col.columnName];
				}
				
			}
			data.push(d);
		}
		
		this.props.onOk({
			data:data,
			metadata:{
				xField:this.state.xField,
				yField:this.state.yField,
				chartType:this.state.chartType
			}
			
		});
		
	}

	render() {

		const that = this;
		var list = that.state.rows.map(function(item, index) {
			var records = that.state.cols.map(function(c, i) {
				return(
					<Col key={i} span={3}><Input value={item[c.columnName]} onChange={(e)=>{that.handleUpdateValue(item,c.columnName,e.target.value)}} /></Col>
				);
			});
			return(
				<Row key={index}>
					{records}
				</Row>
			);
		});

		var colums = that.state.cols.map(function(col, i) {
			return(
				<Col key={i} span={3}>
					<Input value={col.columnName} onChange={(e)=>{that.handleUpdateColumn(col,e.target.value)}}/>
				</Col>
			);
		});

		var selectList = that.state.cols.map(function(col, i) {
			return(
				<Option key={i} value={col.columnName}>{col.columnName}</Option>
			);
		});

		return(
			<Modal title="编辑内容" visible={this.props.visible} onOk={this.handleOk} onCancel={this.props.onCancel}>
				<div>
						<div>
						    <Button onClick={()=>{this.addColumns()}}>添加列</Button>
						    <Button onClick={()=>{this.addRows()}}>添加行</Button>
					    </div>
						<div>
							<Row>
								{colums}
							</Row>					
						</div>
						<div>
							{list}
						</div>
						
						<div>
							<Row>
								<Col span={3}>x轴</Col>
								<Col span={6}>
									<Select style={{ width: 120 }} onChange={this.handleSelectX} >
										{selectList}
									</Select>
								</Col>
								<Col span={3}>y轴</Col>
								<Col span={6}>
									<Select style={{ width: 120 }} onChange={this.handleSelectY}>
										{selectList}
									</Select>
								</Col>
							</Row>	
							<Row>
								<Col span={3}>chart类型</Col>
								<Col span={6}>
									<Select style={{ width: 120 }} >
										<Option value="line">line</Option>
		      							<Option value="pie">pie</Option>
									</Select>
								</Col>
								
							</Row>	
						</div>
		        </div>
	        </Modal>
	        )
	}
}

export default ChartEditor;