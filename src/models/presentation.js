import uuid from '../utils/uuid';
import { routerRedux } from 'dva/router';
import PresentationService from '../services/PresentationService.js';
export default {

	namespace: 'presentation',

	state: {
		
	},

	subscriptions: {
		setup({ dispatch, history }) { // eslint-disable-line
		},
	},

	effects: {
		*changePage({ payload }, { call, put }) { // eslint-disable-line			
			yield put(routerRedux.push({pathname:'/editor',query:{...payload}}));
		}
	},

	reducers: {
		resizeDocument(state, action) {
			return { ...state };
		}
	},

};