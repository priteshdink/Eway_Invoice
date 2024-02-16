sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/core/UIComponent",
	"sap/ui/core/routing/History",
], function (Controller, Filter, FilterOperator, UIComponent, History) {
	"use strict";
	var ServiceUrl = "/sap/opu/odata/SAP/ZEINVOICE_SRV/";
	var oModel = new sap.ui.model.odata.ODataModel(ServiceUrl);
	oModel.setDefaultCountMode(sap.ui.model.odata.CountMode.None);
	oModel.setSizeLimit(10000);
	var CancelReason;

	return Controller.extend("com.dink.Einvoice.controller.CancelEinvoice", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf com.dink.Einvoice.view.CancelEinvoice
		 */
		onInit: function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("CancelEinvoice").attachPatternMatched(this._onObjectMatched, this);
		},
		_onObjectMatched: function (oEvent) {
			
			var From = oEvent.getParameter("arguments").from;
			var To = oEvent.getParameter("arguments").to;
			var DocFrom = oEvent.getParameter("arguments").docFrom;
			var DocTo = oEvent.getParameter("arguments").docTo;
			var CompanyCode = oEvent.getParameter("arguments").companyCode;
			CancelReason = oEvent.getParameter("arguments").canrsn;
			DocFrom = DocFrom.padStart(10, 0);
			DocTo = DocTo.padStart(10, 0);
			var aFilter = [];

			if (From !== "" && To !== "") {
				aFilter.push(new Filter("Fkdat", FilterOperator.BT, From, To));
			}
			if (DocFrom !== "" && DocTo !== "" && DocFrom !== "0000000000" && DocTo !== "0000000000") {
				aFilter.push(new Filter("Vbeln", FilterOperator.BT, DocFrom, DocTo));
			}
			if (DocFrom !== "" && DocTo !== "" && DocFrom !== "0000000000" && DocTo == "0000000000") {
				aFilter.push(new Filter("Vbeln", FilterOperator.EQ, DocFrom));
			}
			if (CompanyCode !== "" && CompanyCode !== "0") {
				aFilter.push(new Filter("Bukrs", FilterOperator.EQ, CompanyCode));
			}
			if (CancelReason !== "") {
				aFilter.push(new Filter("CnlRsn", FilterOperator.EQ, CancelReason));
			}

			// filter binding
			var oList = this.byId("cancelEinvoice");
			var oBinding = oList.getBinding("rows");
			oBinding.filter(aFilter);
			// oList.bindItems("/EinvgenSet");
			/*oList.bindAggregation("items", {
				path: "/EinvgenSet",
				filters: aFilter
			});*/

			/*	oList.bindAggregation("items",{path: "/EinvgenSet",filters: aFilter});*/

		},
		onPressCancel: function (oEvent) {
			
			var oList1 = this.byId("cancelEinvoice1");

			var otable = this.byId("cancelEinvoice");
			otable.getModel().setSizeLimit(10000);
			var tableContext = otable.getBinding().getContexts();
			var selectedLength = otable.getSelectedIndices().length;
			var othis = this;

			if (selectedLength > 0) {
				var oDialog = new sap.m.Dialog({
					icon: "sap-icon://delete",
					title: "Cancel IRN",

					content: [new sap.m.Text({
						text: "Are you sure you want to Cancel IRN?"

					})],
					beginButton: new sap.m.Button({
						text: "Yes",
						press: function () {
							oList1.setVisible(false);
							othis.onCancelIRN();
							oDialog.close();
						}
					}),
					endButton: new sap.m.Button({
						text: "No",
						press: function () {
							oDialog.close();
						}
					})
				});
				oDialog.open();
			} else {
				sap.m.MessageToast.show("Please select item for Cancel IRN");
			}

		},
		onCancelIRN: function () {
			

			var otable = this.byId("cancelEinvoice");
			var tableContext = otable.getBinding().getContexts();
			var selectedContextLength = otable.getSelectedIndices().length;
			var aFilter = [];
			for (var i = 0; i < selectedContextLength; i++) {

				var selectedContext = otable.getSelectedIndices()[i];
				var data = tableContext[selectedContext];
				var sPath = data.sPath;
				var odata = data.oModel.oData[sPath.split("/")[1]];

				var documentno = odata.Vbeln;
				var Bukrs = odata.Bukrs;
				var CnlRsn = odata.CnlRsn;
				var Gjahr = odata.Gjahr;
				var Bupla = odata.Bupla;

				if (documentno.length < 10) {

					documentno = documentno.padStart(10, 0);
				}

				if (documentno !== "") {
					aFilter.push(new Filter("Vbeln", FilterOperator.EQ, documentno));
				}
				if (Bukrs !== "") {
					aFilter.push(new Filter("Bukrs", FilterOperator.EQ, Bukrs));
				}
				if (CnlRsn !== "") {
					aFilter.push(new Filter("CnlRsn", FilterOperator.EQ, CnlRsn));
				}
				if (Gjahr !== "") {
					aFilter.push(new Filter("Gjahr", FilterOperator.EQ, Gjahr));
				}
				if (Bupla !== "") {
					aFilter.push(new Filter("Bupla", FilterOperator.EQ, Bupla));
				}
			}
			this.byId("cancelEinvoice").getBinding("rows").refresh(true);
			var oList1 = this.byId("cancelEinvoice1");
			var oBinding = oList1.getBinding("rows");
			oBinding.filter(aFilter);

			/*	var oList = this.byId("generateEinvoice");

				var oList1 = this.byId("generateEinvoice1");
				oList1.setVisible(true);*/

			otable.clearSelection();
			oList1.setVisible(true);
			// oList.getModel().refresh(true);
		},
		onBack: function () {
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				oRouter.navTo("Einvoice_Inpscreen");
			}

		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf com.dink.Einvoice.view.CancelEinvoice
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf com.dink.Einvoice.view.CancelEinvoice
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf com.dink.Einvoice.view.CancelEinvoice
		 */
		//	onExit: function() {
		//
		//	}

	});

});