sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/ui/core/UIComponent"
], function (Controller, History, UIComponent) {
	"use strict";
	var ServiceUrl = "/sap/opu/odata/SAP/ZEINVOICE_SRV/";
	var oModel = new sap.ui.model.odata.ODataModel(ServiceUrl);

	return Controller.extend("com.dink.Einvoice.controller.Transporter_Details", {

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
			if (!this._addTransDialog) {
				this._addTransDialog = sap.ui.xmlfragment("com.dink.Einvoice.Fragments.AddTransporterDetails", this);
			}

			this._addTransDialog.open();

		},
		onEdit: function (oEvent) {

			if (!this._oTransDialog) {
				this._oTransDialog = sap.ui.xmlfragment("com.dink.Einvoice.Fragments.EditTransDetails", this);

			}
			this._oTransDialog.open();

			// var oTable = this.byId("uomcodetable");
			// var selectedRow = oTable.getSelectedIndex();
			// var dataContext = oTable.getBinding("rows").getContexts();
			// var SelectedKey = dataContext[selectedRow].sPath.split("/")[1];
			// var selectedData = oTable.getModel().oData[SelectedKey];

			var oTable = this.byId("transtable");
			// var selectedRow = oTable.getSelectedIndex();
			// var dataContext = oTable.getBinding("rows").getContexts();
			// var SelectedKey = dataContext[selectedRow].sPath.split("/")[1];
			// var selectedData = oTable.getModel().oData[SelectedKey];

			sap.ui.getCore().byId("transid1").setValue(oEvent.getSource().getBindingContext().getObject().TransId);
			sap.ui.getCore().byId("transname1").setValue(oEvent.getSource().getBindingContext().getObject().TransDesc);

			if (oEvent.getSource().getBindingContext().getObject().Active == "X") {
				sap.ui.getCore().byId("activedeactivestc1").setSelected(true);
			} else {
				sap.ui.getCore().byId("activedeactivestc1").setSelected(false);
			}

		},
		onCancel: function () {
			this._addTransDialog.close();
		},
		onCancel1: function () {
			this._oTransDialog.close();
		},
		oncreate: function () {

			var oTable = this.byId("transtable");
			var that = this;
			var oEntry = {};
			var active = sap.ui.getCore().byId("activedeactivestc").getSelected();
			if (active == true) {
				oEntry.Active = "X";
			} else {
				oEntry.Active = " ";
			}
			var govUOM = sap.ui.getCore().byId("transid").getValue();
			var sapUOM = sap.ui.getCore().byId("transname").getValue();
			var space = /^\s/;
			if (govUOM == "" || govUOM.match(space)) {
				sap.ui.getCore().byId("transid").setValueState("Error");
			} else {
				sap.ui.getCore().byId("transid").setValueState("None");
			}
		/*	if (sapUOM == "" || sapUOM.match(space)) {
				sap.ui.getCore().byId("transname").setValueState("Error");
			} else {
				sap.ui.getCore().byId("transname").setValueState("None");
			}*/
			if (govUOM == "" || govUOM.match(space)) {
				sap.m.MessageToast.show("Empty or Space is not allowed");
			} else {
				sap.ui.getCore().byId("transname").setValueState("None");
				sap.ui.getCore().byId("transid").setValueState("None");

				oEntry.TransId = sap.ui.getCore().byId("transid").getValue();
				oEntry.TransDesc = sap.ui.getCore().byId("transname").getValue();

				oModel.create("/Transporter_detailsSet", oEntry, {
					method: "POST",

					success: function (oData, oResponse) {
						that._addTransDialog.close();
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

			var oTable = this.byId("transtable");
			var that = this;
			var oEntry = {};
			var active = sap.ui.getCore().byId("activedeactivestc1").getSelected();
			if (active == true) {
				oEntry.Active = "X";
			} else {
				oEntry.Active = " ";
			}
			var TransId1 = sap.ui.getCore().byId("transid1").getValue();
			var TransDesc1 = sap.ui.getCore().byId("transname1").getValue();
			// var oSrc = oEvent.getSource();

			// if (oSrc && oSrc.setValue) {
			// 	oSrc.setValue(oSrc.getValue().toUpperCase());
			// }

			oEntry.TransId = TransId1;
			oEntry.TransDesc = TransDesc1;

			oModel.update("/Transporter_detailsSet(TransId='" + TransId1 + "')", oEntry, {
				method: "PUT",

				success: function (oData, oResponse) {
					that._oTransDialog.close();
					oTable.getModel().refresh(true);
					oTable.getBinding("rows").refresh(true);
					that.onclear1();
				},
				error: function (cc, vv) {

				}
			});
		},
		deleteUOMcode: function (oEvent) {

			var oTable = this.byId("transtable");
			var TransId1 = oEvent.getSource().getBindingContext().getObject().TransId;

			oModel.remove("/Transporter_detailsSet(TransId='" + TransId1 + "')", {
				method: "DELETE",

				success: function (oData, oResponse) {
					//that._oTransDialog.close();
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
			sap.ui.getCore().byId("transid").setValue("");
			sap.ui.getCore().byId("transname").setValue("");

		},
		onclear1: function () {

			sap.ui.getCore().byId("activedeactivestc1").setSelected(false);
			sap.ui.getCore().byId("transname1").setValue("");
			/*	sap.ui.getCore().byId("govtuom1").setValue("");
				sap.ui.getCore().byId("sapuom1").setValue("");*/

		}

	});

});