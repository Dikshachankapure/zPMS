sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"sap/ui/core/routing/History",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/Fragment",
	"sap/ui/model/Filter",
	"sap/m/MessageToast"
], function (Controller, MessageBox, History, JSONModel, Fragment, Filter, MessageToast) {
	"use strict";

	return Controller.extend("pms.ZPMS.controller.View3", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf pms.ZPMS.view.View3
		 */
		onInit: function () {
			this._oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this._oRouter.getRoute("view3").attachPatternMatched(this.onEditMatched, this);

			var oModel = this.getOwnerComponent().getModel("IndiGoalsSet");
			this.getView().setModel(oModel, "M5");

			var oModelTeamG = this.getOwnerComponent().getModel("TeamGoalsSet");
			this.getView().setModel(oModelTeamG, "M6");
			
			var oModelRejctn = this.getOwnerComponent().getModel("RejectionNotes");
			this.getView().setModel(oModelRejctn, "M7");
		},

		getRouter: function () {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},

		OnPress: function () {
			this.getRouter().navTo("View4", {}, true);
		},
		Gotopage1: function () {
			this.getRouter().navTo("View1", {}, true);
		},

		onEditMatched: function (oEvent) {
			var oParameters = oEvent.getParameters();

			var oModelData = this.getOwnerComponent().getModel("EmployeeSet"); //get the data from model 
			this.getView().setModel(oModelData); //set the data to model

			var oModel = this.getView().getModel();

			var empicon = this.getView().byId("objcmp");

			var empname = this.getView().byId("objcmp");

			var status = this.getView().byId("objcmp");

			var that = this;

			if (oParameters.arguments.EmpName !== "" || oParameters.arguments.EmpName !== null) {
				this.EmpName = oParameters.arguments.EmpName;
				if (oModel.getData().Employees.length > 0) {
					for (var i = 0; i < oModel.getData().Employees.length; i++) {
						if (oModel.getData().Employees[i].EmpName.toString() === this.EmpName) {

							empname.setTitle(this.EmpName);
							status.setNumber(oModel.getData().Employees[i].Status);
							empicon.setIcon(oModel.getData().Employees[i].EmpIcon);

							return false;
						}

					}
				}

			}

		},

		OnPressGoal: function (oEvent) {

			var Stock = oEvent.getSource().getBindingContext("M5").getObject();

			this.getRouter().navTo("view4", {
				Title: Stock.Title

			});

		},

		OnAprrove: function () {
			MessageToast.show("Goals Approved");
		},
		OnReject: function () {
			MessageToast.show("Goals Rejected");
		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf pms.ZPMS.view.View3
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf pms.ZPMS.view.View3
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf pms.ZPMS.view.View3
		 */
		//	onExit: function() {
		//
		//	}

	});

});