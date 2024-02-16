sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("com.dink.Einvoice.controller.Eway_Bill", {

		onInit: function () {

			this.byId("Id_ewaybillno").setVisible(false);
			this.byId("Id_ewaybillnoTo").setVisible(false);

		},
		Searchoption: function (oEvent) {
			var Radio_val = this.getView().byId("Rad_grp").getSelectedButton().getText();
			var cancel = "Cancel E-Way Bill";
			var diplay = "Display E-Way Bill";
			var print = "Print E-Way Bill";

			if (Radio_val == cancel) {
				this.byId("Panel").setVisible(false);
				this.byId("Id_ewaybillno").setVisible(true);
				this.byId("Id_ewaybillnoTo").setVisible(true);
				this.byId("panel1").setVisible(true);
				this.byId("panel2").setVisible(false);
				this.byId("panel3").setVisible(false);
			} else if (Radio_val == diplay) {
				this.byId("Panel").setVisible(false);
				this.byId("Id_ewaybillno").setVisible(true);
				this.byId("Id_ewaybillnoTo").setVisible(true);
				this.byId("panel1").setVisible(false);
				this.byId("panel2").setVisible(true);
				this.byId("panel3").setVisible(false);
			} else if (Radio_val == print) {
				this.byId("Panel").setVisible(false);
				this.byId("Id_ewaybillno").setVisible(true);
				this.byId("Id_ewaybillnoTo").setVisible(true);
				this.byId("panel1").setVisible(false);
				this.byId("panel2").setVisible(false);
				this.byId("panel3").setVisible(true);
			} else {
				this.byId("Panel").setVisible(true);
				this.byId("Id_ewaybillno").setVisible(false);
				this.byId("Id_ewaybillnoTo").setVisible(false);
				this.byId("panel1").setVisible(false);
				this.byId("panel2").setVisible(false);
				this.byId("panel3").setVisible(false);
			}
		},

		onNavBack: function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("TargetView1");
		},
		Datechange: function () {

			var Date1 = this.byId("DP1").getDateValue();
			var Date2 = this.byId("DP2").getDateValue();
			if (Date1 === null) {
				this.byId("DP2").setEditable(false);
			} else {
				if (Date1.toDateString().length <= 15) {
					this.byId("DP2").setEditable(false);
				}
			}
			if (this.byId("DP1").isValidValue() === true) {
				this.byId("DP2").setEditable(true);
				this.byId("DP1").setValueState("Success");

			} else {
				this.byId("DP2").setEditable(false);
				this.byId("DP1").setValueState("Error");
			}
			if (Date1 !== null) {
				this.byId("DP1").setValueState("None");
				this.byId("Id_billno").setValueState("None");
				this.byId("Id_ewaybillno").setValueState("None");
			}

		},

		Gerate_EwaybillPage: function () {

			var Date1 = this.byId("DP1").getDateValue();
			var Date2 = this.byId("DP2").getDateValue();
			var Billnofrom = this.byId("Id_billno").getValue();
			var BillnoTo = this.byId("Id_billnoTo").getValue();
			var ewaybillno = this.byId("Id_ewaybillno").getValue();
			var ewaybillnoTo = this.byId("Id_ewaybillnoTo").getValue();

			if (Date1 === null && Billnofrom === "" && ewaybillno === "") {
				sap.m.MessageToast.show("Please select Billing Date Or Billing No");
				this.byId("DP1").setValueState("Error");
				this.byId("Id_billno").setValueState("Error");
				this.byId("Id_ewaybillno").setValueState("Error");
			}

			/*	else if (Date1 !== null || Billnofrom !== "" || ewaybillno !== "") {


			this.byId("DP1").setValueState("Success");
			this.byId("Id_billno").setValueState("Success");
			this.byId("Id_ewaybillno").setValueState("Success");
			}
			*/
			else if (this.byId("DP1").isValidValue() === false) {
				this.byId("DP1").setValueState("Error");
			} else {
				Billnofrom = Billnofrom.padStart(10, "0");
				BillnoTo = BillnoTo.padStart(10, "0");

				ewaybillno = ewaybillno.padStart(12, "0");
				ewaybillnoTo = ewaybillnoTo.padStart(12, "0");

				if (Date1 === null) {
					Date1 = "0000-00-00T00:00:00";
				} else {
					var dateFormat = sap.ui.core.format.DateFormat.getInstance({
						pattern: "yyyy-MM-ddThh:mm:ss"
					});
					Date1 = dateFormat.format(new Date(Date1));
				}
				if (Date2 === null) {
					Date2 = Date1;
				} else {
					var dateFormat1 = sap.ui.core.format.DateFormat.getInstance({
						pattern: "yyyy-MM-ddThh:mm:ss"
					});
					Date2 = dateFormat1.format(new Date(Date2));
				}
				/*	var dateFormatted1 = dateFormat.format(new Date(Date1));
				var dateFormatted2 = dateFormat.format(new Date(Date2));*/

				/*	var dateFormatted2 = dateFormatted1 + "T00:00:00";*/
				/*	var dateFormatted2 = dateFormat.format(new Date(Date2));*/

				if (Billnofrom === "") {
					Billnofrom = "0000000000";
				}
				if (BillnoTo === "0000000000") {
					BillnoTo = Billnofrom;
				}
				if (ewaybillno === "") {
					ewaybillno = "0000000000";
				}
				if (ewaybillnoTo === "000000000000") {
					ewaybillnoTo = ewaybillno;
				}

				if (this.getView().byId("Rad_grp").getSelectedButton().getText() === "Generate E-Way Bill") {

					var Supply_Type = this.byId("Supply_Type_Id").getSelectedKey();
					var Sub_Supply_Type = this.byId("Sub_Supply_Type_Id").getSelectedKey();
					var Sub_supply_Description = this.byId("Sub_supply_Description").getValue();

					var Tranction_Type = this.byId("Tranction_Type_Id").getSelectedKey();
					var Transportation_Mode = this.byId("Transportation_Mode_Id").getSelectedKey();

					var Transporter_Id = this.byId("Transporter_Id").getSelectedKey();
					var Transporter_Name_Id = this.byId("Transporter_Name_Id").getValue();

					var Vehicle_Type_Id = this.byId("Vehicle_Type_Id").getSelectedKey();
					var Transporter_Document_No = this.byId("Transporter_Document_No").getValue();
					var Vehicle_No = this.byId("Vehicle_No_Id").getValue();

					if (Sub_supply_Description == "") {
						Sub_supply_Description = "00";
					}
					if (Transporter_Name_Id === "") {
						Transporter_Name_Id = "00";
					}
					if (Transporter_Document_No === "") {
						Transporter_Document_No = "00";
					}
					if (Vehicle_No === "") {
						Vehicle_No = "00";
					}
					if (Transporter_Id === "0") {
						this.byId("Transporter_Id").setValueState("Error");
						sap.m.MessageToast.show("Please select Trancporter Id");
						return;
						//Transporter_Id = "0";
					} else {
						this.byId("Transporter_Id").setValueState("None");
					}

					var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
					oRouter.navTo("Generate_E-wayBill", {
						Date1: Date1,
						Date2: Date2,
						BillNo: Billnofrom,
						BillNoTo: BillnoTo,
						EwaybilNo: ewaybillno,
						EwaybilNoTo: ewaybillnoTo,
						Supply_type: Supply_Type,
						Sub_Supply_type: Sub_Supply_Type,
						Sub_supply_Description: Sub_supply_Description,
						Transaction_Type: Tranction_Type,
						Transportation_Mode: Transportation_Mode,
						Transporter_Id: Transporter_Id,
						Transporter_Name: Transporter_Name_Id,
						Vehicle_Type: Vehicle_Type_Id,
						Vehicle_No: Vehicle_No,
						Transporter_Document_No: Transporter_Document_No
					});
				}

				if (this.getView().byId("Rad_grp").getSelectedButton().getText() === "Display E-Way Bill") {
					var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
					oRouter.navTo("Display_e-Waybill", {
						Date1: Date1,
						Date2: Date2,
						BillNo: Billnofrom,
						BillNoTo: BillnoTo,
						EwaybilNo: ewaybillno,
						EwaybilNoTo: ewaybillnoTo,
					});
				}
				if (this.getView().byId("Rad_grp").getSelectedButton().getText() === "Print E-Way Bill") {
					var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
					oRouter.navTo("Print_E-waybill", {
						Date1: Date1,
						Date2: Date2,
						BillNo: Billnofrom,
						BillNoTo: BillnoTo,
						EwaybilNo: ewaybillno,
						EwaybilNoTo: ewaybillnoTo,
					});
				}

				if (this.getView().byId("Rad_grp").getSelectedButton().getText() === "Cancel E-Way Bill") {
					if (this.byId("Id_Cnclrsn").getSelectedKey() === "0") {
						this.byId("Id_Cnclrsn").setValueState("Error");
						sap.m.MessageToast.show("Select Reason");
					} else {
						var cancle_reason = this.byId("Id_Cnclrsn").getSelectedKey();
						this.byId("Id_Cnclrsn").setValueState("None");
						var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
						oRouter.navTo("Ewaybill_Cancel", {
							Date1: Date1,
							Date2: Date2,
							BillNo: Billnofrom,
							BillNoTo: BillnoTo,
							EwaybilNo: ewaybillno,
							EwaybilNoTo: ewaybillnoTo,
							CnlRsn: cancle_reason
						});
					}
				}

			}

		},

		livechange_ewaybillno: function (oEvent) {

			var re = /^\d*(\.\d+)?$/;
			var _oInput = oEvent.getSource();
			var val = _oInput.getValue();
			if (val.match(re)) {

				if (!this.byId("Id_ewaybillno").getValue().length == 0) {
					this.byId("Id_ewaybillnoTo").setEditable(true);
				} else {
					this.byId("Id_ewaybillnoTo").setValue("");
					this.byId("Id_ewaybillnoTo").setEditable(false);
				}
			} else {
				var val1 = val.replace(/[^\d]/g, '');
				_oInput.setValue(val1);
			}
		},
		livechange_ewaybillnoTo: function (oEvent) {
			var _oInput = oEvent.getSource();
			var val = _oInput.getValue();
			var val1 = val.replace(/[^\d]/g, '');
			_oInput.setValue(val1);

		},
		livechange_biilingno: function (oEvent) {
			var re = /^\d*(\.\d+)?$/;
			var _oInput = oEvent.getSource();
			var val = _oInput.getValue();
			if (val.match(re)) {

				var Id_billno = this.byId("Id_billno").getValue();

				if (!this.byId("Id_billno").getValue().length == 0) {
					this.byId("Id_billnoTo").setEditable(true);
				} else {
					this.byId("Id_billnoTo").setValue("");
					this.byId("Id_billnoTo").setEditable(false);
				}
				if (Id_billno !== null) {
					this.byId("DP1").setValueState("None");
					this.byId("Id_billno").setValueState("None");
					this.byId("Id_ewaybillno").setValueState("None");
				}

			} else {
				var val1 = val.replace(/[^\d]/g, '');
				_oInput.setValue(val1);
			}
		},
		livechange_billnoTo: function (oEvent) {
			var _oInput = oEvent.getSource();
			var val = _oInput.getValue();
			var val1 = val.replace(/[^\d]/g, '');
			_oInput.setValue(val1);
		},
		livechangeTransporter_Name: function (oEvent) {
			var _oInput = oEvent.getSource();
			var val = _oInput.getValue();
			var val1 = val.replace(/[^\a-\z\A-\Z]/g, '');
			_oInput.setValue(val1);

		},
		onEwaybillCancle: function () {

			var select1 = this.byId("selectcancle").getSelectedItem().getText();
			if (select1 === "Select") {

				sap.m.MessageToast.show("Please Select Reason");
			} else {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("E-WayBill_Cancle");
			}
		},
		onEwaybillDisplay: function () {

			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("Display_e-Waybill");
		},
		onEwaybillPrint: function () {

			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("Print_E-waybill");
		}

	});

});