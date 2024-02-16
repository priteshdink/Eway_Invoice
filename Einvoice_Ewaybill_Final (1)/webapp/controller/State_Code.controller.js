sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/ui/core/UIComponent"
], function (Controller, History, UIComponent) {
	"use strict";
	var ServiceUrl = "/sap/opu/odata/SAP/ZEINVOICE_SRV/";
	var oModel = new sap.ui.model.odata.ODataModel(ServiceUrl);
	return Controller.extend("com.dink.Einvoice.controller.State_Code", {

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
		onAdd: function () {
			if (!this._addDialog) {
				this._addDialog = sap.ui.xmlfragment("com.dink.Einvoice.Fragments.state_code", this);
			}

			this._addDialog.open();

		},
		// closestatecode: function () {
		// 	this._addDialog.close();
		// }
		onEdit: function (oEvent) {

			if (!this._oDialog) {
				this._oDialog = sap.ui.xmlfragment("com.dink.Einvoice.Fragments.EditState_code", this);

			/*	this._oDialog.setModel(this.getView().getModel());*/
			}
			this._oDialog.open();

			var oTable = this.byId("portalDetails");
			// var selectedRow = oTable.getSelectedIndex();
			// var dataContext = oTable.getBinding("rows").getContexts();
			// var SelectedKey = dataContext[selectedRow].sPath.split("/")[1];
			// var selectedData = oTable.getModel().oData[SelectedKey];

			sap.ui.getCore().byId("country1").setValue(oEvent.getSource().getBindingContext().getObject().Land1);
			sap.ui.getCore().byId("sapregion1").setValue(oEvent.getSource().getBindingContext().getObject().Regio);
			sap.ui.getCore().byId("govtregion1").setValue(oEvent.getSource().getBindingContext().getObject().Stcd);

			if (oEvent.getSource().getBindingContext().getObject().Actflag == "X") {
				sap.ui.getCore().byId("activedeactivestc1").setSelected(true);
			} else {
				sap.ui.getCore().byId("activedeactivestc1").setSelected(false);
			}

		},
		onCancel: function () {
			this._addDialog.close();
		},
		onCancel1: function () {
			this._oDialog.close();
		},
		oncreate: function () {

			var oTable = this.byId("state_codetable");
			var that = this;
			var oEntry = {};
			var active = sap.ui.getCore().byId("activedeactivestc").getSelected();
			var Country = sap.ui.getCore().byId("country").getValue();
			var Region = sap.ui.getCore().byId("sapregion").getValue();
			if (active == true) {
				oEntry.Actflag = "X";
			} else {
				oEntry.Actflag = " ";
			}
			var space = /^\s/;

			if (Country == "" || Country.match(space)) {
				sap.ui.getCore().byId("country").setValueState("Error");
			} else {
				sap.ui.getCore().byId("country").setValueState("None");
			}
			if (Region == "" || Region.match(space)) {
				sap.ui.getCore().byId("sapregion").setValueState("Error");
			} else {
				sap.ui.getCore().byId("sapregion").setValueState("None");
			}
			if (Country == "" || Country.match(space) || Region == "" || Region.match(space)) {
				sap.m.MessageToast.show("Space is not allowed");
			} else {
				sap.ui.getCore().byId("country").setValueState("None");
				sap.ui.getCore().byId("sapregion").setValueState("None");

				oEntry.Land1 = Country;
				oEntry.Regio = Region;
				oEntry.Stcd = sap.ui.getCore().byId("govtregion").getValue();

				oModel.create("/StateCodeSet", oEntry, {
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

			var oTable = this.byId("state_codetable");
			var that = this;
			var oEntry = {};
			var active = sap.ui.getCore().byId("activedeactivestc1").getSelected();
			if (active == true) {
				oEntry.Actflag = "X";
			} else {
				oEntry.Actflag = " ";
			}
			var Land11 = sap.ui.getCore().byId("country1").getValue();
			var Regio1 = sap.ui.getCore().byId("sapregion1").getValue();
			var Stcd1 = sap.ui.getCore().byId("govtregion1").getValue();

			oEntry.Land1 = Land11;
			oEntry.Regio = Regio1;
			oEntry.Stcd = Stcd1;

			oModel.update("/StateCodeSet(Land1='" + Land11 + "',Regio='" + Regio1 + "')", oEntry, {
				method: "PUT",

				success: function (oData, oResponse) {
					that._oDialog.close();
					oTable.getModel().refresh(true);
					oTable.getBinding("rows").refresh(true);
					that.onclear1();
				},
				error: function (cc, vv) {

				}
			});
		},
		deletestatecode: function (oEvent) {

			var oTable = this.byId("state_codetable");
			var Land11 = oEvent.getSource().getBindingContext().getObject().Land1;
			var Regio1 = oEvent.getSource().getBindingContext().getObject().Regio;

			oModel.remove("/StateCodeSet(Land1='" + Land11 + "',Regio='" + Regio1 + "')", {
				method: "DELETE",

				success: function (oData, oResponse) {
					//that._oDialog.close();
					oTable.getModel().refresh(true);
					oTable.getBinding("rows").refresh(true);
					//that.onclear1();
					sap.m.MessageToast.show("Deleted Successfully");
				},
				error: function (cc, vv) {

				}
			});
		},
		onclear: function () {

			sap.ui.getCore().byId("activedeactivestc").setSelected(false);
			sap.ui.getCore().byId("country").setValue("");
			sap.ui.getCore().byId("sapregion").setValue("");
			sap.ui.getCore().byId("govtregion").setValue("");

		},
		onclear1: function () {

			sap.ui.getCore().byId("activedeactivestc1").setSelected(false);
			/*	sap.ui.getCore().byId("country1").setValue("");
				sap.ui.getCore().byId("sapregion1").setValue("");*/
			sap.ui.getCore().byId("govtregion1").setValue("");

		}
	});

});