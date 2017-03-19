import uuid from '../utils/uuid';
export default {

	namespace: 'h5',

	state: {
		config: {
			size: {
				width: 320,
				height: 480
			}
		},
		pages: [],
		selected_page: "",
		selected_shape: "",
		text_editor_visible:false,
		resource_editor_visible:false
	},

	subscriptions: {
		setup({ dispatch, history }) { // eslint-disable-line
		},
	},

	effects: {
		* fetch({ payload }, { call, put }) { // eslint-disable-line
			yield put({ type: 'save' });
		},
	},

	reducers: {
		addNewPage(state, action) {
			state.pages.push({
				guid: uuid.NewID(),
				title: "new page" + uuid.NewID(),
				shapes: [],
				propertys: {
					backgroundImage: "",
					backgroundColor: ""
				}
			});
			return { ...state };
		},
		selectPage(state, action) {
			state.selected_page = action.page.guid;
			state.selected_page_model = action.page;
			return { ...state };
		},
		removePage(state, action) {
			state.pages = state.pages.filter((page) => { return page.guid != action.guid });
			return { ...state };
		},
		addNewShape(state, action) {
		
			if(state.selected_page_model) {
				state.selected_page_model.shapes.push({
					guid: uuid.NewID(),
					shape_type: action.shape_type,
					propertys: {
						backgroundImage: "",
						backgroundColor: "",
						left:250,
						top:250,
						width:100,
						height:100,
						rotate:0
					},
					animations: [],
					resource: "在此输入文本"

				});
			}
			console.log(state.selected_page_model);
			return { ...state };
		},
		selectShape(state, action){
			state.selected_shape = action.shape.guid;		
			state.selected_shape_model = action.shape;			
			return { ...state };
		},
		editShape(state, action){
			console.log(action);
			if(action.shape.shape_type=="text"){
				state.text_editor_visible = true;
			}
			if(action.shape.shape_type=="image"||action.shape.shape_type=="video"||action.shape.shape_type=="music"){
				state.resource_editor_visible = true;
				state.resource_editor_type=action.shape.type;
			}
			return { ...state };
		},
		endEditShape(state, action){
			state.text_editor_visible = false;
			state.resource_editor_visible = false;
			return { ...state };
		},
		updateShapeContent(state, action){
			state.selected_shape_model.resource=action.resource;
			return { ...state };
		},
		

	},

};