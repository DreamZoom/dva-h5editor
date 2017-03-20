import { Layout, Menu, Breadcrumb, Icon, Button,Modal ,Input,Table} from 'antd';
import jquery from 'jquery';
import request from "../utils/request.js";

class ResourceList extends React.Component {
	state = {
	    data: [],
	    pagination: {},
	    loading: false,
	}
	handleTableChange = (pagination, filters, sorter) => {
	    const pager = { ...this.state.pagination };
	    pager.current = pagination.current;
	    pagination.pageSize = 5;
	    this.setState({
	      pagination: pager,
	    });
	    this.fetch({
	      pagesize: pagination.pageSize,
	      page: pagination.current,
	      sortField: sorter.field,
	      sortOrder: sorter.order,
	      ...filters,
	    });
	}
	fetch = (params = {}) => {
	    console.log('params:', params);
	    this.setState({ loading: true });
	    jquery.ajax({
	      url: 'http://localhost:6531/resource/List',
	      method: 'get',
	      data: {
	        ...params
	      },
	      dataType: "jsonp",
	    }).then((response) => {
	      const pagination = { ...this.state.pagination };
	      // Read total count from server
	      pagination.total = response.data.total;
	      //pagination.total = 200;
	      this.setState({
	        loading: false,
	        data: response.data.rows,
	        pagination,
	      });
	    });
	  }
  	componentDidMount() {
    	this.fetch();
  	}
		render() {
			
			const { onSelectResource} = this.props;
			
			const columns = [{
			  title: '资源名称',
			  dataIndex: 'ResName',
			  sorter: true
			},{
			  title: '资源内容',
			  dataIndex: 'ResContent'
			},{
				  title: '操作',
				  key: 'action',
				  render: (text, record) => (
				    <Button onClick={()=>{onSelectResource(record)}} >使用</Button>
				  ),
			}];
			
			return (
		      <Table columns={columns}
		        rowKey={record => record.ID}
		        dataSource={this.state.data}
		        pagination={this.state.pagination}
		        loading={this.state.loading}
		        onChange={this.handleTableChange}
		      />
		    );
		}
}

export default ResourceList;