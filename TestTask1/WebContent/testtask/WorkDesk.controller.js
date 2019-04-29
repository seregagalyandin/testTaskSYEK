sap.ui
		.define(
				[ "sap/ui/core/mvc/Controller", "sap/myApps/model/formatter",
						"sap/ui/model/resource/ResourceModel",
						"sap/ui/model/json/JSONModel" ],
				function(Controller, formatter, ResourceModel, JSONModel) {
					"use strict";
					return Controller
							.extend(
									"sap.myApps.testtask.workdesk",
									{
										formatter : formatter,

										onCollapseExpandPress : function() {
											var oNavigationList = this
													.getView().byId(
															'navigationList');
											var bExpanded = oNavigationList
													.getExpanded();

											oNavigationList
													.setExpanded(!bExpanded);
										},

										onItemSelect : function(oControlEvent) {

										},
										/**
										 * Called when a controller is
										 * instantiated and its View controls
										 * (if available) are already created.
										 * Can be used to modify the View before
										 * it is displayed, to bind event
										 * handlers and do other one-time
										 * initialization.
										 * 
										 * @memberOf zcompeten.zcompeten
										 */
										onInit : function() {
											var i18nModel = new ResourceModel(
													{
														bundleName : "sap.myApps.i18n.i18n"
													});

											this.getView().setModel(i18nModel,
													"i18n");

											var oEditModel = new JSONModel({
												isEdit : true,
												isDisplay : false,
												isPasport : true,
												isSnils : false
											});
											this.getView().setModel(oEditModel,
													"editModel");

											var oUserModel = new JSONModel({
												UserInfo : {
													Surname : "Галяндин",
													Name : "",
													Patronymic : "",
													DateOfBirth : "",
													Age : "",
													SelectDoc : "Паспорт РФ",
													SelectDocKey : "1",
													SerialPas : "",
													NumberPas : "",
													IssuedByPas : "",
													DateOfIssuePas : "",
													UnitCodePas : "",
													SnilsNumberPas : ""
												},
												DocList : [ {
													KeyDoc : "1",
													NameDoc : "Паспорт РФ"
												}, {
													KeyDoc : "2",
													NameDoc : "СНИЛС"
												} ],
												Educations : [ {
													Id : "0000",
													YearStart : "",
													YearEnd : "",
													NameInstitution : "",
													NameFaculty : "",
													NamePulpit : ""
												} ]
											});
											this.getView().setModel(oUserModel);
											
											this.contentEducations();
										},

										contentEducations : function() {

											var self = this;

											var container = this
													.getView()
													.byId("educationsContainer");

											var data = this.getView()
													.getModel().getData();
											var editModel = this.getView()
													.getModel("editModel")
													.getData();
											var bundle = this.getView()
													.getModel("i18n")
													.getResourceBundle();

											container.removeAllFormElements();

											if (editModel.isEdit
													&& !editModel.idDisplay) {
												data.Educations.forEach(function(item, i) {
															container.addFormElement(
																	new sap.ui.layout.form.FormElement({
																		fields: [
																			new sap.ui.layout.form.SimpleForm(
																			{
																				editable : false,
																				layout : sap.ui.layout.form.SimpleFormLayout.ResponsiveGridLayout,
																				labelSpanXL : 12,
																				labelSpanL : 12,
																				labelSpanM : 12,
																				labelSpanS : 12,
																				adjustLabelSpan : false,
																				emptySpanXL : 0,
																				emptySpanL : 0,
																				emptySpanM : 0,
																				emptySpanS : 0,
																				columnsXL : 1,
																				columnsL : 1,
																				columnsM : 1,
																				singleContainerFullSize : false,
																				content : [
																						new sap.m.Label(
																								{
																									text : bundle
																											.getText("year_start")
																								}),
																						new sap.m.StepInput(
																								{
																									id: "startDate-" + item.Id,
																									required : true,
																									value : item.YearStart,
																									min : 1920,
																									max : 2099,
																									step : 1,
																									change : function() {
																										self
																												.onChangeYearStart()
																									}
																								}),
																						new sap.m.Label(
																								{
																									text : bundle
																											.getText("year_end")
																								}),
																						new sap.m.StepInput(
																								{
																									id: "endDate-" + item.Id,
																									value : item.YearEnd,
																									min : 1920,
																									max : 2099,
																									step : 1,
																									change : function() {
																										self
																												.onChangeYearEnd()
																									}
																								}),
																						new sap.m.Label(
																								{
																									text : bundle
																											.getText("name_institution")
																								}),
																						new sap.m.Input(
																								{
																									id: "institution-" + item.Id,
																									maxLength : 300,
																									value : item.NameInstitution,
																									required : true,
																									liveChange : function() {
																										self
																												.onChangeNameInstitution()
																									}
																								}),
																						new sap.m.Label(
																								{
																									text : bundle
																											.getText("name_faculty")
																								}),
																						new sap.m.Input(
																								{
																									id: "faculty-" + item.Id,
																									maxLength : 300,
																									value : item.NameFaculty,
																									required : true,
																									liveChange : function() {
																										self
																												.onChangeNameFaculty()
																									}
																								}),
																						new sap.m.Label(
																								{
																									text : bundle
																											.getText("name_pulpit")
																								}),
																						new sap.m.Input(
																								{
																									id: "pulpit-" + item.Id,
																									maxLength : 300,
																									value : item.NamePulpit,
																									required : true,
																									liveChange : function() {
																										self
																												.onChangeNamePulpit()
																									}
																								})
																						]
																			}).addStyleClass("formEducations")
																	]}));
														});
											} else if (!editModel.isEdit
													&& editModel.isDisplay) {
												data.Educations.forEach(function(item, i) {
													container.addFormElement(new sap.ui.layout.form.SimpleForm(
																	{
																		editable : false,
																		layout : sap.ui.layout.form.SimpleFormLayout.ResponsiveGridLayout,
																		labelSpanXL : 12,
																		labelSpanL : 12,
																		labelSpanM : 12,
																		labelSpanS : 12,
																		adjustLabelSpan : false,
																		emptySpanXL : 0,
																		emptySpanL : 0,
																		emptySpanM : 0,
																		emptySpanS : 0,
																		columnsXL : 1,
																		columnsL : 1,
																		columnsM : 1,
																		singleContainerFullSize : false,
																		content : [
																				new sap.m.Label(
																						{
																							text : bundle
																									.getText("year_start")
																						}),
																				new sap.m.Text(
																						{
																							text : item.YearStart
																						}),
																				new sap.m.Label(
																						{
																							text : bundle
																									.getText("year_end")
																						}),
																				new sap.m.Text(
																						{
																							text : item.YearEnd
																						}),
																				new sap.m.Label(
																						{
																							text : bundle
																									.getText("name_institution")
																						}),
																				new sap.m.Text(
																						{
																							text : item.NameInstitution
																						}),
																				new sap.m.Label(
																						{
																							text : bundle
																									.getText("name_faculty")
																						}),
																				new sap.m.Text(
																						{
																							text : item.NameFaculty
																						}),
																				new sap.m.Label(
																						{
																							text : bundle
																									.getText("name_pulpit")
																						}),
																				new sap.m.Text(
																						{
																							text : item.NamePulpit
																						}) ]
																	}).addStyleClass("formEducations"));
												});
											}
										},

										isCheckInput : function(id, data) {
											var el = this.getView().byId(id);

											var ret = false;

											if (data === null
													|| data === undefined
													|| data === "") {
												el
														.setValueState(sap.ui.core.ValueState.Error);
												ret = false;
											} else {
												el
														.setValueState(sap.ui.core.ValueState.Accept);
												ret = true
											}

											return ret;
										},

										isCheckData : function() {
											var ret = true;
											var data = this.getView()
													.getModel().getData();

											ret = this.isCheckInput("surname",
													data.UserInfo.Surname);

											ret = this.isCheckInput("name",
													data.UserInfo.Name);

											ret = this.isCheckInput(
													"date_of_birth",
													data.UserInfo.DateOfBirth);

											var typeDoc = data.UserInfo.SelectDocKey;

											if (typeDoc === "1") {
												ret = this
														.isCheckInput(
																"serialPas",
																data.UserInfo.SerialPas);

												ret = this
														.isCheckInput(
																"numberPas",
																data.UserInfo.NumberPas);

												ret = this
														.isCheckInput(
																"issuedByPas",
																data.UserInfo.IssuedByPas);

												ret = this
														.isCheckInput(
																"dateOfIssuePas",
																data.UserInfo.DateOfIssuePas);

												ret = this
														.isCheckInput(
																"unitCodePas",
																data.UserInfo.UnitCodePas);
											} else if (typeDoc === "2") {
												ret = this
														.isCheckInput(
																"snilsNumberPas",
																data.UserInfo.SnilsNumberPas);
											}

											data.Educations.forEach(function(
													item, i) {
												ret = this.isCheckInput(
														"startDate-" + item.Id,
														item.YearStart);

												ret = this.isCheckInput(
														"endDate-" + item.Id,
														item.YearEnd);

												ret = this.isCheckInput(
														"institution-"
																+ item.Id,
														item.NameInstitution);

												ret = this.isCheckInput(
														"faculty-" + item.Id,
														item.NameFaculty);

												ret = this.isCheckInput(
														"pulpit-" + item.Id,
														item.NamePulpit);
											})

											return ret;
										},

										onSave : function(oEvent) {
											if (this.isCheckData()) {
												var editModel = this.getView()
														.getModel("editModel")
														.getData();
												editModel.isEdit = false;
												editModel.isDisplay = true;
												this.getView().getModel(
														"editModel").setData(
														editModel);
												
												this.contentEducations();
											}
										},

										onChangeSurname : function(oEvent) {
											this
													.getView()
													.getModel()
													.setProperty(
															"/UserInfo/Surname",
															oEvent.getSource()
																	.getValue());
										},

										onChangeName : function(oEvent) {
											this
													.getView()
													.getModel()
													.setProperty(
															"/UserInfo/Name",
															oEvent.getSource()
																	.getValue());
										},

										onChangePatronymic : function(oEvent) {
											this
													.getView()
													.getModel()
													.setProperty(
															"/UserInfo/Patronymic",
															oEvent.getSource()
																	.getValue());
										},

										onDateOfBirth : function(oEvent) {
											var value = oEvent.getSource()
													.getValue();
											var dateValue = oEvent.getSource()
													.getDateValue();

											var thisDate = new Date();

											var year = dateValue.getFullYear();
											var month = dateValue.getMonth();
											var day = dateValue.getDate();

											var thisYear = thisDate
													.getFullYear();
											var thisMonth = thisDate.getMonth();
											var thisDay = thisDate.getDate();

											var age = 0;

											if (month <= thisMonth
													&& day <= thisDay) {
												age = thisYear - year;
											} else {
												age = (thisYear - year) - 1;
											}

											this
													.getView()
													.getModel()
													.setProperty(
															"/UserInfo/DateOfBirth",
															value);
											this.getView().getModel()
													.setProperty(
															"/UserInfo/Age",
															age);
										},

										onChangeSelDoc : function(oEvent) {
											this
													.getView()
													.getModel()
													.setProperty(
															"/UserInfo/SelectDocKey",
															oEvent
																	.getSource()
																	.getSelectedItem()
																	.getKey());
											this
													.getView()
													.getModel()
													.setProperty(
															"/UserInfo/SelectDoc",
															oEvent
																	.getSource()
																	.getSelectedItem()
																	.getText());

											var editModel = this.getView()
													.getModel("editModel")
													.getData();

											if (oEvent.getSource()
													.getSelectedKey() == 1) {
												editModel.isPasport = true;
												editModel.isSnils = false;
												this.getView().getModel(
														"editModel").setData(
														editModel);
											} else if (oEvent.getSource()
													.getSelectedKey() == 2) {
												editModel.isPasport = false;
												editModel.isSnils = true;
												this.getView().getModel(
														"editModel").setData(
														editModel);
											}
										},

										onChangeSerialPas : function(oEvent) {
											this
													.getView()
													.getModel()
													.setProperty(
															"/UserInfo/SerialPas",
															oEvent.getSource()
																	.getValue());
										},

										onChangeNumberPas : function(oEvent) {
											this
													.getView()
													.getModel()
													.setProperty(
															"/UserInfo/NumberPas",
															oEvent.getSource()
																	.getValue());
										},

										onChangeIssuedByPas : function(oEvent) {
											this
													.getView()
													.getModel()
													.setProperty(
															"/UserInfo/IssuedByPas",
															oEvent.getSource()
																	.getValue());
										},

										onChangeDateOfIssuePas : function(
												oEvent) {
											this
													.getView()
													.getModel()
													.setProperty(
															"/UserInfo/DateOfIssuePas",
															oEvent.getSource()
																	.getValue());
										},

										onChangeUnitCodePas : function(oEvent) {
											this
													.getView()
													.getModel()
													.setProperty(
															"/UserInfo/UnitCodePas",
															oEvent.getSource()
																	.getValue());
										},

										onChangeSnilsNumberPas : function(
												oEvent) {
											this
													.getView()
													.getModel()
													.setProperty(
															"/UserInfo/SnilsNumberPas",
															oEvent.getSource()
																	.getValue());
										},

									/**
									 * Similar to onAfterRendering, but this
									 * hook is invoked before the controller's
									 * View is re-rendered (NOT before the first
									 * rendering! onInit() is used for that
									 * one!).
									 * 
									 * @memberOf zcompeten.zcompeten
									 */
									// onBeforeRendering: function() {
									//
									// },
									/**
									 * Called when the View has been rendered
									 * (so its HTML is part of the document).
									 * Post-rendering manipulations of the HTML
									 * could be done here. This hook is the same
									 * one that SAPUI5 controls get after being
									 * rendered.
									 * 
									 * @memberOf zcompeten.zcompeten
									 */
									// onAfterRendering: function() {
									//
									// },
									/**
									 * Called when the Controller is destroyed.
									 * Use this one to free resources and
									 * finalize activities.
									 * 
									 * @memberOf zcompeten.zcompeten
									 */
									// onExit: function() {
									//
									// }
									});
				});