sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/ui/core/UIComponent"
], function (Controller, History, UIComponent) {
	"use strict";
	var ServiceUrl = "/sap/opu/odata/SAP/ZEINVOICE_SRV/";
	var oModel = new sap.ui.model.odata.ODataModel(ServiceUrl);

	return Controller.extend("com.dink.Einvoice.controller.HSN_code", {

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
				this._addDialog = sap.ui.xmlfragment("com.dink.Einvoice.Fragments.hsn_code", this);
			}

			this._addDialog.open();

		},
		onEdit: function (oEvent) {

			if (!this._oDialoghsn) {
				this._oDialoghsn = sap.ui.xmlfragment("com.dink.Einvoice.Fragments.EditHSN_code", this);

			}
			this._oDialoghsn.open();

			var oTable = this.byId("hsncode");
			// var selectedRow = oTable.getSelectedIndex();
			// var dataContext = oTable.getBinding("rows").getContexts();
			// var SelectedKey = dataContext[selectedRow].sPath.split("/")[1];
			// var selectedData = oTable.getModel().oData[SelectedKey];

			sap.ui.getCore().byId("hsn_saccode1").setValue(oEvent.getSource().getBindingContext().getObject().HsnSac);
			sap.ui.getCore().byId("material1").setValue(oEvent.getSource().getBindingContext().getObject().Matnr);

			if (oEvent.getSource().getBindingContext().getObject().Flag == "X") {
				sap.ui.getCore().byId("activedeactivehsn1").setSelected(true);
			} else {
				sap.ui.getCore().byId("activedeactivehsn1").setSelected(false);
			}

		},
		onCancel: function () {
			this._addDialog.close();
		},
		onCancel1: function () {
			this._oDialoghsn.close();
		},
		oncreate: function () {

			var oTable = this.byId("hsncode");
			var that = this;
			var oEntry = {};

			var HsnSac = sap.ui.getCore().byId("hsn_saccode").getValue();
			var space = /^\s/;
			if (HsnSac == "" || HsnSac.match(space)) {
				sap.ui.getCore().byId("hsn_saccode").setValueState("Error");
			} else {
				sap.ui.getCore().byId("hsn_saccode").setValueState("None");

				oEntry.HsnSac = sap.ui.getCore().byId("hsn_saccode").getValue();
				oEntry.Matnr = sap.ui.getCore().byId("material").getValue();
				var activedeactive = sap.ui.getCore().byId("activedeactivehsn").getSelected();
				if (activedeactive == true) {
					oEntry.Flag = "X";
				} else {
					oEntry.Flag = " ";
				}

				oModel.create("/HsinCodeSet", oEntry, {
					method: "POST",

					success: function (oData, oResponse) {

						oTable.getModel().refresh(true);
						oTable.getBinding("rows").refresh(true);
						that.onclear();
						that._addDialog.close();
					},
					error: function (cc, vv) {

					}
				});
			}
		},
		oncreate1: function () {

			var oTable = this.byId("hsncode");
			var that = this;
			var oEntry = {};
			var active = sap.ui.getCore().byId("activedeactivehsn1").getSelected();
			if (active == true) {
				oEntry.Flag = "X";
			} else {
				oEntry.Flag = " ";
			}
			var hsnsaccode = sap.ui.getCore().byId("hsn_saccode1").getValue();
			var material1 = sap.ui.getCore().byId("material1").getValue();
			// var oSrc = oEvent.getSource();

			// if (oSrc && oSrc.setValue) {
			// 	oSrc.setValue(oSrc.getValue().toUpperCase());
			// }

			oEntry.HsnSac = hsnsaccode;
			oEntry.Matnr = material1;

			oModel.update("/HsinCodeSet(HsnSac='" + hsnsaccode + "')", oEntry, {
				method: "PUT",

				success: function (oData, oResponse) {
					that._oDialoghsn.close();
					oTable.getModel().refresh(true);
					oTable.getBinding("rows").refresh(true);
					that.onclear1();
				},
				error: function (cc, vv) {

				}
			});
		},
		deleteHSNcode: function (oEvent) {

			var oTable = this.byId("hsncode");
			var hsnsaccode = oEvent.getSource().getBindingContext().getObject().HsnSac;

			oModel.remove("/HsinCodeSet(HsnSac='" + hsnsaccode + "')", {
				method: "DELETE",

				success: function (oData, oResponse) {
					//that._oDialoghsn.close();
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

			sap.ui.getCore().byId("hsn_saccode").setValue("");
			sap.ui.getCore().byId("material").setValue("");
			sap.ui.getCore().byId("activedeactivehsn").setSelected(false);

		},
		onclear1: function () {

			/*sap.ui.getCore().byId("hsn_saccode1").setValue("");*/
			sap.ui.getCore().byId("material1").setValue("");
			sap.ui.getCore().byId("activedeactivehsn1").setSelected(false);

		}

	});

});