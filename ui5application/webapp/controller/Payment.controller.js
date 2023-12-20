sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/m/MessageBox",
    "sap/m/PDFViewer",
    "sap/ui/core/util/Export",
    "sap/ui/core/util/ExportTypeCSV"
    
], function(
	Controller,
	MessageToast,
	MessageBox,
    PDFViewer,
    Export,
    ExportTypeCSV
) {
	"use strict";

	return Controller.extend("ui5application.controller.Payment", {
        /**
         * @override
         */
        onInit: function() {
           
            this._pdfViewer = new PDFViewer();
			this.getView().addDependent(this._pdfViewer);
        
        },
        paymentToUperPage:function()
        {
            debugger
                    this.getOwnerComponent().getRouter().navTo("UserPage",{
                        id:":"+localStorage.getItem("userId")
                    });

        },
        onPay:function()
        {
            debugger
            if(this.getView().getModel("bill").oData.bill == 0)
            {
                sap.m.MessageBox.show("Bill is Empty")
            }
            else{

             debugger   
            sap.m.MessageBox.show("Rs."+this.getView().getModel("bill").oData.bill+" "+" "+"Paid Successfull")

            
            //updating the bar chart data

            var ocartCata = new Array()
            ocartCata = this.getView().getModel("mCart").oData.data
            this._onDatabowl()
            debugger
            var oProducts = this.getView().getModel("mProducts").oData.products

            for(var m=0;m<ocartCata.length;m++)
            {

                for(let n=0;n<oProducts.length;n++)
                {
                    for(let k=0;k<oProducts[n].items.length;k++)
                    {
                        if(oProducts[n].items[k].pId == ocartCata[m].pId)
                        {
                            oProducts[n].items[k].qty = (parseInt(oProducts[n].items[k].qty) - parseInt(ocartCata[m].qty))

                            this.getView().getModel("mProducts").refresh(true)
                        }
                    }
                }
                var AdminQtyUpdate = this.getView().getModel("mProducts").oData.allproducts

                

                

                // oProducts.forEach((ele, ind)=>{
                //     debugger
                //     if(ocartCata[m].pId == ele.pId)
                //     {
                //         debugger
                //     }
                // })
            }


                 for(var s=0;s<ocartCata.length;s++)
                {
                    AdminQtyUpdate.forEach((ele,ind)=>{
                        debugger
                        if(ele.pId == ocartCata[s].pId)
                        {
                            ele.qty = (parseInt(ele.qty) - parseInt(ocartCata[s].qty))
                            this.getView().getModel("mProducts").refresh(true)
                        }
                    })
                }


            for(var i=0;i<=ocartCata.length-1;i++)
            {
                if(ocartCata[i].catagory == "Laptop")
                {
                    var tempArr = new Array()
                    var model = this.getView().getModel("mChart")
                    tempArr = model.oData.data
                    tempArr[0].Laptop = ((parseInt(tempArr[0].Laptop))+(parseInt(ocartCata[i].qty)))
                    
                    model.setData({data:tempArr})
                    this.getView().setModel(model)
                }
                else if(ocartCata[i].catagory == "Mobile")
                {
                    var tempArr = new Array()
                    var model = this.getView().getModel("mChart")
                    tempArr = model.oData.data
                    tempArr[0].Mobile = ((tempArr[0].Mobile)+(parseInt(ocartCata[i].qty)))
                    
                    model.setData({data:tempArr})
                    this.getView().setModel(model) 
                }
                else if(ocartCata[i].catagory == "Tablets")
                {
                    var tempArr = new Array()
                    var model = this.getView().getModel("mChart")
                    tempArr = model.oData.data
                    tempArr[0].Tablets = ((tempArr[0].Tablets)+(parseInt(ocartCata[i].qty)))
                    
                    model.setData({data:tempArr})
                    this.getView().setModel(model) 
                }
                else if(ocartCata[i].catagory == "Tv")
                {
                    var tempArr = new Array()
                    var model = this.getView().getModel("mChart")
                    tempArr = model.oData.data
                    tempArr[0].Tv = ((tempArr[0].Tv)+(parseInt(ocartCata[i].qty)))
                    
                    model.setData({data:tempArr})
                    this.getView().setModel(model) 
                }
            }
            var arr = new Array()
            var uCartModel = this.getView().getModel("mCart")
            uCartModel.setData({data:arr})
            this.getView().setModel(uCartModel)

            var arr1 = new Array()
            var uCartModel1 = this.getView().getModel("mUserTransaction")
            var oCurrentUser = this.getView().getModel("mCurrentUser").getData().id
            arr1 = uCartModel1.oData.transactions
            for(var i=0;i<=arr1.length-1;i++)
            {
                if(arr1[i].userId == oCurrentUser)
                {
                    arr1[i].userCarts = arr 
                    uCartModel1.setData({transactions:arr1})
                    this.getView().setModel(uCartModel1)
                }
            }
            debugger
           
            var oModel =  this.getView().getModel("bill")
            oModel.setData({bill:0})
            this.getView().setModel(oModel)

            }
        },
        ondownloadBill:function()
        {
            debugger
            // var sSource = this.getView().getModel("mCart").oData.data
            

			// this._pdfViewer.setSource("ui5application/view/Payment.view.xml");
			// this._pdfViewer.setTitle("My Custom Title");
			// this._pdfViewer.open();



        
        },
        _onDatabowl:sap.m.Table.prototype.exportData || function()

            {

                debugger

                var oModel = this.getView().getModel("mCart")

                var oExport = new Export({

 

                    exportType: new ExportTypeCSV({

                        fileExtension: "csv",

                        separatorChar: ","

                    }),

               

                models: oModel,

 

                rows: {

                    path: "/data"

                },

                    columns: [{

                        name: "ProductName",

                        template: {

                            content: "{name}"

                        }

                    },{

                        name:"Price",

                        template:{

                            content:"{price}"

                        }

                    },{

                        name:"Quantities",

                        template:{

                            content:"{qty}"

                        }

                    },{

                        name:"Amount",

                        template:{

                            content:"{amount}"

                        }

                    },{

                        name:"TotalPrice",

                        template:{

                            content:this.getView().getModel("bill").oData.bill

                        }

                    }]

                });

                // console.log(oExport);

                oExport.saveFile().catch(function(oError) {

   

                }).then(function() {

                    oExport.destroy();

                });

            }
	});
});