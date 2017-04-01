import uuid from '../utils/uuid';
import { routerRedux } from 'dva/router';
import PresentationService from '../services/PresentationService.js';
import { message} from 'antd';
export default {

	namespace: 'h5',

	state: {
		config: {
			size: {
				width: 320,
				height: 480
			},
			propertys:{
				
			}
		},
		pages: [],
		selected_page: "",
		selected_shape: "",
		text_editor_visible:false,
		resource_editor_visible:false,
		chat_editor_visible:false,
		document_scale:1.0,
		pageid:0
	},

	subscriptions: {
		setup({ dispatch, history }) { // eslint-disable-line
			return history.listen(({ pathname, query }) => {
				console.log(query);
		        if (pathname === '/editor') {		        	
		          	dispatch({ type: 'load', payload: query.id });
		        }
		        
		    });
		},
	},

	effects: {
		* load({ payload }, { call, put }) { // eslint-disable-line
			const result = yield call(PresentationService.get_page,{id:payload});
			console.log(result);
			yield put({type:"initState", data: result.data,pageid:payload });
		},
		*savePage({ payload }, { call, put }){
			console.log(payload);
			const  content = JSON.stringify(payload);
			
			const  result =yield call(PresentationService.save_page,{id:payload.pageid,content:content});		
			yield put({type:"notify", message: result.message });
		},
		*goHome({ payload }, { call, put }) { // eslint-disable-line			
			yield put(routerRedux.push({pathname:'/',query:{...payload}}));
		}
	},

	reducers: {
		
		initState(state, action) {
			try{
				const d = JSON.parse(action.data.content);
				d.pageid=action.pageid;
				return { ...d };
			}catch(e){
				var defaultState ={
					config: {
						size: {
							width: action.width||320,
							height: action.height||480
						}
					},
					pages: [],
					selected_page: "",
					selected_shape: "",
					text_editor_visible:false,
					resource_editor_visible:false,
					document_scale:1.0,
					pageid:action.id
				};
				return { ...defaultState };
			}
			
		},
		notify(state, action) {
			message.info(action.message);
			return { ...state };
		},
		addNewPage(state, action) {
			state.pages.push({
				guid: uuid.NewID(),
				title: "页面标题",
				shapes: [],
				propertys: {
					backgroundColor: "",
					backgroundImage: "",					
					backgroundMusic:"",
				}
			});
			return { ...state };
		},
		selectPage(state, action) {
			state.selected_page = action.page.guid;
			state.selected_page_model = action.page;
			state.selected_shape = "";		
			state.selected_shape_model = null;	
			return { ...state };
		},
		removePage(state, action) {
			state.pages = state.pages.filter((page) => { return page.guid != action.guid });
			return { ...state };
		},
		addNewShape(state, action) {
		
			if(state.selected_page_model) {
				
				let resource = "双击编辑文本";
				let custom_propertys={};
				if(action.shape_type=="image"){
					resource = "/resources/default.png";
				}
				if(action.shape_type=="page"){
					resource = "/resources/default.html";
					custom_propertys.width=200;
					custom_propertys.width=200;
				}
				if(action.shape_type=="video"){
					resource = "/resources/default.mp4";
				}
				state.selected_page_model.shapes.push({
					guid: uuid.NewID(),
					shape_type: action.shape_type,
					propertys: {
						backgroundImage: "",
						backgroundColor: "",
						left:0,
						top:0,
						color:"rgba(0,0,0,1)",
						fontSize:14,
						rotate:0,
						...custom_propertys
					},
					animations: [],
					resource: resource,
					preview_animation:""
				});
			}
			
			return { ...state };
		},
		selectShape(state, action){
			state.selected_shape = action.shape.guid;		
			state.selected_shape_model = action.shape;	
			return { ...state };
		},
		unselectShape(state, action){
			state.selected_shape ="";		
			state.selected_shape_model = null;	
			return { ...state };
		},
		updateShapePropertys(state, action){
			console.log(action.propertys)
			if(state.selected_shape_model)	{
				state.selected_shape_model.propertys={...state.selected_shape_model.propertys,...action.propertys}
			}	
//			console.log(state.selected_shape_model)
			return { ...state };
		},
		editShape(state, action){
			console.log(action);
			if(action.shape.shape_type=="text"){
				state.text_editor_visible = true;
			}
			if(action.shape.shape_type=="image"||action.shape.shape_type=="video"||action.shape.shape_type=="music"){
				state.resource_editor_visible = true;
				state.resource_editor_type=action.shape.shape_type;
				
			}
			if(action.shape.shape_type=="chart"){
				state.chart_editor_visible = true;
			}
			return { ...state };
		},
		endEditShape(state, action){
			state.text_editor_visible = false;
			state.resource_editor_visible = false;
			state.chart_editor_visible =false;
			return { ...state };
		},
		updateShapeContent(state, action){
			state.selected_shape_model.resource=action.resource;
			return { ...state };
		},
		updateResource(state, action){
			return { ...state };
		},
		savePresentation(state, action){
			return { ...state };
		}

	},

};