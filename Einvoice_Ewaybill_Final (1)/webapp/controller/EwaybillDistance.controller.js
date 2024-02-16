sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/ui/core/UIComponent"
], function (Controller, History, UIComponent) {
	"use strict";
	var ServiceUrl = "/sap/opu/odata/SAP/ZEINVOICE_SRV/";
	var oModel = new sap.ui.model.odata.ODataModel(ServiceUrl);

	return Controller.extend("com.dink.Einvoice.controller.EwaybillDistance", {

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
			if (!this._addDialogewd) {
				this._addDialogewd = sap.ui.xmlfragment("com.dink.Einvoice.Fragments.AddEwaybillDistance", this);
			}

			this._addDialogewd.open();

		},
		onEdit: function (oEvent) {

			if (!this._oDialog) {
				this._oDialog = sap.ui.xmlfragment("com.dink.Einvoice.Fragments.EditEwaybillDistance", this);

			}
			this._oDialog.open();

			// var oTable = this.byId("ewaydistancetable");
			// var selectedRow = oTable.getSelectedIndex();
			// var dataContext = oTable.getBinding("rows").getContexts();
			// var SelectedKey = dataContext[selectedRow].sPath.split("/")[1];
			// var selectedData = oTable.getModel().oData[SelectedKey];

			var oTable = this.byId("ewaydistancetable");
			// var selectedRow = oTable.getSelectedIndex();
			// var dataContext = oTable.getBinding("rows").getContexts();
			// var SelectedKey = dataContext[selectedRow].sPath.split("/")[1];
			// var selectedData = oTable.getModel().oData[SelectedKey];

			sap.ui.getCore().byId("sellerCode1").setValue(oEvent.getSource().getBindingContext().getObject().PlantPin);
			sap.ui.getCore().byId("buyerCode1").setValue(oEvent.getSource().getBindingContext().getObject().BuyerId);
			sap.ui.getCore().byId("distance1").setValue(oEvent.getSource().getBindingContext().getObject().Distance);

			if (oEvent.getSource().getBindingContext().getObject().Active == "X") {
				sap.ui.getCore().byId("activedeactiveewd1").setSelected(true);
			} else {
				sap.ui.getCore().byId("activedeactiveewd1").setSelected(false);
			}

		},
		onCancel: function () {
			this._addDialogewd.close();
		},
		onCancel1: function () {
			this._oDialog.close();
		},
		oncreate: function () {

			var oTable = this.byId("ewaydistancetable");
			var that = this;
			var oEntry = {};
			var active = sap.ui.getCore().byId("activedeactiveewd").getSelected();
			if (active == true) {
				oEntry.Active = "X";
			} else {
				oEntry.Active = " ";
			}
			var SellerCode = sap.ui.getCore().byId("sellerCode").getValue();
			var BuyerCode = sap.ui.getCore().byId("buyerCode").getValue();
			var Distance = sap.ui.getCore().byId("distance").getValue();
			var space = /^\s/;
			if (SellerCode == "" || SellerCode.match(space)) {
				sap.ui.getCore().byId("sellerCode").setValueState("Error");
			} else {
				sap.ui.getCore().byId("sellerCode").setValueState("None");
			}
			if (BuyerCode == "" || BuyerCode.match(space)) {
				sap.ui.getCore().byId("buyerCode").setValueState("Error");
			} else {
				sap.ui.getCore().byId("buyerCode").setValueState("None");
			}
			if (SellerCode == "" || SellerCode.match(space) || BuyerCode == "" || BuyerCode.match(space)) {
				sap.m.MessageToast.show("Space is not allowed");
			} else {
				sap.ui.getCore().byId("sellerCode").setValueState("None");
				sap.ui.getCore().byId("buyerCode").setValueState("None");

				oEntry.PlantPin = sap.ui.getCore().byId("sellerCode").getValue();
				oEntry.BuyerId = sap.ui.getCore().byId("buyerCode").getValue();
				oEntry.Distance = Distance;

				oModel.create("/Trans_distanceSet", oEntry, {
					method: "POST",

					success: function (oData, oResponse) {
						that._addDialogewd.close();
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

			var oTable = this.byId("ewaydistancetable");
			var that = this;
			var oEntry = {};
			var active = sap.ui.getCore().byId("activedeactiveewd1").getSelected();
			if (active == true) {
				oEntry.Active = "X";
			} else {
				oEntry.Active = " ";
			}
			var SellerCode1 = sap.ui.getCore().byId("sellerCode1").getValue();
			var BuyerCode1 = sap.ui.getCore().byId("buyerCode1").getValue();
			var Distance1 = sap.ui.getCore().byId("distance1").getValue();
			// var oSrc = oEvent.getSource();

			// if (oSrc && oSrc.setValue) {
			// 	oSrc.setValue(oSrc.getValue());
			// }

			oEntry.PlantPin = SellerCode1;
			oEntry.BuyerId = BuyerCode1;
			oEntry.Distance = Distance1;

			oModel.update("/Trans_distanceSet(PlantPin='" + SellerCode1 + "',BuyerId='" + BuyerCode1 + "')", oEntry, {
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

			var oTable = this.byId("ewaydistancetable");
			var plantPin = oEvent.getSource().getBindingContext().getObject().PlantPin;
			var buyerId = oEvent.getSource().getBindingContext().getObject().BuyerId;

			oModel.remove("/Trans_distanceSet(PlantPin='" + plantPin + "',BuyerId='" + buyerId + "')", {
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

			sap.ui.getCore().byId("activedeactiveewd").setSelected(false);
			sap.ui.getCore().byId("sellerCode").setValue("");
			sap.ui.getCore().byId("buyerCode").setValue("");
			sap.ui.getCore().byId("distance").setValue("");

		},
		onclear1: function () {

			sap.ui.getCore().byId("activedeactiveewd1").setSelected(false);
			sap.ui.getCore().byId("distance1").setValue("");
			/*	sap.ui.getCore().byId("govtuom1").setValue("");
				sap.ui.getCore().byId("sapuom1").setValue("");*/

		}

	});

});