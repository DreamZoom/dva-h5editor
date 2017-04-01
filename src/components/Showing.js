import PresentationService from '../services/PresentationService.js';
import Swiper from 'react-id-swiper';
import ShapeRender from "../utils/ShapeRender.js"
import AnimationProperty from "./AnimationProperty.js"
import styles from './Showing.css';
import animations from "../utils/animations.js";
import jquery from 'jquery';
class Showing extends React.Component {

	renderContent = (shape) => {
		return ShapeRender.render(shape);
	}

	render() {

		const that = this;
		const params = {
			direction: 'vertical',
			noSwiping: true,
    		noSwipingClass: 'swipe-no-swiping',
    		loop:true,
			mousewheelControl: true,
			effect: 'cube',
			onInit: function() {
				animations.previewPageAnimation();
			},
			onSlideChangeEnd: function() {
				animations.previewPageAnimation();
			}
		};

		if(this.props.data == null) {
			return(
				<div>
			      	当前无数据
			    </div>
			)
		} else {

			const pagelist = this.props.data.pages.map(function(page, i) {
				console.log(page)
				const shapelist = page.shapes.map(function(shape, index) {
					const { rotate } = shape.propertys;
					const custom_styles = { transform: "rotateZ(" + rotate + "deg)", ...shape.propertys }
					return(
						<div key={i+index} className={styles.shape} style={custom_styles}>
						    <AnimationProperty animations={shape.animations}>
								{that.renderContent(shape)}
							</AnimationProperty>
						</div>
					);
				});

				return(
					<div key={i} className={styles.swiper_page}>
					   {shapelist}
					</div>
				);
			});

			return(
				<div className={styles.showpage_warpper} ref="warpper">
					<div className={styles.swiper} style={this.props.data.config.size} ref="page">
			      		<Swiper {...params}>
			      	 		{pagelist}
			      	 	</Swiper>
			        </div>
		        </div>
			);
		}

	}
	
	
	componentDidUpdate(){
		var  warpper = this.refs.warpper;
		var  page = this.refs.page;		
		var scaleWidth=warpper.offsetWidth/page.offsetWidth;
		var scaleHeight=warpper.offsetHeight/page.offsetHeight;	
		var scale =1;
		scale= Math.min(scaleWidth,scaleHeight);
		jquery(page).css({
			transform:"translate(-50%, -50%) scale("+scale+")"
		})
	}
}

export default Showing;