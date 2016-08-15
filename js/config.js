$(document).ready(init);

function init(){
	var model = new TickerModel();
	var controller = new TickerController(model);
}