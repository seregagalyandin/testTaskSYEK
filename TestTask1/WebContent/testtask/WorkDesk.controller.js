sap.ui.define([ "sap/ui/core/mvc/Controller", "sap/myApps/model/formatter",
		"sap/ui/model/resource/ResourceModel", "sap/ui/model/json/JSONModel" ],
		function(Controller, formatter, ResourceModel, JSONModel) {
			"use strict";
			return Controller.extend("sap.myApps.testtask.workdesk",
					{
						formatter : formatter,

						onCollapseExpandPress : function() {
							var oNavigationList = this.getView().byId(
									'navigationList');
							var bExpanded = oNavigationList.getExpanded();

							oNavigationList.setExpanded(!bExpanded);
						},

						onItemSelect : function(oControlEvent) {

						},
						/**
						 * Called when a controller is instantiated and its View
						 * controls (if available) are already created. Can be
						 * used to modify the View before it is displayed, to
						 * bind event handlers and do other one-time
						 * initialization.
						 * 
						 * @memberOf zcompeten.zcompeten
						 */
						onInit : function() {
							var i18nModel = new ResourceModel({
								bundleName : "sap.myApps.i18n.i18n"
							});

							this.getView().setModel(i18nModel, "i18n");

							var oEditModel = new JSONModel({
								isEdit : true,
								isDisplay : false,
								isPasport : true,
								isSnils : false
							});
							this.getView().setModel(oEditModel, "editModel");

							var oUserModel = new JSONModel({
								UserInfo : {
									Surname : "Галяндин",
									Name : "",
									Patronymic : "",
									DateOfBirth : "",
									Age : "",
									SelectDoc : "Паспорт РФ",
									SelectDocKey : 1,
									SerialPas : "",
									NumberPas : "",
									IssuedByPas : "",
									DateOfIssuePas : "",
									UnitCodePas : "",
									SnilsNumberPas : ""
								},
								DocList : [ {
									KeyDoc : 1,
									NameDoc : "Паспорт РФ"
								}, {
									KeyDoc : 2,
									NameDoc : "СНИЛС"
								} ],
								Educations : [ {
									id : 0,
									YearStart : "",
									YearEnd : "",
									NameInstitution : "",
									NameFaculty : "",
									NamePulpit : ""
								} ]
							});
							this.getView().setModel(oUserModel);
						},
						
						isCheckData: function() {
							var ret = true;
							var data = this.getView().getModel().getData();
							
							var elSurname = this.getView().byId("surname");
							var elName = this.getView().byId("name");
							var elDateOfBirth = this.getView().byId("date_of_birth");
							
							if(data.UserInfo.Surname === null || data.UserInfo.Surname === undefined || data.UserInfo.Surname === "")
							{
								elSurname.setValueState(sap.ui.core.ValueState.Error);
								ret = false;
							}
							else
							{
								elSurname.setValueState(sap.ui.core.ValueState.Accept);
							}
							
							if(data.UserInfo.Name === null || data.UserInfo.Name === undefined || data.UserInfo.Name === "")
							{
								elName.setValueState(sap.ui.core.ValueState.Error);
								ret = false;
							}
							else
							{
								elName.setValueState(sap.ui.core.ValueState.Accept);
							}
							
							if(data.UserInfo.DateOfBirth === null || data.UserInfo.DateOfBirth === undefined || data.UserInfo.DateOfBirth === "")
							{
								elDateOfBirth.setValueState(sap.ui.core.ValueState.Error);
								ret = false;
							}
							else
							{
								elDateOfBirth.setValueState(sap.ui.core.ValueState.Accept);
							}
								
							return ret;
						},
						
						onSave: function(oEvent) {
							if(this.isCheckData())
							{
								var editModel = this.getView().getModel("editModel").getData();
								editModel.isEdit = false;
								editModel.isDisplay = true;
								this.getView().getModel("editModel").setData(editModel);
							}
						},
						
						onChangeSurname: function(oEvent) {
							this.getView().getModel().setProperty("/UserInfo/Surname", oEvent.getSource().getValue());
						},
						
						onChangeName: function(oEvent) {
							this.getView().getModel().setProperty("/UserInfo/Name", oEvent.getSource().getValue());
						},
						
						onChangePatronymic: function(oEvent) {
							this.getView().getModel().setProperty("/UserInfo/Patronymic", oEvent.getSource().getValue());
						},
						
						onDateOfBirth: function(oEvent) {
							this.getView().getModel().setProperty("/UserInfo/DateOfBirth", oEvent.getSource().getValue());
						},
						
						onChangeSelDoc: function(oEvent) {
							this.getView().getModel().setProperty("/UserInfo/SelectDocKey", oEvent.getSource().getSelectedItem().getKey());
							this.getView().getModel().setProperty("/UserInfo/SelectDoc", oEvent.getSource().getSelectedItem().getText());
							
							var editModel = this.getView().getModel("editModel").getData();
							
							if(oEvent.getSource().getSelectedKey() == 1)
							{
								editModel.isPasport = true;
								editModel.isSnils = false;
								this.getView().getModel("editModel").setData(editModel);
							}
							else if(oEvent.getSource().getSelectedKey() == 2)
							{
								editModel.isPasport = false;
								editModel.isSnils = true;
								this.getView().getModel("editModel").setData(editModel);
							}
						},
						
						onChangeSerialPas: function(oEvent) {
							this.getView().getModel().setProperty("/UserInfo/SerialPas", oEvent.getSource().getValue());
						},
						
						onChangeNumberPas: function(oEvent) {
							this.getView().getModel().setProperty("/UserInfo/NumberPas", oEvent.getSource().getValue());
						},
						
						onChangeIssuedByPas: function(oEvent) {
							this.getView().getModel().setProperty("/UserInfo/IssuedByPas", oEvent.getSource().getValue());
						},
						
						onChangeDateOfIssuePas: function(oEvent) {
							this.getView().getModel().setProperty("/UserInfo/DateOfIssuePas", oEvent.getSource().getValue());
						},
						
						onChangeUnitCodePas: function(oEvent) {
							this.getView().getModel().setProperty("/UserInfo/UnitCodePas", oEvent.getSource().getValue());
						},
						
						onChangeSnilsNumberPas: function(oEvent) {
							this.getView().getModel().setProperty("/UserInfo/SnilsNumberPas", oEvent.getSource().getValue());
						},

					/**
					 * Similar to onAfterRendering, but this hook is invoked
					 * before the controller's View is re-rendered (NOT before
					 * the first rendering! onInit() is used for that one!).
					 * 
					 * @memberOf zcompeten.zcompeten
					 */
					// onBeforeRendering: function() {
					//
					// },
					/**
					 * Called when the View has been rendered (so its HTML is
					 * part of the document). Post-rendering manipulations of
					 * the HTML could be done here. This hook is the same one
					 * that SAPUI5 controls get after being rendered.
					 * 
					 * @memberOf zcompeten.zcompeten
					 */
					// onAfterRendering: function() {
					//
					// },
					/**
					 * Called when the Controller is destroyed. Use this one to
					 * free resources and finalize activities.
					 * 
					 * @memberOf zcompeten.zcompeten
					 */
					// onExit: function() {
					//
					// }
					});
		});