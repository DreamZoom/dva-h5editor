import uuid from '../utils/uuid';
import { routerRedux } from 'dva/router';
import PresentationService from '../services/PresentationService.js';
export default {

	namespace: 'show',

	state: {
		data:null
	},

	subscriptions: {
		setup({ dispatch, history }) { // eslint-disable-line
			return history.listen(({ pathname, query }) => {
		        if (pathname === '/show') {
		        	
		          dispatch({ type: 'load', payload: query.id });
		        }
		    });
		},
	},

	effects: {
		*load({ payload }, { call, put }) { // eslint-disable-line			
			const result = yield call(PresentationService.get_page,{id:payload});
			yield put({type:"initState", data: result.data });
		}
	},

	reducers: {
		initState(state, action) {
			try{
				const d = JSON.parse(action.data.content);
				console.log(d);
				return { data:d };
			}catch(e){
			}
		}
	},

};