class ResponsiveWarpper extends React.Component {

	state = {
		size: {
			width: 100,
			height: 100
		},

	}

	handleWindowResize = () => {
		var warpperWidth = window.innerWidth - 400;
		var warpperHeight = window.innerHeight - 64;

		this.setState({
			size: {
				width: warpperWidth,
				height: warpperHeight
			}
		});

		var size = this.props.documentSize;
		
		var ratio = size.width/size.height;
		
		if(size.width<warpperWidth){
			this.setState({
				style:{
					paddingLeft:50+(warpperWidth-size.width)/2,
					paddingRight:50+(warpperWidth-size.width)/2,
				}
			});
		}
		
		if(size.height<warpperHeight){
			this.setState({
				style:{
					paddingTop:50+(warpperHeight-size.height)/2,
					paddingBottom:50+(warpperHeight-size.height)/2,
				}
			});
		}

	}

	componentDidMount() {
		window.addEventListener('resize', this.handleWindowResize);
		this.handleWindowResize();
	}
	componentWillUnmount() {
		window.removeEventListener('resize', this.handleWindowResize)
	}
	render() {
		return(
			<div ref="warpper" className={this.props.className} style={{...this.state}}>
				<div style={{padding:50,float:'left',...this.state.style}}>
				    {this.props.children}
				</div>
				<div style={{clear:"both"}}></div>
			</div>
		)
	}
}

export default ResponsiveWarpper;