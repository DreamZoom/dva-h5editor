import Guid from '../utils/guid';
export default {

  namespace: 'h5',

  state: {
  	 config:{
  	 	
  	 },
  	 pages:[]
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },
  },

  reducers: {
    addNewPage(state, action) {
    	state.pages.push({
    		  guid:Guid.NewGuid(),
    			title:"new page",
    			shapes:[],
    			propertys:{
    				backgroundImage:"",
    				backgroundColor:""
    			}
    	});
      return {...state};
    },
    
    removePage(state, action){
    	state.pages = state.pages.filter((page)=>{return page.guid!=action.guid});
    	return {...state};
    }
    
  },

};
