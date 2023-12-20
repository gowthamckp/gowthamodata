sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,
	MessageBox) {
        "use strict";

        return Controller.extend("ui5application.controller.Home", {
            signup:null,
            onInit: function () {

            },
            oClick:function(){
                        this.signup = new sap.ui.xmlfragment("ui5application.utils.signup",this);
                        this.getView().addDependent(this.signup);
                        this.signup.open();
                        this.signup.rerender();
                        this.signup.open();
            },
            oClose:function()
            {
                this.signup.close()
                sap.ui.getCore().byId('IdPanel').setVisible(false)
                this.signup.destroy(true);
            },
            oLogin:function()
            {
                var Username = this.getView().byId('Username').getValue()
                var Password = this.getView().byId('Password').getValue()

                var all_records = new Array()

                all_records=this.getView().getModel("mUserData").oData.data
                if(Username=='' && Password=='')
                {
                    this.getView().byId('Username').setValueState('Error')
                    this.getView().byId('Password').setValueState('Error')
                }
                else if(all_records.some((v)=>{ return ((v.id==Username) && v.phone==Password)}))
                {
                    debugger
                    var aUserData = new Array()
                    var oModel = this.getView().getModel("mUserData")
                    aUserData = oModel.oData.data
                    for(var i=0;i<=aUserData.length-1;i++)
                    {
                        if(Username == aUserData[i].id)
                        {
                            let uModel = this.getView().getModel("mCurrentUser")
                            let uArray = {}
                            uArray.id = aUserData[i].id
                            uArray.name = aUserData[i].name
                            uArray.phone = aUserData[i].phone
                            uArray.email = aUserData[i].email
                            uArray.city = aUserData[i].city
                            uArray.State = aUserData[i].state
                            uModel.setData(uArray)
                            this.getView().setModel(uModel)
                        }
                    }
                    localStorage.setItem("userId",Username)
                    this.getOwnerComponent().getRouter().navTo("UserPage",{
                        id:":"+Username
                    })
                    MessageBox.show("Welcome to Userpage")
                    this.getView().byId('Username').setValue("")
                    this.getView().byId('Password').setValue("")
                }
                else if(Username=='')
                {
                    this.getView().byId('Username').setValueState('Error')
                    this.getView().byId('Username').setValueStateText("Enter your user Id")
                }
                else if(Password=='')
                {
                    this.getView().byId('Password').setValueState('Error')
                    this.getView().byId('Password').setValueStateText("Enter you Phone number")
                }
                else if(Username=='Admin' && Password=='123')
                {
                        this.getOwnerComponent().getRouter().navTo("AdminPage",false);
                        this.getView().byId('Username').setValue("")
                        this.getView().byId('Password').setValue("")
                }
                else if(!(all_records.some((v)=>{ return ((v.id==Username) && v.phone==Password)})))
                {
                    sap.m.MessageToast.show("Wrong Credentials")
                }  
            },
            UserName:function()
            {
                this.getView().byId('Username').setValueState('None')
            },
            Password:function()
            {
                this.getView().byId('Password').setValueState('None')
            },
            SignupUserName:function()
            {
                sap.ui.getCore().byId('UserName').setValueState('None')
            },
            SignupUserPhone:function()
            {
                sap.ui.getCore().byId('UserPhone').setValueState('None')
            },
            SignupUserEmail:function()
            {
                sap.ui.getCore().byId('UserEmail').setValueState('None')
            },
            oCreateAccount:function()
            {
                var UserName = sap.ui.getCore().byId('UserName').getValue()
                // console.log(UserName);

                var UserPhone =  sap.ui.getCore().byId('UserPhone').getValue()
                // console.log(UserPhone);

                var UserEmail = sap.ui.getCore().byId('UserEmail').getValue()
                // console.log(UserEmail);
                debugger
                var UserState = sap.ui.getCore().byId('UserState').getValue()
                // console.log(UserState);

                var UserCity = sap.ui.getCore().byId('UserCity').getValue()
                // console.log(UserCity);

                var rand=Math.random()*100;
                var rand2= Math.trunc(rand)
                var UserID = "U00"+rand2+UserPhone[7]+UserPhone[8]+UserPhone[9]
                

                var NameVal =/^[A-Za-z]{3,25}$/
                var PhoneVal =/^[6-9][0-9]{9}$/
                var EmailVal =/^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/

                if(!(NameVal.test(UserName)) && !(PhoneVal.test(UserPhone)) && !(EmailVal.test(UserEmail)) && UserCity == '' && UserState == '')
                {
                    sap.ui.getCore().byId("UserName").setValueState("Error")
                    sap.ui.getCore().byId("UserPhone").setValueState("Error")
                    sap.ui.getCore().byId("UserEmail").setValueState("Error")
                    sap.ui.getCore().byId("UserCity").setValueState("Error")
                    sap.ui.getCore().byId("UserState").setValueState("Error")
                }
                else if(!(NameVal.test(UserName)))
                {
                    sap.ui.getCore().byId("UserName").setValueState("Error")
                    sap.ui.getCore().byId('UserName').setValueStateText("Minimum 3 and Max 25 letters required")

                    sap.ui.getCore().byId("UserEmail").setValueState("None")
                    sap.ui.getCore().byId("UserPhone").setValueState("None")
                    sap.ui.getCore().byId("UserState").setValueState("None")
                    sap.ui.getCore().byId("UserCity").setValueState("None")                   
                
                }
                else if(!(PhoneVal.test(UserPhone)))
                {
                
                    sap.ui.getCore().byId("UserPhone").setValueState("Error")
                    sap.ui.getCore().byId('UserPhone').setValueStateText("Number Must begin 6/7/8/9 and 10 digit length")

                    sap.ui.getCore().byId("UserName").setValueState("None")
                    sap.ui.getCore().byId("UserEmail").setValueState("None")
                    sap.ui.getCore().byId("UserState").setValueState("None")
                    sap.ui.getCore().byId("UserCity").setValueState("None")  
                }
                else if(!(EmailVal.test(UserEmail)))
                {
                    sap.ui.getCore().byId("UserEmail").setValueState("Error")
                    sap.ui.getCore().byId('UserEmail').setValueStateText("Enter proper email id")

                    sap.ui.getCore().byId("UserPhone").setValueState("None")
                    sap.ui.getCore().byId("UserState").setValueState("None")
                    sap.ui.getCore().byId("UserCity").setValueState("None")
                    sap.ui.getCore().byId("UserName").setValueState("None")

                }
                else if(UserCity == '')
                {
                    sap.ui.getCore().byId("UserCity").setValueState("Error")
                    sap.ui.getCore().byId('UserCity').setValueStateText("Enter City")

                    sap.ui.getCore().byId("UserState").setValueState("None")
                    sap.ui.getCore().byId("UserEmail").setValueState("None")
                    sap.ui.getCore().byId("UserPhone").setValueState("None")
                    sap.ui.getCore().byId("UserName").setValueState("None")

                }
                else if(UserState == '')
                {
                    sap.ui.getCore().byId("UserState").setValueState("Error")
                    sap.ui.getCore().byId('UserState').setValueStateText("Select state")
                    
                    sap.ui.getCore().byId("UserEmail").setValueState("None")
                    sap.ui.getCore().byId("UserPhone").setValueState("None")
                    sap.ui.getCore().byId("UserCity").setValueState("None")
                    sap.ui.getCore().byId("UserEmail").setValueState("None")


                }
                
                else{


                    var old_records = new Array()
                    old_records = this.getView().getModel("mUserData").oData.data
                    
                    if(old_records.some((v)=>{return v.email==UserEmail || v.phone==UserPhone}))
                    {
                      return alert("duplicate data");
                    }
                    else{

                        // new user creating....
                        sap.ui.getCore().byId('UserIdText').setText(UserID)
                
                        sap.ui.getCore().byId('IdPanel').setVisible(true)

                        var aNewData = new Array()
                        var oModel =  this.getView().getModel("mUserData")
                        aNewData = oModel.oData.data
                      
                        aNewData.push({
                            "name":UserName,
                            "phone":UserPhone,
                            "email":UserEmail,
                            "state":UserState,
                            "city":UserCity,
                            "id":UserID
                        })

                      

                       oModel.setData(aNewData,"data")
                       this.getView().setModel(oModel)

                    }

                    
                    MessageBox.show("Successfull.")
                    // .........user creation......

                    //updating user transaction model

                    var tModel = this.getView().getModel("mUserTransaction")
                    var tArray = new Array()
                    tArray = tModel.oData.transactions
                     tArray.push({
                        "userId":UserID,
                        "userCarts":[]
                     })

                     tModel.setData({transactions:tArray})
                     this.getView().setModel(tModel)

                }        
        
            },
            oClearForm:function()
            {
                debugger
                this.signup.destroy(true);
                this.signup = null

                this.signup = new sap.ui.xmlfragment("ui5application.utils.signup",this);
                this.getView().addDependent(this.signup);
                
                this.signup.open();
                
            }
        });
    });
