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

	return Controller.extend("pms.ZPMS.controller.View2", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf pms.ZPMS.view.View2
		 */
		onInit: function () {
			this._oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this._oRouter.getRoute("view2").attachPatternMatched(this.onEditMatched, this);

		},

		getRouter: function () {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},

		Gotopage1: function () {

			this.getRouter().navTo("View1", {}, true);

			var that = this;
			that.OnClear();
		},

		onEditMatched: function (oEvent) {
			var oParameters = oEvent.getParameters(); // get parameter 
			var oModelData = this.getOwnerComponent().getModel("GoalsSet"); //get the data from model 
			this.getView().setModel(oModelData); //set the data to model
			var oModel = this.getView().getModel();

			var EmpGl = this.getView().byId("gl1");
			var title = this.getView().byId("title1");
			var description = this.getView().byId("desc");
			var duedate = this.getView().byId("DP1");

			if (oParameters.arguments.GoalNo !== "" || oParameters.arguments.GoalNo !== null) {
				this.GoalNo = oParameters.arguments.GoalNo;
				if (oModel.getData().EmpGoals.length > 0) {
					for (var i = 0; i < oModel.getData().EmpGoals.length; i++) {
						if (oModel.getData().EmpGoals[i].GoalNo.toString() === this.GoalNo) {
							EmpGl.setValue(this.GoalNo);
							title.setValue(oModel.getData().EmpGoals[i].Title);
							description.setValue(oModel.getData().EmpGoals[i].Description);
							duedate.setValue(oModel.getData().EmpGoals[i].DueDate);

							return false;
						}
					}
				}

			} else {
				MessageBox.error("Data Not available");
			}
		},

		OnSave: function () {
			var that = this;
			var GoalNo = this.getView().byId("gl1");
			if (GoalNo.getValue() === "0") {
				that._onSaveData();

			} else {
				that._onUpdateData();
			}
		},

		_onSaveData: function () {
			var that = this;
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);

			var NewTitle = this.getView().byId("title1");
			var Newdesc = this.getView().byId("desc");
			var Newdate = this.getView().byId("DP1");

			if (NewTitle.getValue() === "") {
				MessageToast.show("Title is required");
			} else {
				// Get the Model in the view 
				var oModelEmp = this.getOwnerComponent().getModel("GoalsSet");
				this.getView().setModel(oModelEmp);

				var oModel = this.getView().getModel();

				// Get the Number of records in file
				var goalnum = oModel.getProperty("/EmpGoals").length;

				var NewgoalID = goalnum + 1;
				var oNewEntry = {};

				oNewEntry = {
					"GoalNo": NewgoalID,
					"Title": NewTitle.getValue(),
					"Description": Newdesc.getValue(),
					"DueDate": Newdate.getValue()
						//	"Gender": NewGen.getSelectedKey()
				};

				var oModelEmployee = oModel.getProperty("/EmpGoals");
				oModelEmployee.push(oNewEntry);
				oModel.setProperty("/EmpGoals", oModelEmployee);

				MessageBox.confirm("Do you want to add new data?", {
					icon: sap.m.MessageBox.Icon.INFORMATION,
					title: "Confirm",
					actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
					onClose: function (sAction) {
						if (sAction === "YES") {
							oRouter.navTo("View1");
							that.OnClear();
						}
					}
				});
			}
		},

	
		_onUpdateData: function () {
 			var that = this;
 			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);

 			var goalno1 = this.getView().byId("gl1");
 			var title1 = this.getView().byId("title1");
 			var desc1 = this.getView().byId("desc");
 			var Duedate1 = this.getView().byId("DP1");
 			

 			if (title1.getValue() === "") {
 				MessageToast.show(" Title is required");
 			} else {
 				// Get the Model in the view 
 				var oModelEmp = this.getOwnerComponent().getModel("GoalsSet");
 				this.getView().setModel(oModelEmp);

 				var oModel = this.getView().getModel();
 				var oModelEmpLength = oModel.getProperty("/EmpGoals");
 				for (var i = 0; i < oModel.getData().EmpGoals.length; i++) {
 					if (oModel.getData().EmpGoals[i].GoalNo.toString() === goalno1.getValue()) {
 						oModel.getData().EmpGoals[i].GoalNo = goalno1.getValue();
 						oModel.getData().EmpGoals[i].Title = title1.getValue();
 						oModel.getData().EmpGoals[i].Description = desc1.getValue();
 						oModel.getData().EmpGoals[i].DueDate = Duedate1.getValue();
 					
 					} else {
 						oModel.getData().EmpGoals[i].GoalNo = oModel.getData().EmpGoals[i].GoalNo;
 						oModel.getData().EmpGoals[i].Title = oModel.getData().EmpGoals[i].Title;
 						oModel.getData().EmpGoals[i].Description = oModel.getData().EmpGoals[i].Description;
 						oModel.getData().EmpGoals[i].DueDate = oModel.getData().EmpGoals[i].DueDate;
 						

 					}
 				}

 				oModel.setProperty("/EmpGoals", oModelEmpLength);
 				MessageBox.confirm("Do you want to Update ", {
 					icon: sap.m.MessageBox.Icon.INFORMATION,
 					title: "Confirm",
 					actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
 					onClose: function (sAction) {
 						if (sAction === "YES") {
 							oRouter.navTo("View1");
 							that.OnClear();
 						}
 					}
 				});
 			}
 		},

		OnClear: function () {
			var title = this.getView().byId("title1");
			var description = this.getView().byId("desc");
			var duedate = this.getView().byId("DP1");

			title.setValue("");
			description.setValue("");
			duedate.setValue("");

		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf pms.ZPMS.view.View2
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf pms.ZPMS.view.View2
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf pms.ZPMS.view.View2
		 */
		//	onExit: function() {
		//
		//	}

	});

});