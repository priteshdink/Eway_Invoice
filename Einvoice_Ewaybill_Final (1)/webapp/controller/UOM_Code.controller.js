sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/ui/core/UIComponent"
], function (Controller, History, UIComponent) {
	"use strict";
	var ServiceUrl = "/sap/opu/odata/SAP/ZEINVOICE_SRV/";
	var oModel = new sap.ui.model.odata.ODataModel(ServiceUrl);

	return Controller.extend("com.dink.Einvoice.controller.UOM_Code", {

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
				this._addDialog = sap.ui.xmlfragment("com.dink.Einvoice.Fragments.uom_code", this);
			}

			this._addDialog.open();

		},
		onEdit: function (oEvent) {

			if (!this._oDialog) {
				this._oDialog = sap.ui.xmlfragment("com.dink.Einvoice.Fragments.EditUOM_code", this);

			}
			this._oDialog.open();

			// var oTable = this.byId("uomcodetable");
			// var selectedRow = oTable.getSelectedIndex();
			// var dataContext = oTable.getBinding("rows").getContexts();
			// var SelectedKey = dataContext[selectedRow].sPath.split("/")[1];
			// var selectedData = oTable.getModel().oData[SelectedKey];

			var oTable = this.byId("uomcodetable");
			// var selectedRow = oTable.getSelectedIndex();
			// var dataContext = oTable.getBinding("rows").getContexts();
			// var SelectedKey = dataContext[selectedRow].sPath.split("/")[1];
			// var selectedData = oTable.getModel().oData[SelectedKey];

			sap.ui.getCore().byId("govtuom1").setValue(oEvent.getSource().getBindingContext().getObject().GovUom);
			sap.ui.getCore().byId("sapuom1").setValue(oEvent.getSource().getBindingContext().getObject().SapUom);

			if (oEvent.getSource().getBindingContext().getObject().Actflag == "X") {
				sap.ui.getCore().byId("activedeactiveuom1").setSelected(true);
			} else {
				sap.ui.getCore().byId("activedeactiveuom1").setSelected(false);
			}

		},
		onCancel: function () {
			this._addDialog.close();
		},
		onCancel1: function () {
			this._oDialog.close();
		},
		oncreate: function () {

			var oTable = this.byId("uomcodetable");
			var that = this;
			var oEntry = {};
			var active = sap.ui.getCore().byId("activedeactiveuom").getSelected();
			if (active == true) {
				oEntry.Actflag = "X";
			} else {
				oEntry.Actflag = " ";
			}
			var govUOM = sap.ui.getCore().byId("govtuom").getValue().toUpperCase();
			var sapUOM = sap.ui.getCore().byId("sapuom").getValue().toUpperCase();
			var space = /^\s/;
			if (govUOM == "" || govUOM.match(space)) {
				sap.ui.getCore().byId("govtuom").setValueState("Error");
			} else {
				sap.ui.getCore().byId("govtuom").setValueState("None");
			}
			if (sapUOM == "" || sapUOM.match(space)) {
				sap.ui.getCore().byId("sapuom").setValueState("Error");
			} else {
				sap.ui.getCore().byId("sapuom").setValueState("None");
			}
			if (govUOM == "" || govUOM.match(space) || sapUOM == "" || sapUOM.match(space)) {
				sap.m.MessageToast.show("Space is not allowed");
			} else {
				sap.ui.getCore().byId("govtuom").setValueState("None");
				sap.ui.getCore().byId("sapuom").setValueState("None");

				oEntry.GovUom = sap.ui.getCore().byId("govtuom").getValue().toUpperCase();
				oEntry.SapUom = sap.ui.getCore().byId("sapuom").getValue().toUpperCase();

				oModel.create("/UOMCodeSet", oEntry, {
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

			var oTable = this.byId("uomcodetable");
			var that = this;
			var oEntry = {};
			var active = sap.ui.getCore().byId("activedeactiveuom1").getSelected();
			if (active == true) {
				oEntry.Actflag = "X";
			} else {
				oEntry.Actflag = " ";
			}
			var GovUom1 = sap.ui.getCore().byId("govtuom1").getValue().toUpperCase();
			var SapUom1 = sap.ui.getCore().byId("sapuom1").getValue().toUpperCase();
			// var oSrc = oEvent.getSource();

			// if (oSrc && oSrc.setValue) {
			// 	oSrc.setValue(oSrc.getValue().toUpperCase());
			// }

			oEntry.GovUom = GovUom1;
			oEntry.SapUom = SapUom1;

			oModel.update("/UOMCodeSet(GovUom='" + GovUom1 + "',SapUom='" + SapUom1 + "')", oEntry, {
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

			var oTable = this.byId("uomcodetable");
			var GovUom1 = oEvent.getSource().getBindingContext().getObject().GovUom;
			var SapUom1 = oEvent.getSource().getBindingContext().getObject().SapUom;

			oModel.remove("/UOMCodeSet(GovUom='" + GovUom1 + "',SapUom='" + SapUom1 + "')", {
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

			sap.ui.getCore().byId("activedeactiveuom").setSelected(false);
			sap.ui.getCore().byId("govtuom").setValue("");
			sap.ui.getCore().byId("sapuom").setValue("");

		},
		onclear1: function () {

			sap.ui.getCore().byId("activedeactiveuom1").setSelected(false);
			/*	sap.ui.getCore().byId("govtuom1").setValue("");
				sap.ui.getCore().byId("sapuom1").setValue("");*/

		}

	});

});