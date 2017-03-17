class SortableItem extends React.Component {
	render() {
		return (
	      <div {...this.props} className="list-item">{this.props.children}</div>
	    )
	}
}

export default SortableItem;