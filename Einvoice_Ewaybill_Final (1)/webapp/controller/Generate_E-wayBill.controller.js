sap.ui.define([
	"sap/ui/core/mvc/Controller",
	'sap/ui/model/Filter',
	"sap/ui/model/FilterOperator",
	"sap/ui/model/FilterType"
], function (Controller, Filter, FilterOperator, FilterType) {
	"use strict";

	var ServiceUrl = "/sap/opu/odata/sap/ZEWAY_BILL_SRV/";
	var oModel = new sap.ui.model.odata.ODataModel(ServiceUrl);
	oModel.setDefaultCountMode(sap.ui.model.odata.CountMode.None);

	var Supply_type;
	var Sub_Supply_type;
	var Transaction_Type;
	var Transportation_Mode;
	var Transporter_Id;
	var Transporter_Name;
	var Vehicle_Type;
	var Vehicle_No;
	var Transporter_Document_No;
	var Sub_supply_Description;
	return Controller.extend("com.dink.Einvoice.controller.Generate_E-wayBill", {

		onInit: function () {

			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("Generate_E-wayBill").attachPatternMatched(this._onObjectMatched, this);

		},

		_onObjectMatched: function (oEvent) {

			var Date1 = oEvent.getParameter("arguments").Date1;
			var Date2 = oEvent.getParameter("arguments").Date2;
			var BillNoFrom = oEvent.getParameter("arguments").BillNo;
			var BillNoTo = oEvent.getParameter("arguments").BillNoTo;
			var EwaybilNo = oEvent.getParameter("arguments").EwaybilNo;
			var EwaybilNoTo = oEvent.getParameter("arguments").EwaybilNoTo;

			Supply_type = oEvent.getParameter("arguments").Supply_type;
			Sub_Supply_type = oEvent.getParameter("arguments").Sub_Supply_type;
			Sub_supply_Description = oEvent.getParameter("arguments").Sub_supply_Description;
			Transaction_Type = oEvent.getParameter("arguments").Transaction_Type;
			Transportation_Mode = oEvent.getParameter("arguments").Transportation_Mode;
			Transporter_Id = oEvent.getParameter("arguments").Transporter_Id;
			Transporter_Name = oEvent.getParameter("arguments").Transporter_Name;
			Vehicle_Type = oEvent.getParameter("arguments").Vehicle_Type;
			Vehicle_No = oEvent.getParameter("arguments").Vehicle_No;
			Transporter_Document_No = oEvent.getParameter("arguments").Transporter_Document_No;

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
			if (Supply_type !== "E") {
				aFilters.push(
					new Filter("Supply", FilterOperator.EQ, Supply_type));
			}
			if (Sub_Supply_type !== "E") {
				aFilters.push(
					new Filter("Subsupply", FilterOperator.EQ, Sub_Supply_type));
			}
			if (Transaction_Type !== "E") {
				aFilters.push(
					new Filter("TranType", FilterOperator.EQ, Transaction_Type));
			}
			if (Transportation_Mode !== "E") {
				aFilters.push(
					new Filter("TranMode", FilterOperator.EQ, Transportation_Mode));
			}
			aFilters.push(
				new Filter("TransporterId", FilterOperator.EQ, Transporter_Id));
			if (Transporter_Name !== "00") {
				aFilters.push(
					new Filter("TransporterName", FilterOperator.EQ, Transporter_Name));
			}
			if (Vehicle_Type !== "E") {
				aFilters.push(
					new Filter("VehType", FilterOperator.EQ, Vehicle_Type));
			}
			if (Vehicle_No !== "00") {
				aFilters.push(
					new Filter("VehicleNo", FilterOperator.EQ, Vehicle_No));
			}
			if (Transporter_Document_No !== "00") {
				aFilters.push(
					new Filter("Transdocno", FilterOperator.EQ, Transporter_Document_No));
			}
			if (Sub_supply_Description !== "00") {
				aFilters.push(
					new Filter("SsDesc", FilterOperator.EQ, Sub_supply_Description));
			}

			var olist = this.getView().byId("Ewaybill_Display_Table");
			this.byId("Ewaybill_Display_Table").setVisible(true);
			var tabledata = olist.getBinding("rows");

			tabledata.filter(aFilters);

			/*	olist.getBinding("rows").refresh(true);*/

		},
		OnLinkPress: function (oEvent) {
			debugger;
			var a = new sap.m.BusyDialog();
			a.open();
			if (!this._oDialogShow) {
				this._oDialogShow = sap.ui.xmlfragment("com.dink.Einvoice.Fragments.E_WaybillShowmore", this);

				this._oDialogShow.setModel(oModel);
			}
			this._oDialogShow.open();

			var documentno = oEvent.getSource().getProperty("text");

			if (documentno.length < 10) {

				documentno = documentno.padStart(10, 0);
			}

			var otable = sap.ui.getCore().byId("table2");
			sap.ui.getCore().byId("Vbeln").setText("Documents Details" + "(" + documentno + ")");
			/*	otable.bindAggregation("items", {
					path: "/EinvgenSet('"+documentno+"')/NavFromEinvgenToEinvgen_item"
				
				});*/
			a.close();
			otable.bindRows("/EbillSet('" + documentno + "')/NavFromEbillToEbillItem");

			otable.setVisible(true);
			/*	var oList1 = this.byId("generateEinvoice1");
				oList1.setVisible(false);*/

			/*	this.byId("table3").setVisible(false);
				var linkpress = oEvent.getSource().getProperty("text");
				var billnofrom = linkpress.padStart(10, "0");

				this.byId("table2").setVisible(true);

				this.byId("table2").bindRows("Ewaybill>/EbillSet('" + billnofrom + "')/NavFromEbillToEbillItem");*/

		},

		onCancel1: function () {
			debugger;
			this._oDialogShow.close();
		},
		Generate_EWAYBill_Press: function (oEvent) {
			debugger;
			this.byId("Generate_Table").setVisible(false);
			var oList1 = this.byId("Generate_Table");

			var oList = this.byId("Ewaybill_Display_Table");
			var tableContext = oList.getBinding().getContexts();
			var selectedContext = oList.getSelectedIndices();
			var aFilter = [];

			for (var i = 0; i < selectedContext.length; i++) {

				var data = tableContext[selectedContext[i]];

				var documentno = data.sPath.split("'")[1];

				if (documentno.length < 10) {

					documentno = documentno.padStart(10, 0);
				}

				aFilter.push(new Filter("Vbeln", FilterOperator.EQ, documentno));
			}
			this.byId("Generate_Table").setVisible(true);
			var oBinding = oList1.getBinding("rows");
			oBinding.filter(aFilter);
			oList1.setVisible(true);
		},
		onNavBack: function () {
			this.byId("Generate_Table").setVisible(false);
			this.byId("Ewaybill_Display_Table").setVisible(false);
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("Eway_Bill");
		},
		onCancel: function () {
			this._editDialogforDistance.close();

		},

	});

});