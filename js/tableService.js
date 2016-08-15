function TableService(){
	var _this = this;
	var imgsrc = "img/trash-icon.png";
	var tbody = document.getElementById("ticker-table").childNodes[3];	
	var trackerIds = [];
	this.appendRow = function(row){
		tbody.appendChild(row);
	}

	this.createRow = function(id,qty,price){
		var tr = document.createElement("tr");
		var colid = createElement("td","tracker-id","tracker-id",id);
		var colqty = createElement("td","tracker-qty","tracker-qty",qty);
		var colprice = createElement("td","tracker-price","tracker-price",price);
		var coltotal = createElement("td","tracker-price","tracker-total",price*qty);
		var colaction = createElement("td","tracker-action","tracker-action","");
		var trashicon = document.createElement("img");
		trashicon.setAttribute("src",imgsrc);
		colaction.appendChild(trashicon);
		tr.appendChild(colid);
		tr.appendChild(colqty);
		tr.appendChild(colprice);
		tr.appendChild(coltotal);
		tr.appendChild(colaction);
		trackerIds.push(id);
		return tr;
	}

	this.getData = function(){
		var data = [];
		for(var i = 0; i <  tbody.childNodes.length; i++){
			if(tbody.childNodes[i].nodeType != 3){
				var row = tbody.childNodes[i];
				data.push({
					id: _this.getNodeValue(_this.getTrackerIdNode(row)),
					qty: _this.getFloatNodeValue(_this.getQtyNode(row)),
					price: _this.getFloatNodeValue(_this.getPriceNode(row))
				})
			}
		}
		return data;
	}


	this.deleteRow = function(row){
		tbody.removeChild(row);
	}

	this.getTrackerIdNode = function(row){
		return row.childNodes[0].firstChild;
	}

	this.getQtyNode = function(row){
		return row.childNodes[1].firstChild;
	}

	this.getPriceNode = function(row){
		return row.childNodes[2].firstChild;
	}

	this.getDeleteNode = function(row){
		return row.childNodes[4].firstChild;
	}

	this.getTotalNode = function(row){
		return row.childNodes[3].firstChild;
	}

	this.getNodeValue = function(node){
		return node.firstChild.nodeValue;
	}


	this.getFloatNodeValue = function(node){
		return parseFloat(_this.getNodeValue(node));
	}


	this.setNodeValue = function(node,value){
		node.firstChild.nodeValue = value;
	}

	function createElement(type,classname,name,text){
		var el = document.createElement(type);
		el.setAttribute("class",classname);
		if(type == "td" && text !==""){
			var link = document.createElement("a");
			link.setAttribute("href","#")
			link.setAttribute("name",name);
			link.innerHTML = text;
			el.appendChild(link);
		}
		return el;
	}


}