var pull2refresh = require('lib/pull2refresh');


var refreshTable = function(_tableView){
	//fetch your data update the table
	

	//at the end do this to reset the headerpull view
	pull2refresh._close(function(){
		_tableView.setContentInsets({
			top:0
		}, {
			animated:true
		});
	});
}
var AppWindow = function(){
	var win = Ti.UI.createWindow();

	var table = Ti.UI.createTableView();

	var headerPullView = pull2refresh.createView({
		image: 'images/arrow.png';
	});

	table.headerPullView = headerPullView;

	table.addEventListener('scroll', function(_e){
		pull2refresh._scroll(_e);
	});

	table.addEventListener('dragend', function(_e){
		pull2refresh._reload(_e, this, refreshTable)''
	});

	win.add(table);

	return win;
};

module.exports = AppWindow;