import uuid from '../utils/uuid';
import { routerRedux } from 'dva/router';
import PresentationService from '../services/PresentationService.js';
export default {

	namespace: 'presentation',

	state: {
		createing: false,
		width:360,
		height:640,
		title:"新页面",
		desc:"新页面"
	},

	subscriptions: {
		setup({ dispatch, history }) { // eslint-disable-line
		},
	},

	effects: {
		* edit({ payload }, { call, put }) { // eslint-disable-line			
			yield put(routerRedux.push({ pathname: '/editor', query: { ...payload } }));
		},
		* show({ payload }, { call, put }) { // eslint-disable-line			
			yield put(routerRedux.push({ pathname: '/show', query: { ...payload } }));
		},
		* go_create({ payload }, { call, put }) { // eslint-disable-line
			
			var defaultState ={
				config: {
					size: {
						width: payload.width||320,
						height: payload.height||480
					}
				},
				pages: [],
				selected_page: "",
				selected_shape: "",
				text_editor_visible:false,
				resource_editor_visible:false,
				document_scale:1.0
			};
			var body = JSON.stringify(defaultState);
			
			const result = yield call(PresentationService.create_page,{body:body,Visits:99,Owner:"",...payload});
			yield put({type: 'presentation/end_create'});
			yield put(routerRedux.push({ pathname: '/editor', query: { id:result.data.ID } }));
		}
	},

	reducers: {
		create(state, action) {
			state.createing = true;
			return { ...state };
		},
		end_create(state, action) {
			state.createing = false;
			return { ...state };
		},
		set_width(state, action){
			state.width=action.width;
			return { ...state };
		},
		set_height(state, action){
			state.height=action.height;
			return { ...state };
		}
	},

};