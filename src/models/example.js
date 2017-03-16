import uuid from '../utils/uuid';
export default {

  namespace: 'h5',

  state: {
  	 config:{
  	 	
  	 },
  	 pages:[],
  	 selected_page:"",
  	 selected_shape:""
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
    		    guid:uuid.NewID(),
    			title:"new page",
    			shapes:[],
    			propertys:{
    				backgroundImage:"",
    				backgroundColor:""
    			}
    	});
    	console.log(state);
      return {...state};
    },
    selectPage(state, action){
  		state.selected_page=action.page.guid;
    	return {...state};
    },
    removePage(state, action){
    	state.pages = state.pages.filter((page)=>{return page.guid!=action.guid});
    	return {...state};
    }
    
  },

};
