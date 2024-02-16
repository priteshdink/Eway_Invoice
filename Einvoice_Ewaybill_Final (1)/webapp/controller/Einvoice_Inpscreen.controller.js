sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/ui/core/UIComponent"
], function (Controller, History, UIComponent) {
	"use strict";
	var ServiceUrl = "/sap/opu/odata/SAP/ZEINVOICE_SRV/";
	var oModel = new sap.ui.model.odata.ODataModel(ServiceUrl);

	return Controller.extend("com.dink.Einvoice.controller.Einvoice_Inpscreen", {

		onInit: function () {

		},
		onNavBack: function () {

			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("TargetView1");
			/*	if (sPreviousHash !== undefined) {
					window.history.go(-1);
				} else {
					oRouter.navTo("TargetView1");
				}*/
		},
		Gerate_EwaybillPage: function () {

			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("Generate_E-wayBill");
		},
		onEwaybillCancle: function () {

			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("E-WayBill_Cancle");
		},
		onCancelPress: function (oEvent) {
			this.byId("SimpleFormChange480_Trial5").setVisible(true);
		},
		onOtherRadioPress: function (oEvent) {
			this.byId("SimpleFormChange480_Trial5").setVisible(false);
		},
		onSearch: function () {

			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			var EinvoiceCompanyCode = this.byId("companyCode").getValue();
			var EinvoiceDocnoFrom = this.byId("docnofrom").getValue();
			var EinvoiceDocnoTO = this.byId("docnoto").getValue();
			var billFrom = this.byId("from").getValue();
			var billTo = this.byId("to").getValue();
			var CancelReason = this.byId("cancelReason").getSelectedKey();
			debugger;
			var SelectedItem = this.byId("rbg3").getSelectedButton().getText();

			if (EinvoiceCompanyCode == "" && EinvoiceDocnoFrom == "" && billFrom == "") {
				this.byId("docnofrom").setValueState("Error");
				this.byId("from").setValueState("Error");
				sap.m.MessageToast.show("Please fill atleast one mandatory field");
			} else if (EinvoiceCompanyCode !== "" && EinvoiceDocnoFrom == "" && billFrom == "") {
				this.byId("docnofrom").setValueState("Error");
				this.byId("from").setValueState("Error");
				sap.m.MessageToast.show("Please fill atleast one mandatory field");
			} else {
				this.byId("docnofrom").setValueState("None");
				this.byId("from").setValueState("None");
				if (SelectedItem == "Generate E - Invoice") {

					if (billFrom == "") {
						billFrom = "0000-00-00T00:00:00";

					}
					if (billTo == "") {
						billTo = "0000-00-00T00:00:00";
					}
					if (EinvoiceDocnoFrom == "") {
						EinvoiceDocnoFrom = "0";
					}
					if (EinvoiceDocnoTO == "") {
						EinvoiceDocnoTO = "0";
					}
					if (EinvoiceCompanyCode == "") {
						EinvoiceCompanyCode = "0";
					}

					if (EinvoiceCompanyCode != "" && EinvoiceDocnoFrom != "" && EinvoiceDocnoTO != "" && billFrom != "" && billTo != "") {

						oRouter.navTo("GenerateEinvoice", {
							from: billFrom,
							to: billTo,
							docFrom: EinvoiceDocnoFrom,
							docTo: EinvoiceDocnoTO,
							companyCode: EinvoiceCompanyCode
						});
					}

				} else if (SelectedItem == "Cancel E - Invoice") {

					if (billFrom == "") {
						billFrom = "0000-00-00T00:00:00";

					}
					if (billTo == "") {
						billTo = "0000-00-00T00:00:00";
					}
					if (EinvoiceDocnoFrom == "") {
						EinvoiceDocnoFrom = "0";
					}
					if (EinvoiceDocnoTO == "") {
						EinvoiceDocnoTO = "0";
					}
					if (EinvoiceCompanyCode == "") {
						EinvoiceCompanyCode = "0";
					}

					if (EinvoiceCompanyCode != "" && EinvoiceDocnoFrom != "" && EinvoiceDocnoTO != "" && billFrom != "" && billTo != "" &&
						CancelReason != "") {

						oRouter.navTo("CancelEinvoice", {
							from: billFrom,
							to: billTo,
							docFrom: EinvoiceDocnoFrom,
							docTo: EinvoiceDocnoTO,
							companyCode: EinvoiceCompanyCode,
							canrsn: CancelReason
						});
					}

				} else if (SelectedItem == "Display E - Invoice") {

					if (billFrom == "") {
						billFrom = "0000-00-00T00:00:00";

					}
					if (billTo == "") {
						billTo = "0000-00-00T00:00:00";
					}
					if (EinvoiceDocnoFrom == "") {
						EinvoiceDocnoFrom = "0";
					}
					if (EinvoiceDocnoTO == "") {
						EinvoiceDocnoTO = "0";
					}
					if (EinvoiceCompanyCode == "") {
						EinvoiceCompanyCode = "0";
					}

					if (EinvoiceCompanyCode != "" && EinvoiceDocnoFrom != "" && EinvoiceDocnoTO != "" && billFrom != "" && billTo != "") {

						oRouter.navTo("EinvoiceDisplay", {
							from: billFrom,
							to: billTo,
							docFrom: EinvoiceDocnoFrom,
							docTo: EinvoiceDocnoTO,
							companyCode: EinvoiceCompanyCode
						});
					}

				} else if (SelectedItem == "Print E - Invoice") {

					if (billFrom == "") {
						billFrom = "0000-00-00T00:00:00";

					}
					if (billTo == "") {
						billTo = "0000-00-00T00:00:00";
					}
					if (EinvoiceDocnoFrom == "") {
						EinvoiceDocnoFrom = "0";
					}
					if (EinvoiceDocnoTO == "") {
						EinvoiceDocnoTO = "0";
					}
					if (EinvoiceCompanyCode == "") {
						EinvoiceCompanyCode = "0";
					}

					if (EinvoiceCompanyCode != "" && EinvoiceDocnoFrom != "" && EinvoiceDocnoTO != "" && billFrom != "" && billTo != "") {

						oRouter.navTo("PdfDisplay", {
							from: billFrom,
							to: billTo,
							docFrom: EinvoiceDocnoFrom,
							docTo: EinvoiceDocnoTO,
							companyCode: EinvoiceCompanyCode
						});
					}

				}

			}

		}

	});

});