

var pull2refresh = {
	_pulling: false,
	_reloading: false,
	_view: null,
	_arrow: null,
	_status: null,
	_activityIndicator: null,

	/**
	 * Create the headerPullView
	 * @param _params {Object}
	 * @description availabe options for _params
	 * backgroundColor: string
	 */
	createView: function(_params) {

		pull2refresh._view = Ti.UI.createView({
			backgroundColor: _params.backgroundColor ? _params.backgroundColor : 'transparent',
			width: (Ti.Platform.displayCaps.platformWidth > Ti.Platform.displayCaps.platformHeight) ? Ti.Platform.displayCaps.platformHeight : Ti.Platform.displayCaps.platformWidth,
			height:60,
			shadowColor: "#999",
			shadowOffset: {
				x: 0,
				y: 1
			}
		});

		pull2refresh._arrow = Ti.UI.createView({
			backgroundImage:(_params.image)? _params.image : "/images/arrow.png",
			width:30,
			height:30,
			bottom:10,
			left:20
		});

		pull2refresh._status = Ti.UI.createLabel({
			text: "Pull to refresh...",
			left: 55,
			width: 220,
			bottom: 20,
			height: Ti.UI.SIZE,
			color: _params.statusColor ? _params.statusColor : "#fff",
			textAlign: "center",
			font:{
				fontSize:13,
				fontWeight:"bold"
			}
		});
		
		pull2refresh._activityIndicator = Titanium.UI.createActivityIndicator({
			left:20,
			bottom:13,
			width:30,
			height:30
		});

		pull2refresh._view.add(pull2refresh._arrow);
		pull2refresh._view.add(pull2refresh._status);
		pull2refresh._view.add(pull2refresh._activityIndicator);
		
		return pull2refresh._view;
	},

	_scroll: function(_e) {
		var offSet = _e.contentOffset.y;
		var t = Ti.UI.create2dMatrix();
		if (offSet <= -65.0 && !pull2refresh._pulling && !.pull2refresh._reloading) {
			
			pull2refresh._pulling = true;
			t = t.rotate(-180);
			pull2refresh._arrow.animate({
				transform: t,
				duration: 180
			});
			pull2refresh._status.text = "Release to refresh...";

		} 
		else if (pull2refresh._pulling && (offSet > -65 && offSet < 0) && !pull2refresh._reloading) {

			pull2refresh._pulling = false;
			pull2refresh._arrow.animate({
				transform: t,
				duration: 180
			});
			pull2refresh._status.text = "Pull to refresh...";
		}
	},

	_reload: function(_e, _tableview, _callback) {
		if(pull2refresh._pulling && !pull2refresh._reloading) {
			pull2refresh._reloading = true;
			pull2refresh._pulling = false;
			pull2refresh._arrow.hide();
			pull2refresh._activityIndicator.show();
			_tableview.setContentInsets({
				top:60
			},{
				animated: true
			});
			pull2refresh._arrow.transform = Ti.UI.create2dMatrix();
			_callback(_tableview);
		}
	},

	_close: function(_callback) {
		_callback();
		pull2refresh._reloading = false;
		pull2refresh._status.text = "Pull to refresh...";
		pull2refresh._activityIndicator.hide();
		pull2refresh._arrow.show();
	}
};

module.exports = pull2refresh;