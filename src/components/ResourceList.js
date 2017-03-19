import { Layout, Menu, Breadcrumb, Icon, Button,Modal ,Input,Table} from 'antd';
import request from "../utils/request.js";
const columns = [{
  title: 'ResName',
  dataIndex: 'name',
  sorter: true,
  width: '20%',
}];
class ResourceList extends React.Component {
	state = {
	    data: [],
	    pagination: {},
	    loading: false,
	}
	handleTableChange = (pagination, filters, sorter) => {
	    const pager = { ...this.state.pagination };
	    pager.current = pagination.current;
	    this.setState({
	      pagination: pager,
	    });
	    this.fetch({
	      results: pagination.pageSize,
	      page: pagination.current,
	      sortField: sorter.field,
	      sortOrder: sorter.order,
	      ...filters,
	    });
	}
	fetch = (params = {}) => {
	    console.log('params:', params);
	    this.setState({ loading: true });
	    request({
	      url: 'http://localhost:6531/resource/List',
	      method: 'get',
	      data: {
	        pagesize: 10,
	        ...params,
	      },
	      type: 'json',
	    }).then((data) => {
	      const pagination = { ...this.state.pagination };
	      // Read total count from server
	      pagination.total = data.total;
	      //pagination.total = 200;
	      this.setState({
	        loading: false,
	        data: data.results,
	        pagination,
	      });
	    });
	  }
  	componentDidMount() {
    	this.fetch();
  	}
	render() {
		
		return (
	      <Table columns={columns}
	        rowKey={record => record.registered}
	        dataSource={this.state.data}
	        pagination={this.state.pagination}
	        loading={this.state.loading}
	        onChange={this.handleTableChange}
	      />
	    );
	}
}

export default ResourceList;