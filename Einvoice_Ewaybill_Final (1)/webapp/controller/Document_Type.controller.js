sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/ui/core/UIComponent"
], function (Controller, History, UIComponent) {
	"use strict";
	var ServiceUrl = "/sap/opu/odata/SAP/ZEINVOICE_SRV/";
	var oModel = new sap.ui.model.odata.ODataModel(ServiceUrl);

	return Controller.extend("com.dink.Einvoice.controller.Document_Type", {
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
			if (!this._addDialogdoctype) {
				this._addDialogdoctype = sap.ui.xmlfragment("com.dink.Einvoice.Fragments.document_type", this);
			}

			this._addDialogdoctype.open();

		},
		onEdit: function (oEvent) {
			if (!this._editDialogdoctype) {
				this._editDialogdoctype = sap.ui.xmlfragment("com.dink.Einvoice.Fragments.EditDoc_Type", this);
			}

			this._editDialogdoctype.open();;
			sap.ui.getCore().byId("govdtypdoctype1").setSelectedKey(oEvent.getSource().getBindingContext().getObject().GovDtyp);
			sap.ui.getCore().byId("sapdoctyp1").setValue(oEvent.getSource().getBindingContext().getObject().SapDtyp);
			sap.ui.getCore().byId("suptyp1").setSelectedKey(oEvent.getSource().getBindingContext().getObject().SupTyp);
			sap.ui.getCore().byId("zmodule1").setSelectedKey(oEvent.getSource().getBindingContext().getObject().Zmodule);
			sap.ui.getCore().byId("service1").setSelectedKey(oEvent.getSource().getBindingContext().getObject().Service);
			sap.ui.getCore().byId("regrev1").setSelectedKey(oEvent.getSource().getBindingContext().getObject().Regrev);
			sap.ui.getCore().byId("igstonintra1").setSelectedKey(oEvent.getSource().getBindingContext().getObject().Igstonintra);
			if (oEvent.getSource().getBindingContext().getObject().PortalFlag == "X") {
				sap.ui.getCore().byId("einvoiceflag1").setSelected(true);
			} else {
				sap.ui.getCore().byId("einvoiceflag1").setSelected(false);
			}

			if (oEvent.getSource().getBindingContext().getObject().EwayBill == "X") {
				sap.ui.getCore().byId("ewaybillflag1").setSelected(true);
			} else {
				sap.ui.getCore().byId("ewaybillflag1").setSelected(false);
			}

			if (oEvent.getSource().getBindingContext().getObject().Vf01Flag == "X") {
				sap.ui.getCore().byId("autoflag1").setSelected(true);
			} else {
				sap.ui.getCore().byId("autoflag1").setSelected(false);
			}

		},
		closedocumenttype: function () {
			this._addDialogdoctype.close();
		},
		closedocumenttype1: function () {
			this._editDialogdoctype.close();
		},
		oncreate: function () {

			var oTable = this.byId("document_type");
			var that = this;
			var oEntry = {};

			var e_invoiceflag = sap.ui.getCore().byId("einvoiceflag").getSelected();
			var e_waybillflag = sap.ui.getCore().byId("ewaybillflag").getSelected();
			var autoflag = sap.ui.getCore().byId("autoflag").getSelected();
			var GovDocType = sap.ui.getCore().byId("govdtypdoctype").getSelectedKey();
			var SapDocType = sap.ui.getCore().byId("sapdoctyp").getValue();
			if (e_invoiceflag == true) {
				oEntry.PortalFlag = "X";
			} else {
				oEntry.PortalFlag = " ";
			}
			if (e_waybillflag == true) {
				oEntry.EwayBill = "X";
			} else {
				oEntry.EwayBill = " ";
			}
			if (autoflag == true) {
				oEntry.Vf01Flag = "X";
			} else {
				oEntry.Vf01Flag = " ";
			}
			var space = /^\s/;
			if (GovDocType == "" || GovDocType.match(space)) {
				sap.ui.getCore().byId("govdtypdoctype").setValueState("Error");
			} else {
				sap.ui.getCore().byId("govdtypdoctype").setValueState("None");
			}
			if (SapDocType == "" || SapDocType.match(space)) {
				sap.ui.getCore().byId("sapdoctyp").setValueState("Error");
			} else {
				sap.ui.getCore().byId("sapdoctyp").setValueState("None");
			}
			if (GovDocType == "" || GovDocType.match(space) || SapDocType == "" || SapDocType.match(space)) {
				sap.m.MessageToast.show("Space is not allowed");
			} else {
				sap.ui.getCore().byId("sapdoctyp").setValueState("None");
				sap.ui.getCore().byId("govdtypdoctype").setValueState("None");
				oEntry.GovDtyp = GovDocType;
				oEntry.SapDtyp = SapDocType;
				oEntry.SupTyp = sap.ui.getCore().byId("suptyp").getSelectedKey();
				oEntry.Zmodule = sap.ui.getCore().byId("zmodule").getSelectedKey();
				oEntry.Service = sap.ui.getCore().byId("service").getSelectedKey();
				oEntry.Regrev = sap.ui.getCore().byId("regrev").getSelectedKey();
				oEntry.Igstonintra = sap.ui.getCore().byId("igstonintra").getSelectedKey();

				oModel.create("/DocTypeSet", oEntry, {
					method: "POST",

					success: function (oData, oResponse) {

						oTable.getModel().refresh(true);
						oTable.getBinding("rows").refresh(true);
						that.onclear();
						that._addDialogdoctype.close();
					},
					error: function (cc, vv) {

					}
				});
			}
		},
		oncreate1: function () {

			var oTable = this.byId("document_type");
			var that = this;
			var oEntry = {};
			var Ef = sap.ui.getCore().byId("einvoiceflag1").getSelected();
			if (Ef == true) {
				oEntry.PortalFlag = "X";
			} else {
				oEntry.PortalFlag = " ";
			}

			var Ewf = sap.ui.getCore().byId("ewaybillflag1").getSelected();
			if (Ewf == true) {
				oEntry.EwayBill = "X";
			} else {
				oEntry.EwayBill = " ";
			}

			var Af = sap.ui.getCore().byId("autoflag1").getSelected();
			if (Af == true) {
				oEntry.Vf01Flag = "X";
			} else {
				oEntry.Vf01Flag = " ";
			}
			var SyId1 = sap.ui.getCore().byId("govdtypdoctype1").getSelectedKey();
			var Method1 = sap.ui.getCore().byId("sapdoctyp1").getValue();
			var Username1 = sap.ui.getCore().byId("suptyp1").getSelectedKey();
			var Password1 = sap.ui.getCore().byId("zmodule1").getSelectedKey();
			var Version1 = sap.ui.getCore().byId("service1").getSelectedKey();
			var VersionJson1 = sap.ui.getCore().byId("regrev1").getSelectedKey();
			var TaxSch1 = sap.ui.getCore().byId("igstonintra1").getSelectedKey();

			oEntry.GovDtyp = SyId1;
			oEntry.SapDtyp = Method1;
			oEntry.SupTyp = Username1;
			oEntry.Zmodule = Password1;
			oEntry.Service = Version1;
			oEntry.Regrev = VersionJson1;
			oEntry.Igstonintra = TaxSch1;

			oModel.update("/DocTypeSet(GovDtyp='" + SyId1 + "',SapDtyp='" + Method1 + "')", oEntry, {
				method: "PUT",

				success: function (oData, oResponse) {
					that._editDialogdoctype.close();
					oTable.getModel().refresh(true);
					oTable.getBinding("rows").refresh(true);
					that.onclear1();
				},
				error: function (cc, vv) {

				}
			});
		},
		onclear: function () {
			sap.ui.getCore().byId("govdtypdoctype").setSelectedKey("");
			sap.ui.getCore().byId("sapdoctyp").setValue("");
			sap.ui.getCore().byId("suptyp").setSelectedKey("");
			sap.ui.getCore().byId("zmodule").setSelectedKey("");
			sap.ui.getCore().byId("service").setSelectedKey("");
			sap.ui.getCore().byId("regrev").setSelectedKey("");
			sap.ui.getCore().byId("igstonintra").setSelectedKey("");

			sap.ui.getCore().byId("einvoiceflag").setSelected(false);
			sap.ui.getCore().byId("ewaybillflag").setSelected(false);
			sap.ui.getCore().byId("autoflag").setSelected(false);
		},
		onclear1: function () {
			/*sap.ui.getCore().byId("govdtypdoctype1").setSelectedKey("");
			sap.ui.getCore().byId("sapdoctyp1").setValue("");*/
			sap.ui.getCore().byId("suptyp1").setSelectedKey("");
			sap.ui.getCore().byId("zmodule1").setSelectedKey("");
			sap.ui.getCore().byId("service1").setSelectedKey("");
			sap.ui.getCore().byId("regrev1").setSelectedKey("");
			sap.ui.getCore().byId("igstonintra1").setSelectedKey("");

			sap.ui.getCore().byId("einvoiceflag1").setSelected(false);
			sap.ui.getCore().byId("ewaybillflag1").setSelected(false);
			sap.ui.getCore().byId("autoflag1").setSelected(false);
		},
		portalDetails: function (oEvent) {;

		},
		deletedocumenttype: function (oEvent) {

			var oTable = this.byId("document_type");
			var Syid1 = oEvent.getSource().getBindingContext().getObject().GovDtyp;
			var Method1 = oEvent.getSource().getBindingContext().getObject().SapDtyp;

			oModel.remove("/DocTypeSet(GovDtyp='" + Syid1 + "',SapDtyp='" + Method1 + "')", {
				method: "DELETE",

				success: function (oData, oResponse) {
					// that._editDialogdoctype.close();
					oTable.getModel().refresh(true);
					oTable.getBinding("rows").refresh(true);
					// that.onclear1();
					sap.m.MessageToast.show("Deleted Successfully");
				},
				error: function (cc, vv) {

				}
			});
		},
	});

});