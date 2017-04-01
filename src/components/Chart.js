import createG2 from 'g2-react';
import { Stat } from 'g2';

class Chart extends React.Component {

	state = {
		config:this.props.resource
	}

	render() {
         
         if(!this.props.resource || !this.props.resource.data){
         	return(
         		<h3>请配置图表</h3>
         	);
         }
         console.log(this.props.resource)
		const ChartInstance = createG2(chart => {
			chart.col(this.props.resource.metadata.xField, {
				alias: this.props.resource.metadata.xField
			});
			chart.col(this.props.resource.metadata.yField, {
				alias: this.props.resource.metadata.yField
			});
			chart.line().position(`${this.props.resource.metadata.xField}*${this.props.resource.metadata.yField}`).size(2);
			chart.render();
		});

		return(
			<ChartInstance
			    data={this.props.resource.data}
			    width={this.props.width}
			    height={this.props.height}
			    plotCfg={this.state.plotCfg}
			    forceFit={true} 
			    ref="chart"
			  />
		)
	}
}

export default Chart;