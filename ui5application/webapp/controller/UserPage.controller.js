sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast"
], function(
	Controller,
	MessageToast
) {
	"use strict";

	return Controller.extend("ui5application.controller.UserPage", {
		 Cart:null,
		 ProfilePopup:null,
		 itemDetailView:null,
		onInit: function() {
		
			//initial products shown
            this.getView().byId('ProductslListDetailPage').bindElement("mProducts>/products/0/items")

			
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this.oRouter.attachRoutePatternMatched(this.myIdmatchedLoad, this);
			
		},
		QuantityFormatter:function(oValue){
			if(oValue<=10)
			{
				return 'Error'
			}
			else if(oValue>=11 && oValue <=20)
			{
				return 'Warning'
			}
			else{
				return 'Success'
			}
		},
		liveSearch:function(oEvent){
			debugger
			var searchStr = oEvent.getParameter("query");
					if(!searchStr){
					var searchStr = oEvent.getParameter("newValue");
					}
					var filterName = new sap.ui.model.Filter("name", sap.ui.model.FilterOperator.Contains,searchStr);
					var oFilter = new sap.ui.model.Filter({
						filters:[filterName],
						and:false
					});
					var aFilter = [oFilter];
					var oList = this.getView().byId("ProductslListDetailPage");
					oList.getBinding("items").filter(aFilter);
		},
		oViewProductDetail:function(oEvent)
		{
			// alert("welcome")
			debugger

			
			var sPath = oEvent.getParameter("listItem").getBindingContextPath()

			
			if(!this.itemDetailView)
			{
				this.itemDetailView = new sap.ui.xmlfragment("ui5application.fragments.itemDetail",this)
				this.getView().addDependent(this.itemDetailView)

				var oForm = sap.ui.getCore().byId('itemDetailForm')
				oForm.bindElement("mProducts>"+sPath)


				this.itemDetailView.open()
			}
			else{
				this.itemDetailView.open()
			}


		},
		oCloseItemDetailPopup:function()
		{
			debugger
			this.itemDetailView.destroy(true)
			this.itemDetailView = null
		},
		myIdmatchedLoad:function()
		{
			debugger
			var oCurrentUser = this.getView().getModel("mCurrentUser").getData().id
			var oModel = this.getView().getModel("mUserTransaction")

			var tempArray = new Array()

			tempArray = oModel.oData.transactions
			
			for(var i=0;i<=tempArray.length-1;i++)
			{
				if(tempArray[i].userId == oCurrentUser)
				{
					let newArray = new Array()
					newArray = tempArray[i].userCarts

					let oCartModel = this.getView().getModel("mCart")

					// oCartModel.oData = newArray
					oCartModel.setData({data:newArray})
					this.getView().setModel(oCartModel)
				}
			
			}
		},
		onUserProfilePopup:function()
		{
			debugger
			if(!this.ProfilePopup)
			{
				this.ProfilePopup = new sap.ui.xmlfragment("ui5application.fragments.UserProfile",this)
				this.getView().addDependent(this.ProfilePopup)
				this.ProfilePopup.open()
			}
			else{
				this.ProfilePopup.open()
			}
		},
		oUserProfileCloseButton:function()
		{
			this.ProfilePopup.close()
		},
		oSelectedItem:function(oEvent)
		{
			debugger
			var iPath = oEvent.getParameter("listItem").getBindingContextPath()
            this.getView().byId('ProductslListDetailPage').bindElement("mProducts>"+iPath+"/items")
			
			
		},
		oCart:function()
		{
			debugger
			if(!this.Cart)
			{
				this.Cart = new sap.ui.xmlfragment("ui5application.fragments.Cart",this)
                this.getView().addDependent(this.Cart)
                this.Cart.open()

			}
			else{
                this.Cart.open()

			}
			
		},
		oCartCloseButton:function()
		{
			
			this.Cart.destroy(true)
			this.Cart=null

		},
		oSelectedToAddCart:function(oEvent)
		{
			debugger
			this.itemsPath = oEvent.oSource._aSelectedPaths
			localStorage.setItem("length",this.itemsPath.length-1)
		},
		onAddtoCartButton:function() // Pushing all items to the cart
		{
			debugger
			var length = localStorage.getItem("length")
			if(length == -1 || length == undefined)
			{
				alert("No items Selected")
			}
			else
			{

				//Pushing items to the cart
			
					debugger
					var oCurrentUser = this.getView().getModel("mCurrentUser").oData.id
				
					var tempAray = new Array()
					for(var i=0;i<=length;i++)
					{
							var sPath = this.itemsPath[i]
							var p1 = sPath.split("/")[2]
							var p3 = sPath.split("/")[4]
						
							var oModel = this.getView().getModel("mProducts")
							var myArr = oModel.oData.products[p1].items[p3]
							var catagory = 	oModel.oData.products[p1].catagory

							var oNewModel = this.getView().getModel("mCart") 
								tempAray = oNewModel.oData.data

								if(tempAray.some((ele,ind)=>{
									return myArr.pId == ele.pId
								}))
								{
									alert("item alreday added")
									this.getView().byId("ProductslListDetailPage").removeSelections(true);

								}
								else{


										tempAray.push({
											"pId":myArr.pId,
											"catagory":catagory,	
											"name":myArr.name,
											"price":myArr.Price,
											"image":myArr.image,
											"qty":myArr.qty,
											"amount":0
											})
											oNewModel.setData({data:tempAray})
											this.getView().setModel(oNewModel)
											MessageToast.show("Items Added to Cart.!")

											this.getView().byId("ProductslListDetailPage").removeSelections(true);

								}
								
								
						
					}

		    

			}
			
	},
	onUserLogout:function()
	{
		this.getOwnerComponent().getRouter().navTo("RouteHome")
	},
	onPaymentPage:function(oEvent)
	{
		
		let oCartModel = this.getView().getModel("mCart").oData.data
		if(oCartModel.length == 0)
		{
			alert("Empty Cart")
		}
		else{


			debugger

			var Quantity = document.getElementsByTagName('input')

				oCartModel
				var amount = 0
				
				for(var j=0;j<=oCartModel.length-1;j++)
				{
					debugger
					oCartModel[j].qty = Quantity[j].value
					
					oCartModel[j].amount = (parseInt(oCartModel[j].price)*parseInt(Quantity[j].value))

					this.getView().getModel("mCart").refresh(true)

				}

				for(var i=0;i<=oCartModel.length-1;i++)
				{
					amount+=oCartModel[i].amount
				}
				
				//Total Bill updating into the model
				var billModel = this.getView().getModel("bill")
				var billArr = {}
				billArr = billModel.oData
				billArr.bill = amount
				billModel.setData(billArr)
				this.getView().setModel(billModel)

                this.getOwnerComponent().getRouter().navTo("Payment",null,false);
				window.onbeforeunload
		}
	},
	oCartItemSelect:function(oEvent)
	{
        debugger
		var itemsPath = oEvent.oSource._aSelectedPaths
		// localStorage.setItem("length",this.itemsPath.length-1)
	},
	onDelete:function(oEvent)
	{
		debugger;

		let selectedItem = oEvent.mParameters.listItem.sId.split("-")[2]
		var oList = oEvent.getSource()
		var itemToDelete = oEvent.getParameter("listItem")
		oList.removeItem(itemToDelete)

		//Deleting the item from the model

		var oModel = this.getView().getModel("mCart")
		var oArray = new Array()
		oArray = this.getView().getModel("mCart").oData.data
		oArray.splice(selectedItem,1)

		oModel.setData(oArray,"data")
		this.getView().setModel(oModel)

		this.Cart.destroy(true)
		this.Cart=null

		
		this.Cart = new sap.ui.xmlfragment("ui5application.fragments.Cart",this)
                this.getView().addDependent(this.Cart)
                this.Cart.open()

	},
	onSearch:function(oEvent){
		var searchStr = oEvent.getParameter("query")
		var oFilter = new sap.ui.model.Filter("name", sap.ui.model.FilterOperator.Contains, searchStr);

		var aFilter = [oFilter];
		var oList = this.getView().byId('ProductslListDetailPage');

		oList.getBinding('items').filter(aFilter)
	},
	onSuggest:function(oEvent){

		var valSuggest = oEvent.getParameter('suggestValue')
		oEvent.getSource().suggest()
	}

	});
});