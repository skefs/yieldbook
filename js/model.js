function TickerModel(){
	var _this = this;
	this.data = [];

	var sampleData =[
		{ id:"8wgpryihjzq",  qty:12,   price:11},
		{ id:"i0rnmqgktki",  qty:10,  price:1},
		{ id:"hh1xrzs0dym",  qty:9, price:14}
	]

	this.save = function(data){
		var dataJSON = JSON.stringify(data);
		localStorage.setItem("tracker-data",dataJSON);
		_this.data = data;
	}

	this.load = function(){
  		var localContent = localStorage.getItem("tracker-data");
  		if(localContent != 'undefined' && typeof localContent != 'undefined' && localContent!=null){
  			_this.data = JSON.parse(localContent);
  		}else{
  			_this.data = sampleData;
  		}
  	}


  	this.checkInput = function(qty,price,trackerId){
		return _this.validQuantity(qty) && _this.validPrice(price) && _this.validTrackerId(trackerId);
	}

  	this.validPrice = function(str){
		return /^\d+(.\d{1,2})?$/.test(str) && str.length > 0;
	}

	this.validQuantity = function(str){
    	return /^\+?(0|[1-9]\d*)$/.test(str) && str.length > 0;
	}

	this.validTrackerId = function(val){
		if(val == 0) return false;
		for(var i = 0; i < _this.data.length; i++){
			if(_this.data[i].id == val){
				return false;
			}
		}
		return true;
	}

	this.computeTotal = function(price,qty){
		return price*qty;
	}

	this.computeGrandTotal = function(){
		var sum = 0;
		for(var i = 0; i < _this.data.length; i++){
				sum += _this.data[i].price*_this.data[i].qty;
		}
		return sum;
	}


}