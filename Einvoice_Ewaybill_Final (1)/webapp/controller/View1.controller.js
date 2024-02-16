sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("com.dink.Einvoice.controller.View1", {
		onInit: function () {

		},
		pressMaster: function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("Master_Page");
		},
		press: function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("Einvoice_Inpscreen");
		},
		pressEwaybill: function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("Eway_Bill");
		}
	});
});