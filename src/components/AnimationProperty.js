import jquery from 'jquery';
import animations from "../utils/animations.js"
class AnimationProperty extends React.Component {
	render() {
		return (
	      <div className="shape" ref="dataElement">
	         <div className="animation">
	         {this.props.children}
	         </div>
	      </div>
	    )
	}
	
	componentDidMount(){
		console.log(animations.getAnimations(this.props.animations))
		jquery(this.refs.dataElement).attr("data-animations",animations.getAnimations(this.props.animations));
	}
}

export default AnimationProperty;