sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
], function(Controller,MessageToast,Filter,FilterOperator){
	"use strict";
	var oRow;
	return Controller.extend("ui5application.controller.AdminPage", {
		onInit: function() {
		
			// this.getView().byId('ProductslListDetailPage').bindElement("mProducts>/products/0/items")

		},
		QuantityFormatter:function(oValue){
			debugger
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
		additems:null,
		ChartPopup:null,
		itemDetail:null,
		AdminEdit:null,
		_filter: function() {
			debugger
			var oFilter = null;

			if (this._oGlobalFilter) {
				oFilter = new Filter([this._oGlobalFilter], true);
			} else if (this._oGlobalFilter) {
				oFilter = this._oGlobalFilter;
			}

			this.byId("table").getBinding().filter(oFilter, "Application");
		},
		liveSearch:function(oEvent){
			debugger
			var searchStr = oEvent.getParameter("query");
					if(!searchStr){
					var searchStr = oEvent.getParameter("newValue");
					}
					var filterName = new sap.ui.model.Filter("name", sap.ui.model.FilterOperator.Contains,searchStr);
					var cata = new Filter("catagory", FilterOperator.Contains, searchStr)
					var desc = new Filter("desc", FilterOperator.Contains, searchStr)
					var oFilter = new sap.ui.model.Filter({
						filters:[filterName,cata,desc],
						and:false
					});
					var aFilter = [oFilter];
					this.byId("table").getBinding().filter(aFilter, "Application");
		},
		filterGlobally: function(oEvent) {
			debugger
			var sQuery = oEvent.getParameter("query");
			this._oGlobalFilter = null;

			if (sQuery) {
				this._oGlobalFilter = new Filter([
					new Filter("name", FilterOperator.Contains, sQuery),
					new Filter("catagory", FilterOperator.Contains, sQuery),
					new Filter("desc", FilterOperator.Contains, sQuery)

				], false);
			}

			this._filter();
		},
		oSelectedRow:function(oEvent){
			debugger
			
			this.getView().getModel("mProducts").refresh(true)

			

			if(!this.AdminEdit)
			{
				oRow = oEvent.getParameter("rowContext").getPath()
				this.AdminEdit = new sap.ui.xmlfragment("ui5application.fragments.AdminEdit",this)
                this.getView().addDependent(this.AdminEdit)
				var oForm = sap.ui.getCore().byId("idSimpleFormAdminEdit")
				oForm.bindElement("mProducts>"+oRow)
                this.AdminEdit.open()

			}
			else{
                this.AdminEdit.open()

			}

		},
		onProductUpdate:function(){
			debugger
			var oModel = this.getView().getModel("mProducts")
			var arr = []
			arr = oModel.oData

			arr.allproducts[oRow.split("/")[2]].Price = sap.ui.getCore().byId('idPriceInputAdminEdit').getValue()
			arr.allproducts[oRow.split("/")[2]].desc = sap.ui.getCore().byId('idDescInputAdminEdit').getValue()
			arr.allproducts[oRow.split("/")[2]].qty = sap.ui.getCore().byId('idQtyInputAdminEdit').getValue()

			debugger

			if(arr.allproducts[oRow.split("/")[2]].catagory == "Laptop")
			{
				for(var i=0;i<arr.products[0].items.length;i++)
				{
					if(arr.allproducts[oRow.split("/")[2]].pId == arr.products[0].items[i].pId)
					{
						arr.products[0].items[i].Price = sap.ui.getCore().byId('idPriceInputAdminEdit').getValue()
						arr.products[0].items[i].desc = sap.ui.getCore().byId('idDescInputAdminEdit').getValue()
						arr.products[0].items[i].qty = sap.ui.getCore().byId('idQtyInputAdminEdit').getValue()

						this.AdminEdit.destroy(true)
						this.AdminEdit = null
					}
				}
			}
			if(arr.allproducts[oRow.split("/")[2]].catagory == "Mobile")
			{
				for(var i=0;i<arr.products[1].items.length;i++)
				{
					if(arr.allproducts[oRow.split("/")[2]].pId == arr.products[1].items[i].pId)
					{
						arr.products[1].items[i].Price = sap.ui.getCore().byId('idPriceInputAdminEdit').getValue()
						arr.products[1].items[i].desc = sap.ui.getCore().byId('idDescInputAdminEdit').getValue()
						arr.products[1].items[i].qty = sap.ui.getCore().byId('idQtyInputAdminEdit').getValue()
						this.AdminEdit.destroy(true)
						this.AdminEdit = null
					}
				}
				
			}
			if(arr.allproducts[oRow.split("/")[2]].catagory == "Tablets")
			{
				for(var i=0;i<arr.products[2].items.length;i++)
				{
					if(arr.allproducts[oRow.split("/")[2]].pId == arr.products[2].items[i].pId)
					{
						arr.products[2].items[i].Price = sap.ui.getCore().byId('idPriceInputAdminEdit').getValue()
						arr.products[2].items[i].desc = sap.ui.getCore().byId('idDescInputAdminEdit').getValue()
						arr.products[2].items[i].qty = sap.ui.getCore().byId('idQtyInputAdminEdit').getValue()
						this.AdminEdit.destroy(true)
						this.AdminEdit = null
					}
				}
				
			}
			if(arr.allproducts[oRow.split("/")[2]].catagory == "Tv")
			{
				for(var i=0;i<arr.products[3].items.length;i++)
				{
					if(arr.allproducts[oRow.split("/")[2]].pId == arr.products[3].items[i].pId)
					{
						arr.products[3].items[i].Price = sap.ui.getCore().byId('idPriceInputAdminEdit').getValue()
						arr.products[3].items[i].desc = sap.ui.getCore().byId('idDescInputAdminEdit').getValue()
						arr.products[3].items[i].qty = sap.ui.getCore().byId('idQtyInputAdminEdit').getValue()
						this.AdminEdit.destroy(true)
						this.AdminEdit = null
					}
				}
				
			}
			

			oModel.refresh(true)
			sap.m.MessageToast.show("Information Updated.!")
			debugger
		},
		onProductDelete:function(){
			debugger

			var row = oRow.split("/")[2]
			var oModel = this.getView().getModel("mProducts")
			var arr = []
			arr = oModel.oData 

			//deleting from allProducts in mPriducts
			



			if(arr.allproducts[oRow.split("/")[2]].catagory == "Laptop")
			{
				for(var i=0;i<arr.products[0].items.length;i++)
				{
					if(arr.allproducts[oRow.split("/")[2]].pId == arr.products[0].items[i].pId)
					{
						
						this.AdminEdit.destroy(true)
						this.AdminEdit = null
						arr.products[0].items.splice(i,1)
						arr.allproducts.splice(row,1)

						oModel.refresh(true)
			
						sap.m.MessageToast.show('Deleted Successfully')	
						
						
					}
				}
			}
			if(arr.allproducts[oRow.split("/")[2]].catagory == "Mobile")
			{
				for(var i=0;i<arr.products[1].items.length;i++)
				{
					if(arr.allproducts[oRow.split("/")[2]].pId == arr.products[1].items[i].pId)
					{
						this.AdminEdit.destroy(true)
						this.AdminEdit = null
						arr.products[1].items.splice(i,1)
						arr.allproducts.splice(row,1)

						oModel.refresh(true)
			
						sap.m.MessageToast.show('Deleted Successfully')	
					}
				}
				
			}
			if(arr.allproducts[oRow.split("/")[2]].catagory == "Tablets")
			{
				for(var i=0;i<arr.products[2].items.length;i++)
				{
					if(arr.allproducts[oRow.split("/")[2]].pId == arr.products[2].items[i].pId)
					{
						this.AdminEdit.destroy(true)
						this.AdminEdit = null
						arr.products[2].items.splice(i,1)
						arr.allproducts.splice(row,1)

						oModel.refresh(true)
			
						sap.m.MessageToast.show('Deleted Successfully')	
					}
				}
				
			}
			if(arr.allproducts[oRow.split("/")[2]].catagory == "Tv")
			{
				for(var i=0;i<arr.products[3].items.length;i++)
				{
					if(arr.allproducts[oRow.split("/")[2]].pId == arr.products[3].items[i].pId)
					{
						this.AdminEdit.destroy(true)
						this.AdminEdit = null
						arr.products[3].items.splice(i,1)
						arr.allproducts.splice(row,1)

						oModel.refresh(true)
			
						sap.m.MessageToast.show('Deleted Successfully')	
						
					}
				}
				
			}
		},
		AdminEditFragmentClose:function(){
			this.AdminEdit.destroy(true)
			this.AdminEdit = null
		},
		oSelectedItem:function(oEvent)
		{
			debugger
			var iPath = oEvent.getParameter("listItem").getBindingContextPath()
            this.getView().byId('ProductslListDetailPage').bindElement("mProducts>"+iPath+"/items")
			
		},
		ProductImagePicked: function (oEvent)//on selecting car event function
         {
			debugger       
            var f = oEvent.oSource.oFileUpload.files[0]
            var image = URL.createObjectURL(f)
            localStorage.setItem("ProductImg", image)
        },
		CatagoryImagePicked:function(oEvent){
			debugger
			var f = oEvent.oSource.oFileUpload.files[0]
            var image = URL.createObjectURL(f)
            localStorage.setItem("CatagoryImg", image)
		},
		onAdminAddItems:function()
		{
			if(!this.additems)
			{
				this.additems = new sap.ui.xmlfragment("ui5application.fragments.Additem",this)
                this.getView().addDependent(this.additems)
                this.additems.open()

			}
			else{
                this.additems.open()

			}
		},
		oCatagoryAddEvent:function()
		{
			
				var oValue = sap.ui.getCore().byId("itemsComboBoxID").getSelectedKey()
				if(oValue == "Select")
				{
					MessageToast("Please Select items to Add")
				}
				else if(oValue == "Catagory")
				{
					
					sap.ui.getCore().byId("oCreateCatagory").setVisible(true)
					sap.ui.getCore().byId("addSingleitem").setVisible(false)
					sap.ui.getCore().byId("createCatagoryButton").setVisible(true)
					sap.ui.getCore().byId("addSingleitemButton").setVisible(false)

				}
				else if(oValue == "SingleItem")
				{
					// sap.ui.getCore().byId("additem").
					sap.ui.getCore().byId("oCreateCatagory").setVisible(false)
					sap.ui.getCore().byId("addSingleitem").setVisible(true)
					sap.ui.getCore().byId("createCatagoryButton").setVisible(false)
					sap.ui.getCore().byId("addSingleitemButton").setVisible(true)
				}
		},
		oCatagorySelectedItem:function(oEvent)
		{
			
			var oSelected = oEvent.mParameters.selectedItem.getKey()
	
		},
		onAdditemCloseButton:function()
		{
			this.additems.destroy(true)
			this.additems = null
		},
		oAdminAdditem:function()
		{
			debugger
			var oSelected = sap.ui.getCore().byId("oCatagorySelectedItem").getSelectedKey()
			var img = sap.ui.getCore().byId("ProductImageUploader").getValue()
			var oName = sap.ui.getCore().byId("ProductName").getValue()
			var oPrice = sap.ui.getCore().byId("ProductPrice").getValue()
			var oDesc = sap.ui.getCore().byId("ProductDesc").getValue()
			var oQty = sap.ui.getCore().byId("ProductQuantity").getValue()
			var oCata = sap.ui.getCore().byId("oCatagorySelectedItem").getValue() 
			
			if(oName == "" || oPrice == "" || oDesc == "" || oSelected == "--select--" || img == "")
			{
				alert("Some fields are Empty")
			}
			else{
				var oModel = this.getView().getModel("mProducts")

				var oArray = oModel.oData.products
				var allProducts = oModel.oData.allproducts
			
			for(var i=0;i<=oArray.length-1;i++)
			{
				if(oSelected == oArray[i].catagory)
				{
					var rand=Math.random()*100;
                	var rand2= Math.trunc(rand)

					debugger
					oArray[i].items.push({
						"name":oName,
						"Price":parseInt(oPrice),
						"desc":oDesc,
						"image":localStorage.getItem("ProductImg"),
						"qty":oQty,
						"catagory":oCata,
						"pId":oName+rand2+"Q"+oQty
					})

					allProducts.push({
						"name":oName,
						"Price":parseInt(oPrice),
						"desc":oDesc,
						"image":localStorage.getItem("ProductImg"),
						"qty":oQty,
						"catagory":oCata,
						"pId":oName+rand2+"Q"+oQty
					})

					oModel.refresh(true)
					oModel.setData(oArray,"products")
					this.getView().setModel(oModel)



					
					MessageToast.show("Added Successfully")

					this.additems.destroy(true)
					this.additems = null

				}
			}
			}

		},
		onAdminLogout:function()
		{
			this.getOwnerComponent().getRouter().navTo("RouteHome")
		},
		onCharPopup:function()
		{
			debugger
			if(!this.ChartPopup)
			{
				this.ChartPopup = new sap.ui.xmlfragment("ui5application.fragments.Chart",this)
				this.getView().addDependent(this.ChartPopup)

				var jsonData = new sap.ui.model.json.JSONModel("model/data.json");
				var oVizFrame = sap.ui.getCore().byId("idVizFrame");
				oVizFrame.setModel(jsonData)
				
                this.ChartPopup.open()
			}
			else{

                this.ChartPopup.open()
			}
		},
		oChartCloseButton:function()
		{
			this.ChartPopup.destroy(true)
			this.ChartPopup = null

		},
		oViewDetail:function(oEvent){
			
			var itemPath = oEvent.mParameters.listItem.mBindingInfos.title.binding.oContext.sPath
						
			if(!this.itemDetail)
			{
				this.itemDetail = new sap.ui.xmlfragment("ui5application.fragments.itemDetail",this)
				this.getView().addDependent(this.itemDetail)
				var itemDetailForm = sap.ui.getCore().byId("itemDetailForm")
				itemDetailForm.bindElement("mProducts>"+itemPath)
				
                this.itemDetail.open()
			}
			else{

                this.itemDetail.open()
			}
		},
		oCloseItemDetailPopup:function()
		{
			this.itemDetail.destroy(true)
			this.itemDetail=null
		}
	});
});