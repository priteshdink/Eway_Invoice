sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/ui/core/UIComponent"
], function (Controller, History, UIComponent) {
	"use strict";
	var ServiceUrl = "/sap/opu/odata/SAP/ZEINVOICE_SRV/";
	var oModel = new sap.ui.model.odata.ODataModel(ServiceUrl);
	var oDialog;
	return Controller.extend("com.dink.Einvoice.controller.Portal_Details", {

		onInit: function () {

		},
		onBack: function () {
			/*	var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("Create_Compliance_Repository", null, true);*/
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();
			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				var oRouter = UIComponent.getRouterFor(this);
				oRouter.navTo("Master_Page", {}, true);
			}
		},
		onAdd: function (oEvent) {

			if (!this._addDialog) {
				this._addDialog = sap.ui.xmlfragment("com.dink.Einvoice.Fragments.Addportaldetails", this);

				// this._oDialog.setModel(this.getView().getModel());
			}
			this._addDialog.open();

		},
		onEdit: function (oEvent) {

			if (!oDialog) {
				oDialog = sap.ui.xmlfragment("com.dink.Einvoice.Fragments.Editportaldetails", this);

				// this._oDialog.setModel(this.getView().getModel());
			}
			oDialog.open();

			var oTable = this.byId("portalDetails");
			var selectedRow = oTable.getSelectedIndex();
			var dataContext = oTable.getBinding("rows").getContexts();
			// var SelectedKey = dataContext[selectedRow].sPath.split("/")[1];
			// var selectedData = oTable.getModel().oData[SelectedKey];
			sap.ui.getCore().byId("sapsystemidport1").setValue(oEvent.getSource().getBindingContext().getObject().Syid);
			sap.ui.getCore().byId("modeofprocess1").setSelectedKey(oEvent.getSource().getBindingContext().getObject().Method);
			sap.ui.getCore().byId("aspuserid1").setValue(oEvent.getSource().getBindingContext().getObject().Username);
			sap.ui.getCore().byId("asppass1").setValue(oEvent.getSource().getBindingContext().getObject().Password);
			sap.ui.getCore().byId("portalversion1").setValue(oEvent.getSource().getBindingContext().getObject().Version);
			sap.ui.getCore().byId("payload1").setValue(oEvent.getSource().getBindingContext().getObject().VersionJson);
			sap.ui.getCore().byId("taxschema1").setValue(oEvent.getSource().getBindingContext().getObject().TaxSch);
			if (oEvent.getSource().getBindingContext().getObject().Actflag == "X") {
				sap.ui.getCore().byId("activedeactiveportdet1").setSelected(true);
			} else {
				sap.ui.getCore().byId("activedeactiveportdet1").setSelected(false);
			}

		},
		onCancel: function () {
			this._addDialog.close();
		},
		onCancel1: function () {
			oDialog.close();
		},
		oncreate: function () {

			var oTable = this.byId("portalDetails");
			var that = this;
			var oEntry = {};
			var active = sap.ui.getCore().byId("activedeactiveportdet").getSelected();
			if (active == true) {
				oEntry.Actflag = "X";
			} else {
				oEntry.Actflag = " ";
			}
			var Syid1 = sap.ui.getCore().byId("sapsystemidport").getValue();
			var Method1 = sap.ui.getCore().byId("modeofprocess").getSelectedKey();
			var Username1 = sap.ui.getCore().byId("aspuserid").getValue();
			var Password1 = sap.ui.getCore().byId("asppass").getValue();
			var Version1 = sap.ui.getCore().byId("portalversion").getValue();
			var VersionJson1 = sap.ui.getCore().byId("payload").getValue();
			var TaxSch1 = sap.ui.getCore().byId("taxschema").getValue();
			var space = /^\s/;
			debugger;
			if (Syid1 == "" || Syid1.match(space)) {
				sap.ui.getCore().byId("sapsystemidport").setValueState("Error");
			} else {
				sap.ui.getCore().byId("sapsystemidport").setValueState("None");
			}
			if (Method1 == "" || Method1.match(space)) {
				sap.ui.getCore().byId("modeofprocess").setValueState("Error");
			} else {
				sap.ui.getCore().byId("modeofprocess").setValueState("None");
			}
			if (Username1 == "" || Username1.match(space)) {
				sap.ui.getCore().byId("aspuserid").setValueState("Error");
			} else {
				sap.ui.getCore().byId("aspuserid").setValueState("None");
			}
			if (Password1 == "" || Password1.match(space)) {
				sap.ui.getCore().byId("asppass").setValueState("Error");
			} else {
				sap.ui.getCore().byId("asppass").setValueState("None");
			}
			if (Syid1 == "" || Syid1.match(space) || Method1 == "" || Method1.match(space) || Username1 == "" || Username1.match(space) ||
				Password1 == "" || Password1.match(space)) {
				sap.m.MessageToast.show("Space is not allowed");
			} else {
				sap.ui.getCore().byId("sapsystemidport").setValueState("None");
				sap.ui.getCore().byId("modeofprocess").setValueState("None");
				sap.ui.getCore().byId("aspuserid").setValueState("None");
				sap.ui.getCore().byId("asppass").setValueState("None");
				oEntry.Syid = Syid1;
				oEntry.Method = Method1;
				oEntry.Username = Username1;
				oEntry.Password = Password1;
				oEntry.Version = Version1;
				oEntry.VersionJson = VersionJson1;
				oEntry.TaxSch = TaxSch1;

				oModel.create("/Portal_detailsSet", oEntry, {
					method: "POST",

					success: function (oData, oResponse) {
						that._addDialog.close();
						oTable.getModel().refresh(true);
						oTable.getBinding("rows").refresh(true);
						that.onclear();
					},
					error: function (cc, vv) {

					}
				});
			}
		},
		oncreate1: function () {

			var oTable = this.byId("portalDetails");
			var that = this;
			var oEntry = {};
			var active = sap.ui.getCore().byId("activedeactiveportdet1").getSelected();
			if (active == true) {
				oEntry.Actflag = "X";
			} else {
				oEntry.Actflag = " ";
			}
			var SyId1 = sap.ui.getCore().byId("sapsystemidport1").getValue();
			var Method1 = sap.ui.getCore().byId("modeofprocess1").getSelectedKey();
			var Username1 = sap.ui.getCore().byId("aspuserid1").getValue();
			var Password1 = sap.ui.getCore().byId("asppass1").getValue();
			var Version1 = sap.ui.getCore().byId("portalversion1").getValue();
			var VersionJson1 = sap.ui.getCore().byId("payload1").getValue();
			var TaxSch1 = sap.ui.getCore().byId("taxschema1").getValue();

			oEntry.Syid = SyId1;
			oEntry.Method = Method1;
			oEntry.Username = Username1;
			oEntry.Password = Password1;
			oEntry.Version = Version1;
			oEntry.VersionJson = VersionJson1;
			oEntry.TaxSch = TaxSch1;

			oModel.update("/Portal_detailsSet(Syid='" + SyId1 + "',Method='" + Method1 + "',Username='" + Username1 + "',Password='" +
				Password1 + "')", oEntry, {
					method: "PUT",

					success: function (oData, oResponse) {
						oDialog.close();
						oTable.getModel().refresh(true);
						oTable.getBinding("rows").refresh(true);
						that.onclear1();
					},
					error: function (cc, vv) {

					}
				});
		},
		Deleteportaldetails: function (oEvent) {

			// var oEntry = {};
			var oTable = this.byId("portalDetails");
			var SyId1 = oEvent.getSource().getBindingContext().getObject().Syid;
			var Method1 = oEvent.getSource().getBindingContext().getObject().Method;
			var Username1 = oEvent.getSource().getBindingContext().getObject().Username;
			var Password1 = oEvent.getSource().getBindingContext().getObject().Password;
			var Version1 = oEvent.getSource().getBindingContext().getObject().Version;
			var VersionJson1 = oEvent.getSource().getBindingContext().getObject().VersionJson;
			var TaxSch1 = oEvent.getSource().getBindingContext().getObject().TaxSch;
			var actflag = oEvent.getSource().getBindingContext().getObject().Actflag;

			oModel.remove("/Portal_detailsSet(Syid='" + SyId1 + "',Method='" + Method1 + "',Username='" + Username1 + "',Password='" +
				Password1 + "')", {
					method: "DELETE",

					success: function (oData, oResponse) {
						// oDialog.close();
						oTable.getModel().refresh(true);
						oTable.getBinding("rows").refresh(true);
						// that.onclear1();
						sap.m.MessageToast.show("Deleted Successfully");
					},
					error: function (cc, vv) {

					}
				});
		},
		onclear: function () {
			sap.ui.getCore().byId("activedeactiveportdet").setSelected(false);
			sap.ui.getCore().byId("sapsystemidport").setValue("");
			sap.ui.getCore().byId("modeofprocess").setValue("");
			sap.ui.getCore().byId("aspuserid").setValue("");
			sap.ui.getCore().byId("asppass").setValue("");
			sap.ui.getCore().byId("portalversion").setValue("");
			sap.ui.getCore().byId("payload").setValue("");
			sap.ui.getCore().byId("taxschema").setValue("");

		},
		onclear1: function () {
			sap.ui.getCore().byId("activedeactiveportdet1").setSelected(false);
			/*		sap.ui.getCore().byId("sapsystemidport1").setValue("");
					sap.ui.getCore().byId("modeofprocess1").setValue("");
					sap.ui.getCore().byId("aspuserid1").setValue("");
					sap.ui.getCore().byId("asppass1").setValue("");*/
			sap.ui.getCore().byId("portalversion1").setValue("");
			sap.ui.getCore().byId("payload1").setValue("");
			sap.ui.getCore().byId("taxschema1").setValue("");

		},
		portalDetails: function (oEvent) {

		}
	});

});

// sap.ui.define([
// 	"sap/ui/core/mvc/Controller",
// 	"sap/ui/core/routing/History",
// 	"sap/ui/core/UIComponent"
// ], function (Controller, History, UIComponent) {
// 	"use strict";
// 	var ServiceUrl = "/sap/opu/odata/SAP/ZEINVOICE_SRV/";
// 	var oModel = new sap.ui.model.odata.ODataModel(ServiceUrl);

// 	return Controller.extend("com.dink.Einvoice.controller.Portal_Details", {

// 		/**
// 		 * Called when a controller is instantiated and its View controls (if available) are already created.
// 		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
// 		 * @memberOf com.dink.Einvoice.view.Portal_Details
// 		 */
// 		onInit: function () {

// 		},
// 		onBack: function () {
// 			/*	var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
// 			oRouter.navTo("Create_Compliance_Repository", null, true);*/
// 			var oHistory = History.getInstance();
// 			var sPreviousHash = oHistory.getPreviousHash();
// 			if (sPreviousHash !== undefined) {
// 				window.history.go(-1);
// 			} else {
// 				var oRouter = UIComponent.getRouterFor(this);
// 				oRouter.navTo("Master_Page", {}, true);
// 			}
// 		},
// 		onAdd: function (oEvent) {

// 			if (!this._oDialog) {
// 				this._oDialog = sap.ui.xmlfragment("com.dink.Einvoice.fragment.Addportaldetails", this);

// 				this._oDialog.setModel(this.getView().getModel());
// 			}
// 			this._oDialog.open();

// 		},
// 		onEdit : function (oEvent) {

// 			if (!this._oDialog) {
// 				this._oDialog = sap.ui.xmlfragment("com.dink.Einvoice.fragment.Editportaldetails", this);

// 				this._oDialog.setModel(this.getView().getModel());
// 			}
// 			this._oDialog.open();

// 		},
// 		onCancel: function () {
// 			this._oDialog.close();
// 		},
// 		oncreate: function () {
// 		
// 			var oTable = this.byId("portalDetails");
// 			var that = this;
// 			var oEntry = {};
// 			var active = sap.ui.getCore().byId("activedeactive").getSelected();
// 			if (active == true) {
// 				oEntry.Actflag = "X";
// 			} else {
// 				oEntry.Actflag = " ";
// 			}
// 			oEntry.Syid = sap.ui.getCore().byId("sapsystemid").getValue();
// 			oEntry.Method = sap.ui.getCore().byId("modeofprocess").getValue();
// 			oEntry.Username = sap.ui.getCore().byId("aspuserid").getValue();
// 			oEntry.Password = sap.ui.getCore().byId("asppass").getValue();
// 			oEntry.Version = sap.ui.getCore().byId("portalversion").getValue();
// 			oEntry.VersionJson = sap.ui.getCore().byId("payload").getValue();
// 			oEntry.TaxSch = sap.ui.getCore().byId("taxschema").getValue();

// 			oModel.create("/Portal_detailsSet", oEntry, {
// 				method: "POST",

// 				success: function (oData, oResponse) {
// 					that._oDialog.close();
// 					oTable.getModel().refresh(true);
// 					oTable.getBinding("items").refresh(true);
//                      that.onclear();
// 				},
// 				error: function (cc, vv) {

// 				}
// 			});
// 		},
// 		oncreate1: function () {
// 		
// 			var oTable = this.byId("Editportaldetails");
// 			var that = this;
// 			var oEntry = {};
// 			var active = sap.ui.getCore().byId("activedeactive").getSelected();
// 			if (active == true) {
// 				oEntry.Actflag = "X";
// 			} else {
// 				oEntry.Actflag = " ";
// 			}
// 			oEntry.Syid = sap.ui.getCore().byId("sapsystemid").getValue();
// 			oEntry.Method = sap.ui.getCore().byId("modeofprocess").getValue();
// 			oEntry.Username = sap.ui.getCore().byId("aspuserid").getValue();
// 			oEntry.Password = sap.ui.getCore().byId("asppass").getValue();
// 			oEntry.Version = sap.ui.getCore().byId("portalversion").getValue();
// 			oEntry.VersionJson = sap.ui.getCore().byId("payload").getValue();
// 			oEntry.TaxSch = sap.ui.getCore().byId("taxschema").getValue();

// 			oModel.create("/Portal_detailsSet", oEntry, {
// 				method: "POST",

// 				success: function (oData, oResponse) {
// 					that._oDialog.close();
// 					oTable.getModel().refresh(true);
// 					oTable.getBinding("items").refresh(true);
//                      that.onclear();
// 				},
// 				error: function (cc, vv) {

// 				}
// 			});
// 		},
// 		onclear: function () {
// 			sap.ui.getCore().byId("activedeactive").setSelected(false);
// 			sap.ui.getCore().byId("sapsystemid").setValue("");
// 			sap.ui.getCore().byId("modeofprocess").setValue("");
// 			sap.ui.getCore().byId("aspuserid").setValue("");
// 			sap.ui.getCore().byId("asppass").setValue("");
// 			sap.ui.getCore().byId("portalversion").setValue("");
// 			sap.ui.getCore().byId("payload").setValue("");
// 			sap.ui.getCore().byId("taxschema").setValue("");

// 		}
// 	});

// });