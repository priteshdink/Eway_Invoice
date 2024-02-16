sap.ui.define([
	"sap/ui/core/mvc/Controller",
	'sap/ui/model/Filter',
	"sap/ui/model/FilterOperator",
	"sap/ui/model/FilterType"
], function (Controller, Filter, FilterOperator, FilterType) {
	"use strict";
	var CnlRsn;
	return Controller.extend("com.dink.Einvoice.controller.Ewaybill_Cancel", {

		onInit: function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("Ewaybill_Cancel").attachPatternMatched(this._onObjectMatched, this);

		},
		_onObjectMatched: function (oEvent) {
			this.byId("Display_Cancel_Ewaybill_List").setVisible(true);
			var Date1 = oEvent.getParameter("arguments").Date1;
			var Date2 = oEvent.getParameter("arguments").Date2;
			var BillNoFrom = oEvent.getParameter("arguments").BillNo;
			var BillNoTo = oEvent.getParameter("arguments").BillNoTo;
			var EwaybilNo = oEvent.getParameter("arguments").EwaybilNo;
			var EwaybilNoTo = oEvent.getParameter("arguments").EwaybilNoTo;
			CnlRsn = oEvent.getParameter("arguments").CnlRsn;

			var olist1 = this.getView().byId("Display_Cancel_Ewaybill_List");
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

			var olist = olist1.getBinding("rows");
			olist.filter(aFilters);

		},
		onNavBack: function () {
			this.byId("Display_Cancel_Ewaybill_List").setVisible(false);
			this.byId("Canceled_Data_Table").setVisible(false);
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("Eway_Bill");
		},
		Cancel_EWAYBill_Press: function () {
			debugger;
			var oList = this.byId("Display_Cancel_Ewaybill_List");

			var tableContext = oList.getBinding().getContexts();
			var selectedContext = oList.getSelectedIndices();
			var othis = this;
			if (selectedContext >= 0) {
				var oDialog = new sap.m.Dialog({
					icon: "sap-icon://delete",
					title: "Cancel E-wayBill",

					content: [new sap.m.Text({
						text: "Are you sure you want to Cancel IRN?"

					})],
					beginButton: new sap.m.Button({
						text: "Yes",
						press: function () {
						//	othis.byId("Canceled_Data_Table").setVisible(true);
							var oList1 = othis.byId("Canceled_Data_Table");
							oList1.setVisible(true);
							var aFilter = [];

							for (var i = 0; i < selectedContext.length; i++) {

								var data = tableContext[selectedContext[i]];

								var documentno = data.sPath.split("'")[3];
								var Vbeln = data.sPath.split("'")[1];

								aFilter.push(new Filter("Ebillno", FilterOperator.EQ, documentno));
								aFilter.push(new Filter("CnlRsn", FilterOperator.EQ, CnlRsn));
								/*	aFilter.push(new Filter("Vbeln", FilterOperator.EQ, Vbeln));*/
							}

							var oBinding = oList1.getBinding("rows");
							oBinding.filter(aFilter);
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

		}

	});

});