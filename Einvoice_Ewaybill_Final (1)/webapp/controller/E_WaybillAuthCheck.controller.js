sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/ui/core/UIComponent"
], function (Controller, History, UIComponent) {
	"use strict";
	var ServiceUrl = "/sap/opu/odata/SAP/ZEINVOICE_SRV/";
	var oModel = new sap.ui.model.odata.ODataModel(ServiceUrl);
	return Controller.extend("com.dink.Einvoice.controller.E_WaybillAuthCheck", {

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
			if (!this._addDialogath) {
				this._addDialogath = sap.ui.xmlfragment("com.dink.Einvoice.Fragments.AddEwaybillAuth", this);
			}

			this._addDialogath.open();

		},
		onEdit: function (oEvent) {

			if (!this._oDialog) {
				this._oDialog = sap.ui.xmlfragment("com.dink.Einvoice.Fragments.EditEwaybillAuth", this);

			}
			this._oDialog.open();

			// var oTable = this.byId("ewaybillauthtable");
			// var selectedRow = oTable.getSelectedIndex();
			// var dataContext = oTable.getBinding("rows").getContexts();
			// var SelectedKey = dataContext[selectedRow].sPath.split("/")[1];
			// var selectedData = oTable.getModel().oData[SelectedKey];

			var oTable = this.byId("ewaybillauthtable");
			// var selectedRow = oTable.getSelectedIndex();
			// var dataContext = oTable.getBinding("rows").getContexts();
			// var SelectedKey = dataContext[selectedRow].sPath.split("/")[1];
			// var selectedData = oTable.getModel().oData[SelectedKey];

			sap.ui.getCore().byId("sapuserid1").setValue(oEvent.getSource().getBindingContext().getObject().UserId);

			if (oEvent.getSource().getBindingContext().getObject().EbillGen == "X") {
				sap.ui.getCore().byId("genFlag1").setSelected(true);
			} else {
				sap.ui.getCore().byId("genFlag1").setSelected(false);
			}

			if (oEvent.getSource().getBindingContext().getObject().EbillPri == "X") {
				sap.ui.getCore().byId("printFlag1").setSelected(true);
			} else {
				sap.ui.getCore().byId("printFlag1").setSelected(false);
			}

			if (oEvent.getSource().getBindingContext().getObject().EbillCan == "X") {
				sap.ui.getCore().byId("canFlag1").setSelected(true);
			} else {
				sap.ui.getCore().byId("canFlag1").setSelected(false);
			}

		},
		onCancel: function () {
			this._addDialogath.close();
		},
		onCancel1: function () {
			this._oDialog.close();
		},
		oncreate: function () {

			var oTable = this.byId("ewaybillauthtable");
			var that = this;
			var oEntry = {};
			var GenFlag = sap.ui.getCore().byId("genFlag").getSelected();
			if (GenFlag == true) {
				oEntry.EbillGen = "X";
			} else {
				oEntry.EbillGen = " ";
			}
			var PrintFlag = sap.ui.getCore().byId("printFlag").getSelected();
			if (PrintFlag == true) {
				oEntry.EbillPri = "X";
			} else {
				oEntry.EbillPri = " ";
			}
			var CanFlag = sap.ui.getCore().byId("canFlag").getSelected();
			if (CanFlag == true) {
				oEntry.EbillCan = "X";
			} else {
				oEntry.EbillCan = " ";
			}

			var Sapuserid = sap.ui.getCore().byId("sapuserid").getValue();

			var space = /^\s/;
			if (Sapuserid == "" || Sapuserid.match(space)) {
				sap.ui.getCore().byId("sapuserid").setValueState("Error");
			} else {
				sap.ui.getCore().byId("sapuserid").setValueState("None");
			}

			if (Sapuserid == "" || Sapuserid.match(space)) {
				sap.m.MessageToast.show("Space is not allowed");
			} else {
				sap.ui.getCore().byId("sapuserid").setValueState("None");

				oEntry.UserId = Sapuserid;

				oModel.create("/EwayAuthSet", oEntry, {
					method: "POST",

					success: function (oData, oResponse) {
						that._addDialogath.close();
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

			var oTable = this.byId("ewaybillauthtable");
			var that = this;
			var oEntry = {};
			var GenFlag1 = sap.ui.getCore().byId("genFlag1").getSelected();
			if (GenFlag1 == true) {
				oEntry.EbillGen = "X";
			} else {
				oEntry.EbillGen = " ";
			}
			var PrintFlag1 = sap.ui.getCore().byId("printFlag1").getSelected();
			if (PrintFlag1 == true) {
				oEntry.EbillPri = "X";
			} else {
				oEntry.EbillPri = " ";
			}
			var CanFlag1 = sap.ui.getCore().byId("canFlag1").getSelected();
			if (CanFlag1 == true) {
				oEntry.EbillCan = "X";
			} else {
				oEntry.EbillCan = " ";
			}
			var Sapuserid = sap.ui.getCore().byId("sapuserid1").getValue();

			oEntry.UserId = Sapuserid;

			oModel.update("/EwayAuthSet(UserId='" + Sapuserid + "')", oEntry, {
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
		deleteUOMcode: function (oEvent) {

			var oTable = this.byId("ewaybillauthtable");
			var sapuserid = oEvent.getSource().getBindingContext().getObject().UserId;

			oModel.remove("/EwayAuthSet(UserId='" + sapuserid + "')", {
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

			sap.ui.getCore().byId("genFlag").setSelected(false);
			sap.ui.getCore().byId("printFlag").setSelected(false);
			sap.ui.getCore().byId("canFlag").setSelected(false);
			sap.ui.getCore().byId("sapuserid").setValue("");

		},
		onclear1: function () {

			sap.ui.getCore().byId("genFlag1").setSelected(false);
			sap.ui.getCore().byId("printFlag1").setSelected(false);
			sap.ui.getCore().byId("canFlag1").setSelected(false);

		}

	});

});