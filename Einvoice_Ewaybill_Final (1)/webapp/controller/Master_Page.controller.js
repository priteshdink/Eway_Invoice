sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/ui/core/UIComponent"
], function (Controller, History, UIComponent) {
	"use strict";
	var ServiceUrl = "/sap/opu/odata/SAP/ZEINVOICE_SRV/";
	var oModel = new sap.ui.model.odata.ODataModel(ServiceUrl);
	return Controller.extend("com.dink.Einvoice.controller.Master_Page", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf com.dink.Einvoice.view.Master_Page
		 */
		onInit: function () {

			var oRouters = sap.ui.core.UIComponent.getRouterFor(this);
			oRouters.getRoute("Master_Page").attachPatternMatched(this._onObjectMatched, this);
		},
		_onObjectMatched: function (oEvent) {
			var that = this;
			oModel.read("/Portal_detailsSet/$count", {

				method: "GET",
				success: function (data, oResponse) {

					var portalDetailsCount = oResponse.body;
					that.byId("portalDetails").setValue(portalDetailsCount);

				}
			});
			oModel.read("/UserAcessSet/$count", {

				method: "GET",
				success: function (data, oResponse) {

					var useraccessDetailsCount = oResponse.body;
					that.byId("useraccessdetails").setValue(useraccessDetailsCount);

				}
			});
			oModel.read("/PortalUrlSet/$count", {

				method: "GET",
				success: function (data, oResponse) {

					var portalurlCount = oResponse.body;
					that.byId("portalurl").setValue(portalurlCount);

				}
			});
			oModel.read("/UserAcessSet/$count", {

				method: "GET",
				success: function (data, oResponse) {

					var useraccessDetailsCount = oResponse.body;
					that.byId("useraccessdetails").setValue(useraccessDetailsCount);

				}
			});
			oModel.read("/DocTypeSet/$count", {

				method: "GET",
				success: function (data, oResponse) {

					var documenttypeCount = oResponse.body;
					that.byId("documenttype").setValue(documenttypeCount);

				}
			});
			oModel.read("/StateCodeSet/$count", {

				method: "GET",
				success: function (data, oResponse) {

					var statecodesetCount = oResponse.body;
					that.byId("statecode").setValue(statecodesetCount);

				}
			});
			oModel.read("/UOMCodeSet/$count", {

				method: "GET",
				success: function (data, oResponse) {

					var uomcodeCount = oResponse.body;
					that.byId("uomcode").setValue(uomcodeCount);

				}
			});
			oModel.read("/CondTypeSet/$count", {

				method: "GET",
				success: function (data, oResponse) {

					var conditiontypeCount = oResponse.body;
					that.byId("conditiontype").setValue(conditiontypeCount);

				}
			});
			oModel.read("/EinvAuthSet/$count", {

				method: "GET",
				success: function (data, oResponse) {

					var EinvoiceAuthoCount = oResponse.body;
					that.byId("authorization").setValue(EinvoiceAuthoCount);

				}
			});
			oModel.read("/HsinCodeSet/$count", {

				method: "GET",
				success: function (data, oResponse) {

					var HSNcodeCount = oResponse.body;
					that.byId("hsncoderatemaster").setValue(HSNcodeCount);

				}
			});

			oModel.read("/Transporter_detailsSet/$count", {

				method: "GET",
				success: function (data, oResponse) {

					var HSNcodeCount = oResponse.body;
					that.byId("Transmaster").setValue(HSNcodeCount);

				}
			});

			oModel.read("/Trans_distanceSet/$count", {

				method: "GET",
				success: function (data, oResponse) {

					var HSNcodeCount = oResponse.body;
					that.byId("Ewaybilldistancemaster").setValue(HSNcodeCount);

				}
			});

			oModel.read("/EwayAuthSet/$count", {

				method: "GET",
				success: function (data, oResponse) {

					var HSNcodeCount = oResponse.body;
					that.byId("Ewaybillauthmaster").setValue(HSNcodeCount);

				}
			});
		},
		onBack: function () {
			/*	var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("Create_Compliance_Repository", null, true);*/
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();
			var oRouter = UIComponent.getRouterFor(this);
			oRouter.navTo("TargetView1", {}, true);
			/*if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {

			}*/
		},
		pressportaldetails: function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("Portal_Details");
		},
		pressuseraccessdetails: function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("User_Access_Details");
		},
		pressportalurl: function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("Portal_URL");
		},
		pressdocumenttype: function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("Document_Type");
		},
		pressstatecode: function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("State_Code");
		},
		pressuomcode: function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("UOM_Code");
		},
		pressconditiontype: function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("Condition_Type");
		},
		presseinvoiceautho: function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("E-Invoice_Authorization");
		},
		pressratemaster: function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("HSN_code");
		},
		pressTrasdetailsmaster: function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("Transporter_Details");
		},
		pressEwaybilldistancemaster: function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("EwaybillDistance");
		},
		pressEwaybillauthmaster: function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("E_WaybillAuthCheck");
		}
	});

});