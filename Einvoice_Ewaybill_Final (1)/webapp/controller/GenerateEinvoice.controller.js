sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/core/routing/History",
	"sap/ui/core/UIComponent"
], function (Controller, Filter, FilterOperator, History, UIComponent) {
	"use strict";

	return Controller.extend("com.dink.Einvoice.controller.GenerateEinvoice", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf Eway_Bill.Eway_Bill.view.GenerateEinvoice
		 */
		onInit: function () {

			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("GenerateEinvoice").attachPatternMatched(this._onObjectMatched, this);

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
			var oList = this.byId("generateEinvoice");
			var oBinding = oList.getBinding("rows");
			oBinding.filter(aFilter);
			// oList.bindItems("/EinvgenSet");
			/*oList.bindAggregation("items", {
				path: "/EinvgenSet",
				filters: aFilter
			});*/

			/*	oList.bindAggregation("items",{path: "/EinvgenSet",filters: aFilter});*/

		},
		onDocumentNoPress: function (oEvent) {

			var documentno = oEvent.oSource.mProperties.text;

			if (documentno.length < 10) {

				documentno = documentno.padStart(10, 0);
			}

			var otable = this.byId("documentitem");
			/*	otable.bindAggregation("items", {
					path: "/EinvgenSet('"+documentno+"')/NavFromEinvgenToEinvgen_item"
				
				});*/
			otable.bindRows("/EinvgenSet('" + documentno + "')/NavFromEinvgenToEinvgen_item");

			otable.setVisible(true);
			var oList1 = this.byId("generateEinvoice1");
			oList1.setVisible(false);

		},
		onPressGenerate: function (oEvent) {

			var oList1 = this.byId("generateEinvoice1");
			oList1.setVisible(false);
			var oList = this.byId("generateEinvoice");
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

			var oBinding = oList1.getBinding("rows");
			oBinding.filter(aFilter);

			// var oList = this.byId("generateEinvoice");

			// var oList1 = this.byId("generateEinvoice1");
			oList1.setVisible(true);

			oList.clearSelection();
			// oList.getModel().refresh(true);
			//oList.getBinding("rows").refresh(true);

			var otable = this.byId("documentitem");
			otable.setVisible(false);

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

		},
		onShowMore: function (oEvent) {
			if (!this._oDialogShow) {
				this._oDialogShow = sap.ui.xmlfragment("com.dink.Einvoice.Fragments.ShowMore", this);

				this._oDialogShow.setModel(this.getView().getModel());
			}
			this._oDialogShow.open();

			var documentno = oEvent.getSource().getBindingContext().getObject().Vbeln;

			if (documentno.length < 10) {

				documentno = documentno.padStart(10, 0);
			}

			var otable = sap.ui.getCore().byId("documentitem");
			/*	otable.bindAggregation("items", {
					path: "/EinvgenSet('"+documentno+"')/NavFromEinvgenToEinvgen_item"
				
				});*/
			otable.bindRows("/EinvgenSet('" + documentno + "')/NavFromEinvgenToEinvgen_item");

			otable.setVisible(true);
			var oList1 = this.byId("generateEinvoice1");
			oList1.setVisible(false);

		},
		onclose: function (oEvent) {
			this._oDialogShow.close();
		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf Eway_Bill.Eway_Bill.view.GenerateEinvoice
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf Eway_Bill.Eway_Bill.view.GenerateEinvoice
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf Eway_Bill.Eway_Bill.view.GenerateEinvoice
		 */
		//	onExit: function() {
		//
		//	}

	});

});