sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/ui/core/UIComponent"
], function (Controller, History, UIComponent) {
	"use strict";
	var ServiceUrl = "/sap/opu/odata/SAP/ZEINVOICE_SRV/";
	var oModel = new sap.ui.model.odata.ODataModel(ServiceUrl);

	return Controller.extend("com.dink.Einvoice.controller.E-Invoice_Authorization", {

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
		onAdd: function () {
			if (!this._addDialog) {
				this._addDialog = sap.ui.xmlfragment("com.dink.Einvoice.Fragments.e-Invoice_Authorization", this);
			}

			this._addDialog.open();

		},

		onEdit: function (oEvent) {

			if (!this._oDialog) {
				this._oDialog = sap.ui.xmlfragment("com.dink.Einvoice.Fragments.EditE-Invoice_Authorization", this);

			}
			this._oDialog.open();

			var oTable = this.byId("einvoiceautho");
			// var selectedRow = oTable.getSelectedIndex();
			// var dataContext = oTable.getBinding("rows").getContexts();
			// var SelectedKey = dataContext[selectedRow].sPath.split("/")[1];
			// var selectedData = oTable.getModel().oData[SelectedKey];
			// sap.ui.getCore().byId("sapsystemid").setValue(selectedData.Syid);
			// sap.ui.getCore().byId("modeofprocess").setValue(selectedData.Method);
			// sap.ui.getCore().byId("aspuserid").setValue(selectedData.Username);
			// sap.ui.getCore().byId("asppass").setValue(selectedData.Password);
			// sap.ui.getCore().byId("portalversion").setValue(selectedData.Version);
			// sap.ui.getCore().byId("payload").setValue(selectedData.VersionJson);
			// sap.ui.getCore().byId("taxschema").setValue(selectedData.TaxSch);

			sap.ui.getCore().byId("sapsysidinva1").setValue(oEvent.getSource().getBindingContext().getObject().UserId);

			if (oEvent.getSource().getBindingContext().getObject().Vf01Flag == "X") {
				sap.ui.getCore().byId("sdflag1").setSelected(true);
			} else {
				sap.ui.getCore().byId("sdflag1").setSelected(false);
			}
			if (oEvent.getSource().getBindingContext().getObject().Credit == "X") {
				sap.ui.getCore().byId("creditflag1").setSelected(true);
			} else {
				sap.ui.getCore().byId("creditflag1").setSelected(false);
			}
			if (oEvent.getSource().getBindingContext().getObject().Debit == "X") {
				sap.ui.getCore().byId("debitflag1").setSelected(true);
			} else {
				sap.ui.getCore().byId("debitflag1").setSelected(false);
			}
			if (oEvent.getSource().getBindingContext().getObject().Rcm == "X") {
				sap.ui.getCore().byId("fifb60flag1").setSelected(true);
			} else {
				sap.ui.getCore().byId("fifb60flag1").setSelected(false);
			}
			if (oEvent.getSource().getBindingContext().getObject().RcmMiro == "X") {
				sap.ui.getCore().byId("fimiro1").setSelected(true);
			} else {
				sap.ui.getCore().byId("fimiro1").setSelected(false);
			}
			if (oEvent.getSource().getBindingContext().getObject().Cancel == "X") {
				sap.ui.getCore().byId("cancel1").setSelected(true);
			} else {
				sap.ui.getCore().byId("cancel1").setSelected(false);
			}

		},
		onCancel: function () {
			this._addDialog.close();
		},
		onCancel1: function () {
			this._oDialog.close();
		},
		oncreate: function () {

			var oTable = this.byId("einvoiceautho");
			var that = this;
			var oEntry = {};

			var UserId = sap.ui.getCore().byId("sapsysidinva").getValue();
			var space = /^\s/;
			if (UserId == "" || UserId.match(space)) {
				sap.ui.getCore().byId("sapsysidinva").setValueState("Error");
			} else {
				sap.ui.getCore().byId("sapsysidinva").setValueState("None");

				oEntry.UserId = sap.ui.getCore().byId("sapsysidinva").getValue();
				var sdflag = sap.ui.getCore().byId("sdflag").getSelected();
				if (sdflag == true) {
					oEntry.Vf01Flag = "X";
				} else {
					oEntry.Vf01Flag = " ";
				}
				var creditflag = sap.ui.getCore().byId("creditflag").getSelected();
				if (creditflag == true) {
					oEntry.Credit = "X";
				} else {
					oEntry.Credit = " ";
				}
				var debitflag = sap.ui.getCore().byId("debitflag").getSelected();
				if (debitflag == true) {
					oEntry.Debit = "X";
				} else {
					oEntry.Debit = " ";
				}
				var fifb60flag = sap.ui.getCore().byId("fifb60flag").getSelected();
				if (fifb60flag == true) {
					oEntry.Rcm = "X";
				} else {
					oEntry.Rcm = " ";
				}
				var fimiro = sap.ui.getCore().byId("fimiro").getSelected();
				if (fimiro == true) {
					oEntry.RcmMiro = "X";
				} else {
					oEntry.RcmMiro = " ";
				}
				var cancel = sap.ui.getCore().byId("cancel").getSelected();
				if (cancel == true) {
					oEntry.Cancel = "X";
				} else {
					oEntry.Cancel = " ";
				}

				oModel.create("/EinvAuthSet", oEntry, {
					method: "POST",

					success: function (oData, oResponse) {

						oTable.getModel().refresh(true);
						oTable.getBinding("rows").refresh(true);
						that.onclear();
						that._addDialog.close();
					},
					error: function (cc, vv) {

					}
				});
			}
		},
		oncreate1: function () {

			var oTable = this.byId("einvoiceautho");
			var that = this;
			var oEntry = {};
			// var active = sap.ui.getCore().byId("activedeactive").getSelected();
			// if (active == true) {
			// 	oEntry.Actflag = "X";
			// } else {
			// 	oEntry.Actflag = " ";
			// }
			var sdflag = sap.ui.getCore().byId("sdflag1").getSelected();
			if (sdflag == true) {
				oEntry.Vf01Flag = "X";
			} else {
				oEntry.Vf01Flag = " ";
			}
			var creditflag = sap.ui.getCore().byId("creditflag1").getSelected();
			if (creditflag == true) {
				oEntry.Credit = "X";
			} else {
				oEntry.Credit = " ";
			}
			var debitflag = sap.ui.getCore().byId("debitflag1").getSelected();
			if (debitflag == true) {
				oEntry.Debit = "X";
			} else {
				oEntry.Debit = " ";
			}
			var fifb60flag = sap.ui.getCore().byId("fifb60flag1").getSelected();
			if (fifb60flag == true) {
				oEntry.Rcm = "X";
			} else {
				oEntry.Rcm = " ";
			}
			var fimiro = sap.ui.getCore().byId("fimiro1").getSelected();
			if (fimiro == true) {
				oEntry.RcmMiro = "X";
			} else {
				oEntry.RcmMiro = " ";
			}
			var cancel = sap.ui.getCore().byId("cancel1").getSelected();
			if (cancel == true) {
				oEntry.Cancel = "X";
			} else {
				oEntry.Cancel = " ";
			}
			var UserId1 = sap.ui.getCore().byId("sapsysidinva1").getValue();

			// var oSrc = oEvent.getSource();

			// if (oSrc && oSrc.setValue) {
			// 	oSrc.setValue(oSrc.getValue().toUpperCase());
			// }

			oEntry.UserId = UserId1;

			oModel.update("/EinvAuthSet(UserId='" + UserId1 + "')", oEntry, {
				method: "PUT",

				success: function (oData, oResponse) {
					that._oDialog.close();
					oTable.getModel().refresh(true);
					oTable.getBinding("rows").refresh(true);
					that.onclear1();
				},
				error: function (cc, vv) {

				}
			});
		},
		deleteEinvoiceAutho: function (oEvent) {

			var oTable = this.byId("einvoiceautho");
			var UserId1 = oEvent.getSource().getBindingContext().getObject().UserId;

			oModel.remove("/EinvAuthSet(UserId='" + UserId1 + "')", {
				method: "DELETE",

				success: function (oData, oResponse) {
					//	that._oDialog.close();
					oTable.getModel().refresh(true);
					oTable.getBinding("rows").refresh(true);
					//	that.onclear1();
					sap.m.MessageToast.show("Deleted Successfully");
				},
				error: function (cc, vv) {

				}
			});
		},
		onclear: function () {

			sap.ui.getCore().byId("sapsysidinva").setValue("");
			sap.ui.getCore().byId("sdflag").setSelected(false);
			sap.ui.getCore().byId("creditflag").setSelected(false);
			sap.ui.getCore().byId("debitflag").setSelected(false);
			sap.ui.getCore().byId("fifb60flag").setSelected(false);
			sap.ui.getCore().byId("fimiro").setSelected(false);
			sap.ui.getCore().byId("cancel").setSelected(false);

		},
		onclear1: function () {

			/*	sap.ui.getCore().byId("sapsysidinva1").setValue("");*/
			sap.ui.getCore().byId("sdflag1").setSelected(false);
			sap.ui.getCore().byId("creditflag1").setSelected(false);
			sap.ui.getCore().byId("debitflag1").setSelected(false);
			sap.ui.getCore().byId("fifb60flag1").setSelected(false);
			sap.ui.getCore().byId("fimiro1").setSelected(false);
			sap.ui.getCore().byId("cancel1").setSelected(false);

		}

	});

});