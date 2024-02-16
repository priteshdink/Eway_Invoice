sap.ui.define([
	"sap/ui/core/mvc/Controller",
	'sap/ui/model/Filter',
	"sap/ui/model/FilterOperator",
	"sap/ui/model/FilterType"
], function (Controller, Filter, FilterOperator, FilterType) {
	"use strict";

	return Controller.extend("com.dink.Einvoice.controller.Display_e-Waybill", {

		onInit: function () {

			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("Display_e-Waybill").attachPatternMatched(this._onObjectMatched, this);

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

			var olist = this.getView().byId("Display_Ewaybill").getBinding("rows");
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
		}
	});

});