sap.ui.define([
	"sap/ui/core/mvc/Controller",
		"sap/m/MessageBox",
	"sap/ui/core/routing/History",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/Fragment",
	"sap/ui/model/Filter",
	"sap/m/MessageToast"
], function (Controller,MessageBox, History, JSONModel, Fragment, Filter, MessageToast) {
	"use strict";

	return Controller.extend("pms.ZPMS.controller.View4", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf pms.ZPMS.view.View4
		 */
		onInit: function () {
			this._oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this._oRouter.getRoute("view4").attachPatternMatched(this.onEditMatched, this);
			
			var oModel = this.getOwnerComponent().getModel("CommentsSet");
			this.getView().setModel(oModel,"M7");
		},
		getRouter: function () {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},

		Gotopage3: function () {

			this.getRouter().navTo("View3", {}, true);

			var that = this;
			
		},

		onEditMatched: function (oEvent) {
			var oParameters = oEvent.getParameters(); // get parameter 
			var oModelData = this.getOwnerComponent().getModel("IndiGoalsSet"); //get the data from model 
			this.getView().setModel(oModelData); //set the data to model
			var oModel = this.getView().getModel();

			var title = this.getView().byId("title1");
			var description = this.getView().byId("desc");
			var duedate = this.getView().byId("DP1");

			if (oParameters.arguments.Title !== "" || oParameters.arguments.Title !== null) {
				this.Title = oParameters.arguments.Title;
				if (oModel.getData().IndiGoals.length > 0) {
					for (var i = 0; i < oModel.getData().IndiGoals.length; i++) {
						if (oModel.getData().IndiGoals[i].Title.toString() === this.Title) {
							title.setText(this.Title);
							description.setText(oModel.getData().IndiGoals[i].Description);
							duedate.setText(oModel.getData().IndiGoals[i].DueDate);

							return false;
						}
					}
				}

			} else {
				MessageBox.error("Data Not available");
			}
		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf pms.ZPMS.view.View4
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf pms.ZPMS.view.View4
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf pms.ZPMS.view.View4
		 */
		//	onExit: function() {
		//
		//	}

	});

});