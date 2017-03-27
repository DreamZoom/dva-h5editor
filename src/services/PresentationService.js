import request from '../utils/request';

export default {
	save_page: function(data) {
		return request('/Presentation/SavePageContent', { data: data });
	},
	get_page: function(data) {
		return request('/Presentation/GetPageContent', { data: data });
	},
	create_page:function(data){
		return request('/Presentation/Create', { data: data });
	}

}