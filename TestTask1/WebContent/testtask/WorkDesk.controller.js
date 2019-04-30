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

											//container.removeAllFormElements();
											container.destroyFormElements();

											if (editModel.isEdit
													&& !editModel.idDisplay) {
												data.Educations.forEach(function(item, i) {
															container.addFormElement(
																	new sap.ui.layout.form.FormElement({
																		id: "elem-" + item.Id,
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
																									change : function(oEvent) {
																										self
																												.onChangeYearStart(oEvent)
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
																									change : function(oEvent) {
																										self
																												.onChangeYearEnd(oEvent)
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
																									liveChange : function(oEvent) {
																										self
																												.onChangeNameInstitution(oEvent)
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
																									liveChange : function(oEvent) {
																										self
																												.onChangeNameFaculty(oEvent)
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
																									liveChange : function(oEvent) {
																										self
																												.onChangeNamePulpit(oEvent)
																									}
																								})
																						]
																			}).addStyleClass("formEducations")
																	]}));
														});
											} else if (!editModel.isEdit
													&& editModel.isDisplay) {
												data.Educations.forEach(function(item, i) {
													container.addFormElement(
															new sap.ui.layout.form.FormElement({
																id: "elem-" + item.Id,
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
																	}).addStyleClass("formEducations")]}));
												});
											}
										},
										
										contentAddEducations : function(edu) { 

											var self = this;

											var container = this.getView().byId("educationsContainer");
											
											var bundle = this.getView()
													.getModel("i18n")
													.getResourceBundle();
											
											container.addFormElement(
													new sap.ui.layout.form.FormElement({
														id: "elem-" + edu.Id,
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
																					id: "startDate-" + edu.Id,
																					required : true,
																					value : edu.YearStart,
																					min : 1920,
																					max : 2099,
																					step : 1,
																					change : function(oEvent) {
																						self
																								.onChangeYearStart(oEvent)
																					}
																				}),
																		new sap.m.Label(
																				{
																					text : bundle
																							.getText("year_end")
																				}),
																		new sap.m.StepInput(
																				{
																					id: "endDate-" + edu.Id,
																					value : edu.YearEnd,
																					min : 1920,
																					max : 2099,
																					step : 1,
																					change : function(oEvent) {
																						self
																								.onChangeYearEnd(oEvent)
																					}
																				}),
																		new sap.m.Label(
																				{
																					text : bundle
																							.getText("name_institution")
																				}),
																		new sap.m.Input(
																				{
																					id: "institution-" + edu.Id,
																					maxLength : 300,
																					value : edu.NameInstitution,
																					required : true,
																					liveChange : function(oEvent) {
																						self
																								.onChangeNameInstitution(oEvent)
																					}
																				}),
																		new sap.m.Label(
																				{
																					text : bundle
																							.getText("name_faculty")
																				}),
																		new sap.m.Input(
																				{
																					id: "faculty-" + edu.Id,
																					maxLength : 300,
																					value : edu.NameFaculty,
																					required : true,
																					liveChange : function(oEvent) {
																						self
																								.onChangeNameFaculty(oEvent)
																					}
																				}),
																		new sap.m.Label(
																				{
																					text : bundle
																							.getText("name_pulpit")
																				}),
																		new sap.m.Input(
																				{
																					id: "pulpit-" + edu.Id,
																					maxLength : 300,
																					value : edu.NamePulpit,
																					required : true,
																					liveChange : function(oEvent) {
																						self
																								.onChangeNamePulpit(oEvent)
																					}
																				})
																		]
															}).addStyleClass("formEducations")
													]}));
										},
										
										contentRemoveEducations : function(edu) { 
											$('#elem-' + edu.Id).remove();
											
											var container = this.getView().byId("educationsContainer");
											
											container.removeFormElement("elem-" + edu.Id)
										},

										isCheckInput : function(id, data, isEdu) {

											var el;
											
											if(isEdu)
											{
												var container = this.getView().byId("educationsContainer");

												container.getFormElements().forEach(function(item, i) {
													item.getFields().forEach(function(itemy, iy) {
														itemy.getContent().forEach(function(itemz, iz) {
															if(itemz.getParameter("id") === id)
															{
																el =  itemz;
															}
														});
													});
												});
											}
											else
											{
												el = this.getView().byId(id);
											}
											
											var ret = false;
											
											if(el !== undefined && el !== null)
											{
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
											}

											return ret;
										},

										isCheckData : function() {
											var self = this;
											var ret = true;
											var data = this.getView()
													.getModel().getData();

											ret = this.isCheckInput("surname",
													data.UserInfo.Surname, false);

											ret = this.isCheckInput("name",
													data.UserInfo.Name, false);

											ret = this.isCheckInput(
													"date_of_birth",
													data.UserInfo.DateOfBirth, false);

											var typeDoc = data.UserInfo.SelectDocKey;

											if (typeDoc === "1") {
												ret = self.isCheckInput(
																"serialPas",
																data.UserInfo.SerialPas, false);

												ret = self.isCheckInput(
																"numberPas",
																data.UserInfo.NumberPas, false);

												ret = self.isCheckInput(
																"issuedByPas",
																data.UserInfo.IssuedByPas, false);

												ret = self.isCheckInput(
																"dateOfIssuePas",
																data.UserInfo.DateOfIssuePas, false);

												ret = self.isCheckInput(
																"unitCodePas",
																data.UserInfo.UnitCodePas, false);
											} else if (typeDoc === "2") {
												ret = self.isCheckInput(
																"snilsNumberPas",
																data.UserInfo.SnilsNumberPas, false);
											}

											data.Educations.forEach(function(
													item, i) {
												ret = self.isCheckInput(
														"startDate-" + item.Id,
														item.YearStart, true);

												ret = self.isCheckInput(
														"endDate-" + item.Id,
														item.YearEnd, true);

												ret = self.isCheckInput(
														"institution-"
																+ item.Id,
														item.NameInstitution, true);

												ret = self.isCheckInput(
														"faculty-" + item.Id,
														item.NameFaculty, true);

												ret = self.isCheckInput(
														"pulpit-" + item.Id,
														item.NamePulpit, true);
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
										
										onChangeYearStart: function(oEvent) {
											var idSt = oEvent.getParameter("id");
											var r = /\d+/;
											var id = Number(idSt.match(r));
											
											var educations = this.getView().getModel().getProperty("/Educations");
											
											educations.forEach(function(item, i) {
												if(educations[i].Id == id)
												{
													educations[i].YearStart = oEvent.getSource().getValue();
												}
											});
											
											this.getView().getModel().setProperty("/Educations", educations);
										},
										
										onChangeYearEnd: function(oEvent) {
											var idSt = oEvent.getParameter("id");
											var r = /\d+/;
											var id = Number(idSt.match(r));
											
											var educations = this.getView().getModel().getProperty("/Educations");
											
											educations.forEach(function(item, i) {
												if(educations[i].Id == id)
												{
													educations[i].YearEnd = oEvent.getSource().getValue();
												}
											});
											
											this.getView().getModel().setProperty("/Educations", educations);
										},
										
										onChangeNameInstitution: function(oEvent) {
											var idSt = oEvent.getParameter("id");
											var r = /\d+/;
											var id = Number(idSt.match(r));
											
											var educations = this.getView().getModel().getProperty("/Educations");
											
											educations.forEach(function(item, i) {
												if(educations[i].Id == id)
												{
													educations[i].NameInstitution = oEvent.getSource().getValue();
												}
											});
											
											this.getView().getModel().setProperty("/Educations", educations);
										},
										
										onChangeNameFaculty: function(oEvent) {
											var idSt = oEvent.getParameter("id");
											var r = /\d+/;
											var id = Number(idSt.match(r));
											
											var educations = this.getView().getModel().getProperty("/Educations");
											
											educations.forEach(function(item, i) {
												if(educations[i].Id == id)
												{
													educations[i].NameFaculty = oEvent.getSource().getValue();
												}
											});
											
											this.getView().getModel().setProperty("/Educations", educations);
										},
										
										onChangeNamePulpit: function(oEvent) {
											var idSt = oEvent.getParameter("id");
											var r = /\d+/;
											var id = Number(idSt.match(r));
											
											var educations = this.getView().getModel().getProperty("/Educations");
											
											educations.forEach(function(item, i) {
												if(educations[i].Id == id)
												{
													educations[i].NamePulpit = oEvent.getSource().getValue();
												}
											});
											
											this.getView().getModel().setProperty("/Educations", educations);
										},
										
										onAddEdu: function(oEvent) {
											
											var educations = this.getView().getModel().getProperty("/Educations");
											
											if(educations.length !== 0 && educations !== undefined && educations !== null)
											{
												var min = Number(educations[0].Id);
												var max = min;
												for (var i = 1; i < educations.length; ++i) {
												    if (Number(educations[i].Id) > max) max = Number(educations[i].Id);
												    if (Number(educations[i].Id) < min) min = Number(educations[i].Id);
												};
												
												max = max + 1;
											}
											else
											{
												max = 0;
											}
											
											var education = {};
											education.Id = max.toString();
											education.YearStart = "",
											education.YearEnd = "",
											education.NameInstitution = "",
											education.NameFaculty = "",
											education.NamePulpit = ""
												
											educations.push(education);
											
											this.getView().getModel().setProperty("/Educations", educations);
											
											this.contentEducations();
										},
										
										onRemoveEdu: function(oEvent) {
											
											var educations = this.getView().getModel().getProperty("/Educations");
											
											if(educations.length !== 0 && educations !== undefined && educations !== null)
											{
												var remEdu = educations.pop();
												
												this.getView().getModel().setProperty("/Educations", educations);
												
												this.contentEducations();
											}
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