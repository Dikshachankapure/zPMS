sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	'sap/m/MessageBox',
	"sap/m/MessageToast"
], function (Controller, JSONModel, MessageBox, MessageToast) {
	"use strict";

	return Controller.extend("pms.ZPMS.controller.View1", {
		onInit: function (evt) {
			var oModel = this.getOwnerComponent().getModel("EmployeeSet");
			this.getView().setModel(oModel, "M1");

			var oModelPding = this.getOwnerComponent().getModel("PendingSet");
			this.getView().setModel(oModelPding, "M2");

			var oModelGoals = this.getOwnerComponent().getModel("GoalsSet");
			this.getView().setModel(oModelGoals, "M3");

			var oModelRating = this.getOwnerComponent().getModel("RatingSet");
			this.getView().setModel(oModelRating, "M4");

		},
		getRouter: function () {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},

		onAdd: function () {
			this.getRouter().navTo("View2", {}, true);
		},

		OnPress: function () {
			this.getRouter().navTo("View3", {}, true);
		},
		onEdit: function (oEvent) {
			var objEmp = oEvent.getSource().getBindingContext("M3").getObject();
			//Get the Model. 
			this.getRouter().navTo("view2", {
				GoalNo: objEmp.GoalNo
			});
		},
		onSelect: function (oEvent) {

			var Stock = oEvent.getSource().getBindingContext("M1").getObject();

			this.getRouter().navTo("view3", {
				EmpName: Stock.EmpName

			});

		},

		onCancel: function (oEvent) {

			var oList = this.byId("tblEmployeesT");

			var aItems = oList.getItems();
			var oModelItems = oList.getModel("M3");
			var values = oModelItems.getData();

			var oDelete = oEvent.getSource().getBindingContext("M3").getObject();
			if (aItems.length > 0) {
				for (var i = 0; i < values.EmpGoals.length; i++) {
					if (values.EmpGoals[i].GoalNo === oDelete.GoalNo) {
						//	pop this._data.Products[i] 
						values.EmpGoals.splice(i, 1);
						oModelItems.refresh();
						break;
					}
				}

				oModelItems.setData(values);
				oList.setModel(oModelItems);
			}

		},

		onPressSave: function (oEvent) {
		MessageToast.show("Data saved");
		},

		onGo: function () {
			var oproductgrp = this.getView().byId("cbyear");
			var otable = this.getView().byId("tblEmp");
			var otable1 = this.getView().byId("tblEmployees");
			var value = oproductgrp.getSelectedKey();

			if (value == "1") {
				otable.setVisible(true);
				otable1.setVisible(false);
			} else {
				otable.setVisible(false);
				otable1.setVisible(true);
			}
			//	var ProductGroup = oEvent.getSource().getBindingContext().getObject();

		},

	});
});