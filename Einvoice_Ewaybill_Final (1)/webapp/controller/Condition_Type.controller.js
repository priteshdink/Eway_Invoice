sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/ui/core/UIComponent"
], function (Controller, History, UIComponent) {
	"use strict";
	var ServiceUrl = "/sap/opu/odata/SAP/ZEINVOICE_SRV/";
	var oModel = new sap.ui.model.odata.ODataModel(ServiceUrl);
	return Controller.extend("com.dink.Einvoice.controller.Condition_Type", {

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
				this._addDialog = sap.ui.xmlfragment("com.dink.Einvoice.Fragments.condition_type", this);
			}

			this._addDialog.open();

		},
		onEdit: function (oEvent) {

			if (!this._oDialog) {
				this._oDialog = sap.ui.xmlfragment("com.dink.Einvoice.Fragments.EditCondition_type", this);
			}
			this._oDialog.open();

			var oTable = this.byId("portalDetails");
			// var selectedRow = oTable.getSelectedIndex();
			// var dataContext = oTable.getBinding("rows").getContexts();
			// var SelectedKey = dataContext[selectedRow].sPath.split("/")[1];
			// var selectedData = oTable.getModel().oData[SelectedKey];
			sap.ui.getCore().byId("govcontyp1").setValue(oEvent.getSource().getBindingContext().getObject().CondTyp);
			sap.ui.getCore().byId("sapcontyp1").setSelectedKey(oEvent.getSource().getBindingContext().getObject().GovtCondType);

			if (oEvent.getSource().getBindingContext().getObject().Actflag == "X") {
				sap.ui.getCore().byId("activedeactivecondty1").setSelected(true);
			} else {
				sap.ui.getCore().byId("activedeactivecondty1").setSelected(false);
			}

		},
		onCancel: function () {
			this._addDialog.close();
		},
		onCancel1: function () {
			this._oDialog.close();
		},
		oncreate: function () {

			var oTable = this.byId("conditiontypetable");
			var that = this;
			var oEntry = {};
			var active = sap.ui.getCore().byId("activedeactivecondty").getSelected();
			if (active == true) {
				oEntry.Actflag = "X";
			} else {
				oEntry.Actflag = " ";
			}
			var CondTyp = sap.ui.getCore().byId("govcontyp").getValue();
			var space = /^\s/;
			if (CondTyp == "" || CondTyp.match(space)) {
				sap.ui.getCore().byId("govcontyp").setValueState("Error");
			} else {
				sap.ui.getCore().byId("govcontyp").setValueState("None");

				oEntry.CondTyp = sap.ui.getCore().byId("govcontyp").getValue();
				oEntry.GovtCondType = sap.ui.getCore().byId("sapcontyp").getSelectedKey();

				oModel.create("/CondTypeSet", oEntry, {
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
		deleteconditiontype: function (oEvent) {

			var oTable = this.byId("conditiontypetable");
			var condition = oEvent.getSource().getBindingContext().getObject().CondTyp;

			oModel.remove("/CondTypeSet(CondTyp='" + condition + "')", {
				method: "DELETE",

				success: function (oData, oResponse) {

					oTable.getModel().refresh(true);
					oTable.getBinding("rows").refresh(true);
					// that.onclear();
					// that._addDialog.close();
					sap.m.MessageToast.show("Deleted Successfully");
				},
				error: function (cc, vv) {

				}
			});
		},
		oncreate1: function () {

			var oTable = this.byId("conditiontypetable");
			var that = this;
			var oEntry = {};
			var active = sap.ui.getCore().byId("activedeactivecondty1").getSelected();
			if (active == true) {
				oEntry.Actflag = "X";
			} else {
				oEntry.Actflag = " ";
			}
			var CondTyp1 = sap.ui.getCore().byId("govcontyp1").getValue();
			var GovtCondType1 = sap.ui.getCore().byId("sapcontyp1").getSelectedKey();
			// var oSrc = oEvent.getSource();

			// if (oSrc && oSrc.setValue) {
			// 	oSrc.setValue(oSrc.getValue().toUpperCase());
			// }

			oEntry.CondTyp = CondTyp1;
			oEntry.GovtCondType = GovtCondType1;

			oModel.update("/CondTypeSet(CondTyp='" + CondTyp1 + "')", oEntry, {
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
		onclear: function () {

			sap.ui.getCore().byId("activedeactivecondty").setSelected(false);
			sap.ui.getCore().byId("govcontyp").setValue("");
			sap.ui.getCore().byId("sapcontyp").setValue("");

		},
		onclear1: function () {

			sap.ui.getCore().byId("activedeactivecondty1").setSelected(false);
			/*	sap.ui.getCore().byId("govcontyp1").setValue("");*/
			sap.ui.getCore().byId("sapcontyp1").setValue("");

		}
	});

});