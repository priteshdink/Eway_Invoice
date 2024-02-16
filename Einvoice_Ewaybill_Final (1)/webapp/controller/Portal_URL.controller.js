sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/ui/core/UIComponent"
], function (Controller, History, UIComponent) {
	"use strict";
	var ServiceUrl = "/sap/opu/odata/SAP/ZEINVOICE_SRV/";
	var oModel = new sap.ui.model.odata.ODataModel(ServiceUrl);

	return Controller.extend("com.dink.Einvoice.controller.Portal_URL", {

		onInit: function () {

		},

		onBack: function () {
			/*	var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("Create_Compliance_Repository", null, true);*/
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();
			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				var oRouter = UIComponent.getRouterFor(this);
				oRouter.navTo("Master_Page", {}, true);
			}
		},
		onAdd: function (oEvent) {
			if (!this._addDialog2) {
				this._addDialog2 = sap.ui.xmlfragment("com.dink.Einvoice.Fragments.Portal_URL", this);
			}

			this._addDialog2.open();
		},
		onCancel: function () {

			this._addDialog2.close();
		},
		onCancel1: function () {

			this._oDialog3.close();
		},
		oncreate: function () {

			var oTable = this.byId("portal_url");
			var that = this;
			var oEntry = {};
			var active = sap.ui.getCore().byId("activedeactive").getSelected();
			if (active == true) {
				oEntry.Actflag = "X";
			} else {
				oEntry.Actflag = " ";
			}
			var Sysid1 = sap.ui.getCore().byId("sapsystemid").getValue();
			var Method1 = sap.ui.getCore().byId("moprodessporturl").getSelectedKey();
			var Function1 = sap.ui.getCore().byId("function").getValue();
			var Url11 = sap.ui.getCore().byId("url1").getValue();
			var Url21 = sap.ui.getCore().byId("url2").getValue();
			var Url31 = sap.ui.getCore().byId("url3").getValue();
			var Url41 = sap.ui.getCore().byId("url4").getValue();
			var Url51 = sap.ui.getCore().byId("url5").getValue();
			var Url61 = sap.ui.getCore().byId("url6").getValue();
			var Url71 = sap.ui.getCore().byId("url7").getValue();
			var Url81 = sap.ui.getCore().byId("url8").getValue();
			var Url91 = sap.ui.getCore().byId("url9").getValue();
			var Url101 = sap.ui.getCore().byId("url10").getValue();
			var space = /^\s/;
			if (Sysid1 == "" || Sysid1.match(space)) {
				sap.ui.getCore().byId("sapsystemid").setValueState("Error");
			} else {
				sap.ui.getCore().byId("sapsystemid").setValueState("None");
			}
			if (Method1 == "" || Method1.match(space)) {
				sap.ui.getCore().byId("moprodessporturl").setValueState("Error");
			} else {
				sap.ui.getCore().byId("moprodessporturl").setValueState("None");
			}
			if (Function1 == "" || Function1.match(space)) {
				sap.ui.getCore().byId("function").setValueState("Error");
			} else {
				sap.ui.getCore().byId("function").setValueState("None");

			}
			if (Sysid1 == "" || Sysid1.match(space) || Method1 == "" || Method1.match(space) || Function1 == "" || Function1.match(space)) {
				sap.m.MessageToast.show("Space is not allowed");
			} else {
				sap.ui.getCore().byId("sapsystemid").setValueState("None");
				sap.ui.getCore().byId("moprodessporturl").setValueState("None");
				sap.ui.getCore().byId("function").setValueState("None");

				oEntry.Sysid = Sysid1;
				oEntry.Method = Method1;
				oEntry.Function = Function1;
				oEntry.Url1 = Url11;
				oEntry.Url2 = Url21;
				oEntry.Url3 = Url31;
				oEntry.Url4 = Url41;
				oEntry.Url5 = Url51;
				oEntry.Url6 = Url61;
				oEntry.Url7 = Url71;
				oEntry.Url8 = Url81;
				oEntry.Url9 = Url91;
				oEntry.Url10 = Url101;

				oModel.create("/PortalUrlSet", oEntry, {
					method: "POST",

					success: function (oData, oResponse) {

						oTable.getModel().refresh(true);
						oTable.getBinding("rows").refresh(true);
						that.onclear();
						that._addDialog2.close();
					},
					error: function (cc, vv) {

					}
				});
			}
		},
		oncreate1: function () {

			var oTable = this.byId("portal_url");
			var that = this;
			var oEntry = {};
			var active = sap.ui.getCore().byId("activedeactive1").getSelected();
			if (active == true) {
				oEntry.Actflag = "X";
			} else {
				oEntry.Actflag = " ";
			}
			var SyId1 = sap.ui.getCore().byId("sapsystemid1").getValue();
			var Method1 = sap.ui.getCore().byId("moprodessporturl1").getSelectedKey();
			var Function11 = sap.ui.getCore().byId("function1").getValue();
			var Url11 = sap.ui.getCore().byId("url11").getValue();
			var Url22 = sap.ui.getCore().byId("url21").getValue();
			var Url33 = sap.ui.getCore().byId("url31").getValue();
			var Url44 = sap.ui.getCore().byId("url41").getValue();
			var Url55 = sap.ui.getCore().byId("url51").getValue();
			var Url66 = sap.ui.getCore().byId("url61").getValue();
			var Url77 = sap.ui.getCore().byId("url71").getValue();
			var Url88 = sap.ui.getCore().byId("url81").getValue();
			var Url99 = sap.ui.getCore().byId("url91").getValue();
			var Url100 = sap.ui.getCore().byId("url101").getValue();

			oEntry.Sysid = SyId1;
			oEntry.Method = Method1;
			oEntry.Function = Function11;
			oEntry.Url1 = Url11;
			oEntry.Url2 = Url22;
			oEntry.Url3 = Url33;
			oEntry.Url4 = Url44;
			oEntry.Url5 = Url55;
			oEntry.Url6 = Url66;
			oEntry.Url7 = Url77;
			oEntry.Url8 = Url88;
			oEntry.Url9 = Url99;
			oEntry.Url10 = Url100;

			oModel.update("/PortalUrlSet(Sysid='" + SyId1 + "',Method='" + Method1 + "',Function='" + Function11 + "')", oEntry, {
				method: "PUT",

				success: function (oData, oResponse) {
					that._oDialog3.close();
					oTable.getModel().refresh(true);
					oTable.getBinding("rows").refresh(true);
					that.onclear1();
				},
				error: function (cc, vv) {

				}
			});
		},
		onclear: function () {

			sap.ui.getCore().byId("activedeactive").setSelected(false);
			sap.ui.getCore().byId("sapsystemid").setValue("");
			sap.ui.getCore().byId("moprodessporturl").setSelectedKey("");
			sap.ui.getCore().byId("function").setValue("");
			sap.ui.getCore().byId("url1").setValue("");
			sap.ui.getCore().byId("url2").setValue("");
			sap.ui.getCore().byId("url3").setValue("");
			sap.ui.getCore().byId("url4").setValue("");
			sap.ui.getCore().byId("url5").setValue("");
			sap.ui.getCore().byId("url6").setValue("");
			sap.ui.getCore().byId("url7").setValue("");
			sap.ui.getCore().byId("url8").setValue("");
			sap.ui.getCore().byId("url9").setValue("");
			sap.ui.getCore().byId("url10").setValue("");

		},
		onclear1: function () {

			sap.ui.getCore().byId("activedeactive1").setSelected(false);
			/*sap.ui.getCore().byId("sapsystemid1").setValue("");
			sap.ui.getCore().byId("moprodessporturl1").setSelectedKey("");
			sap.ui.getCore().byId("function1").setValue("");*/
			sap.ui.getCore().byId("url11").setValue("");
			sap.ui.getCore().byId("url21").setValue("");
			sap.ui.getCore().byId("url31").setValue("");
			sap.ui.getCore().byId("url41").setValue("");
			sap.ui.getCore().byId("url51").setValue("");
			sap.ui.getCore().byId("url61").setValue("");
			sap.ui.getCore().byId("url71").setValue("");
			sap.ui.getCore().byId("url81").setValue("");
			sap.ui.getCore().byId("url91").setValue("");
			sap.ui.getCore().byId("url101").setValue("");

		},
		onEdit: function (oEvent) {

			if (!this._oDialog3) {
				this._oDialog3 = sap.ui.xmlfragment("com.dink.Einvoice.Fragments.EditPortal_URL", this);

			}
			this._oDialog3.open();

			var oTable = this.byId("portal_url");
			var selectedRow = oTable.getSelectedIndex();
			var dataContext = oTable.getBinding("rows").getContexts();

			sap.ui.getCore().byId("sapsystemid1").setValue(oEvent.getSource().getBindingContext().getObject().Sysid);
			sap.ui.getCore().byId("moprodessporturl1").setSelectedKey(oEvent.getSource().getBindingContext().getObject().Method);
			sap.ui.getCore().byId("function1").setValue(oEvent.getSource().getBindingContext().getObject().Function);
			sap.ui.getCore().byId("url11").setValue(oEvent.getSource().getBindingContext().getObject().Url1);
			sap.ui.getCore().byId("url21").setValue(oEvent.getSource().getBindingContext().getObject().Url2);
			sap.ui.getCore().byId("url31").setValue(oEvent.getSource().getBindingContext().getObject().Url3);
			sap.ui.getCore().byId("url41").setValue(oEvent.getSource().getBindingContext().getObject().Url4);
			sap.ui.getCore().byId("url51").setValue(oEvent.getSource().getBindingContext().getObject().Url5);
			sap.ui.getCore().byId("url61").setValue(oEvent.getSource().getBindingContext().getObject().Url6);
			sap.ui.getCore().byId("url71").setValue(oEvent.getSource().getBindingContext().getObject().Url7);
			sap.ui.getCore().byId("url81").setValue(oEvent.getSource().getBindingContext().getObject().Url8);
			sap.ui.getCore().byId("url91").setValue(oEvent.getSource().getBindingContext().getObject().Url9);
			sap.ui.getCore().byId("url101").setValue(oEvent.getSource().getBindingContext().getObject().Url10);
			if (oEvent.getSource().getBindingContext().getObject().Actflag == "X") {
				sap.ui.getCore().byId("activedeactive1").setSelected(true);
			} else {
				sap.ui.getCore().byId("activedeactive1").setSelected(false);
			}

		},
		deleteportalurl: function (oEvent) {

			var oTable = this.byId("portal_url");
			var Syid1 = oEvent.getSource().getBindingContext().getObject().Sysid;
			var Method1 = oEvent.getSource().getBindingContext().getObject().Method;
			var Function11 = oEvent.getSource().getBindingContext().getObject().Function;

			oModel.remove("/PortalUrlSet(Sysid='" + Syid1 + "',Method='" + Method1 + "',Function='" + Function11 + "')", {
				method: "DELETE",

				success: function (oData, oResponse) {
					//	that._oDialog3.close();
					oTable.getModel().refresh(true);
					oTable.getBinding("rows").refresh(true);
					//that.onclear1();
					sap.m.MessageToast.show("Deleted Successfully");
				},
				error: function (cc, vv) {

				}
			});
		},
	});

});