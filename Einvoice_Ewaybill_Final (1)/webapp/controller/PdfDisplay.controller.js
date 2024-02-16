sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/m/PDFViewer",
	"sap/ui/core/routing/History",
	"sap/ui/core/UIComponent"
], function (Controller, Filter, FilterOperator, PDFViewer, History, UIComponent) {
	"use strict";
	var ServiceUrl = "/sap/opu/odata/SAP/ZEINVOICE_SRV/";
	var oModel = new sap.ui.model.odata.ODataModel(ServiceUrl);
	return Controller.extend("com.dink.Einvoice.controller.PdfDisplay", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf com.dink.Einvoice.view.PdfDisplay
		 */
		onInit: function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("PdfDisplay").attachPatternMatched(this._onObjectMatched, this);
		},
		_onObjectMatched: function (oEvent) {

			var From = oEvent.getParameter("arguments").from;
			var To = oEvent.getParameter("arguments").to;
			var DocFrom = oEvent.getParameter("arguments").docFrom;
			var DocTo = oEvent.getParameter("arguments").docTo;
			var CompanyCode = oEvent.getParameter("arguments").companyCode;
			DocFrom = DocFrom.padStart(10, 0);
			DocTo = DocTo.padStart(10, 0);
			var aFilter = [];
			debugger;
			if (From !== "" && To !== "" && From !== "0000-00-00T00:00:00" && To !== "0000-00-00T00:00:00") {
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

			// filter binding
			var oList = this.byId("printEinvoice");
			var oBinding = oList.getBinding("rows");
			oBinding.filter(aFilter);
			// oList.bindItems("/EinvgenSet");
			/*oList.bindAggregation("items", {
				path: "/EinvgenSet",
				filters: aFilter
			});*/

			/*	oList.bindAggregation("items",{path: "/EinvgenSet",filters: aFilter});*/

		},
		onPrint: function (oEvent) {
			debugger;
			var that = this;
			var oTable = this.byId("printEinvoice");
			var tableContext = oTable.getBinding().getContexts();
			var selectedContext = oTable.getSelectedIndices()[0];
			var selectedContextLength = oTable.getSelectedIndices().length;

			if (selectedContext >= 0) {

				var Docno = oTable.getBinding().getContexts()[selectedContext].sPath.split("'")[1];
				var documentno = Docno.padStart(10, 0);

				oModel.read("/PDFSet('" + documentno + "')/$value", {
					Method: "GET",
					success: function (oData, oResponse) {
						var URL = oResponse.requestUri;
						that._pdfViewer = new PDFViewer();
						that._pdfViewer.setTitle("My Custom Title");
						that._pdfViewer.setSource(URL);
						that._pdfViewer.open();

					},
					error: function (cc, vv) {
						sap.m.MessageToast.show("Somthing is wrong. Please contact your Backend Administrator");
					}
				});

			} else {
				sap.m.MessageToast.show("Please select list item");
			}

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
		 * @memberOf com.dink.Einvoice.view.PdfDisplay
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf com.dink.Einvoice.view.PdfDisplay
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf com.dink.Einvoice.view.PdfDisplay
		 */
		//	onExit: function() {
		//
		//	}

	});

});