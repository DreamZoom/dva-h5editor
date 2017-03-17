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
		selected_shape: ""
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
					type: action.type,
					propertys: {
						backgroundImage: "",
						backgroundColor: "",
						left:250,
						top:250,
						width:100,
						height:100
					},
					animations: [],
					resource: "在此输入文本"

				});
			}
			console.log(state.selected_page_model);
			return { ...state };
		}

	},

};