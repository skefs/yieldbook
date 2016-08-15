function TickerController(model){
	var _this = this;
	var service = new TableService();
	model.load();
	createTable();
	updateModel();

	function createTable(){
		for(var  i = 0; i < model.data.length; i++){
			var ticker = model.data[i];
			var row = service.createRow(ticker.id,ticker.qty,ticker.price);
			service.appendRow(row);
			deleteHandler(row);
		}
		editHandler();
		addHandler();
		saveHandler();
		genIdHandler();
	}

	function addHandler(){
		var button = document.getElementById('add-button');
		button.addEventListener("click",function(e){
			var trackerid = $("#new-trackerid").val();
			var price = $("#new-price").val();
			var qty = $("#new-qty").val();
			if(model.checkInput(price,qty,trackerid)){
				removeErrors();
				var row = service.createRow(trackerid,price,qty);
				service.appendRow(row);
				deleteHandler(row);
				editHandler();
				updateModel();

			}else{
				setErrors(trackerid,price,qty);
			}
		});
	}	

	function deleteHandler(row){
		var deleteAction = service.getDeleteNode(row);
		deleteAction.row = row;
		deleteAction.addEventListener("click",function(){
			service.deleteRow(this.row);
			updateModel();
		});
	}

	function editHandler(){
		$('[name="tracker-price"]').editable({
    			type: 'text',
    			title: 'Enter New Price',
    			validate : function(value){
    				if(!model.validPrice(value)){
    					return 'Please enter a positive number.';
    				}
	    			var row = this.parentNode.parentNode;
	    			var qtyNode = service.getQtyNode(row);
	    			var totalNode = service.getTotalNode(row);
	    			var qty = service.getNodeValue(qtyNode);
	    			service.setNodeValue(totalNode,model.computeTotal(qty,value));
	    			service.setNodeValue(this,value);
	    			updateModel();
    			},
			});

		$('[name="tracker-qty"]').editable({
    			type: 'text',
    			title: 'Enter New Quantity',
    			validate : function(value){
    				if(!model.validQuantity(value)){
    					return 'Please enter a positive integer.';
    				}
	    			var row = this.parentNode.parentNode;
	    			var priceNode = service.getPriceNode(row);
	    			var totalNode = service.getTotalNode(row);
	    			var price = service.getNodeValue(priceNode);
	    			service.setNodeValue(totalNode,model.computeTotal(price,value));
	    			service.setNodeValue(this,value);
	    			updateModel();
    			},
			});


		$('[name="tracker-id"]').editable({
			type: 'text',
			title : 'Enter New TrackerID',
			validate : function(value){
    				if(!model.validTrackerId(value)){
    					return 'The TrackerID must be unique.';
    				}
    				updateModel();
    			}
		})
	}

	function saveHandler(){
		var saveButton = document.getElementById("tracker-save");
		saveButton.addEventListener("click",function(){
			updateModel();
		})
	}

	function genIdHandler(){
		var genButton = document.getElementById("gen-button");
		genButton.addEventListener("click",function(){
			$("#new-trackerid").val(Math.random().toString(36).substr(2));
		})
	}

	function updateModel(){
		var data = service.getData();
		model.save(data);
		document.getElementById("tracker-grand-total").innerHTML = model.computeGrandTotal();
	}

	function setErrors(trackerid,price,qty){
		if(!model.validPrice(price)){
			$("#new-price").addClass("input-error");
		}
		if(!model.validQuantity(qty)){
			$("#new-qty").addClass("input-error");
		}
		if(!model.validTrackerId(trackerid)){
			$("#new-trackerid").addClass("input-error");
		}
	}

	function removeErrors(){
		$("#new-price").removeClass("input-error");
		$("#new-qty").removeClass("input-error");
		$("#new-trackerid").removeClass("input-error");
	}


}