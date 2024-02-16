sap.ui.define([
	"sap/ui/core/mvc/Controller",
	'sap/ui/model/Filter',
	"sap/ui/model/FilterOperator",
	"sap/ui/model/FilterType",
	"sap/m/PDFViewer",
], function (Controller, Filter, FilterOperator, FilterType, PDFViewer) {
	"use strict";
	var ServiceUrl = "/sap/opu/odata/sap/ZEWAY_BILL_SRV/";
	var oModel = new sap.ui.model.odata.ODataModel(ServiceUrl);
	return Controller.extend("com.dink.Einvoice.controller.Print_E-waybill", {

		onInit: function () {

			this._pdfViewer = new PDFViewer();
			this.getView().addDependent(this._pdfViewer);

			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("Print_E-waybill").attachPatternMatched(this._onObjectMatched, this);

		},
		_onObjectMatched: function (oEvent) {
			var omodel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZEWAY_BILL_SRV/");
			this.getView().setModel(omodel);
			var Date1 = oEvent.getParameter("arguments").Date1;
			var Date2 = oEvent.getParameter("arguments").Date2;

			var BillNoFrom = oEvent.getParameter("arguments").BillNo;
			var BillNoTo = oEvent.getParameter("arguments").BillNoTo;
			var EwaybilNo = oEvent.getParameter("arguments").EwaybilNo;
			var EwaybilNoTo = oEvent.getParameter("arguments").EwaybilNoTo;

			var olist = this.getView().byId("Print_EWaybill_Display").getBinding("rows");
			var aFilters = [];

			if (Date1 !== "0000-00-00T00:00:00" || Date2 !== "0000-00-00T00:00:00") {
				aFilters.push(
					new Filter("Fkdat", FilterOperator.BT, Date1, Date2));
			}
			if (BillNoFrom !== "0000000000" || BillNoTo !== "0000000000") {
				aFilters.push(
					new Filter("Vbeln", FilterOperator.BT, BillNoFrom, BillNoTo));
			}
			if (EwaybilNo !== "000000000000" || EwaybilNoTo !== "000000000000") {
				aFilters.push(
					new Filter("Ebillno", FilterOperator.BT, EwaybilNo, EwaybilNoTo));
			}
			olist.filter(aFilters);
		},
		onNavBack: function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("Eway_Bill");
		},
		Print_EWAYBill_Press: function (oEvent) {
			debugger;
			var a = new sap.m.BusyDialog();
			a.open();
			var that = this;
			var oTable = this.byId("Print_EWaybill_Display");

			var selectedContext = oTable.getSelectedIndices()[0];

			if (selectedContext >= 0) {

				var Docno = oTable.getBinding().getContexts()[selectedContext].sPath.split("'")[3];

				oModel.read("/PDFSet('" + Docno + "')/$value", {
					Method: "GET",
					success: function (oData, oResponse) {
						var URL = oResponse.requestUri;
						that._pdfViewer = new PDFViewer();
						that._pdfViewer.setTitle("My Custom Title");
						that._pdfViewer.setSource(URL);
						a.close();
						that._pdfViewer.open();

					},
					error: function (cc, vv) {
						sap.m.MessageToast.show("Somthing is wrong. Please contact your Backend Administrator");
					}
				});

			} else {
				sap.m.MessageToast.show("Please select list item");
			}

		}

	});

});