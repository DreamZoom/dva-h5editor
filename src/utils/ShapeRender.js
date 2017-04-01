import siteconfig from "./siteconfig.js"
import styles from "./shape.css"
import Chart from "../components/Chart.js"
export default {
   render:function(shape){
   	   if(shape.shape_type == "text") {
			return(<div>{shape.resource}</div>)
		}
		if(shape.shape_type == "image") {
			return(<img src={siteconfig.URL(shape.resource)} />)
		}
		if(shape.shape_type == "page") {
			return(
				<div className={styles.iframe}>
					<iframe src={siteconfig.URL(shape.resource)} className={styles.iframe}></iframe>
					<div className={styles.mask}></div>
				</div>
			);
		}
		
		if(shape.shape_type == "video") {
			return(
				<div className={styles.video}>
					<video controls="controls" className={styles.video}>
						<source src={siteconfig.URL(shape.resource)} type="video/mp4"></source>
						当前浏览器不支持 video直接播放
					</video>
				</div>
			);
		}
		
		if(shape.shape_type == "chart") {
			return(
				<div>
					<Chart width={shape.propertys.width} height={shape.propertys.height} resource={shape.resource} />
					<div className={styles.mask}></div>
				</div>
			);
		}
   }

}