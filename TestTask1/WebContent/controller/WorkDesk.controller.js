sap.ui
		.define(
				[ "sap/myApps/controller/BaseController",
						"sap/myApps/model/formatter",
						"sap/ui/model/resource/ResourceModel",
						"sap/ui/model/json/JSONModel",
						"sap/ui/core/routing/History" ],
				function(BaseController, formatter, ResourceModel, JSONModel,
						History) {
					"use strict";
					return BaseController
							.extend(
									"sap.myApps.controller.workdesk",
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

											this
													.getRouter()
													.getRoute("main")
													.attachPatternMatched(
															this._onMasterMatched,
															this);

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
													YearStart : "2019",
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

											container.destroyFormElements();

											if (editModel.isEdit
													&& !editModel.idDisplay) {
												data.Educations
														.forEach(function(item,
																i) {
															container
																	.addFormElement(self
																			.addFormElementEd(
																					item,
																					self,
																					bundle));
														});
											} else if (!editModel.isEdit
													&& editModel.isDisplay) {
												data.Educations
														.forEach(function(item,
																i) {
															container
																	.addFormElement(self
																			.addFormElementDi(
																					item,
																					self,
																					bundle));
														});
											}
										},

										contentAddEducations : function(edu) {

											var self = this;

											var container = this
													.getView()
													.byId("educationsContainer");

											var bundle = this.getView()
													.getModel("i18n")
													.getResourceBundle();

											container.addFormElement(self
													.addFormElementEd(edu,
															self, bundle));
										},

										addFormElementEd : function(data, self,
												bundle) {
											return new sap.ui.layout.form.FormElement(
													{
														id : "elem-" + data.Id
																+ "-edit",
														fields : [ new sap.ui.layout.form.SimpleForm(
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
																						id : "startDate-"
																								+ data.Id,
																						required : true,
																						value : data.YearStart,
																						min : 1920,
																						max : 2099,
																						step : 1,
																						change : function(
																								oEvent) {
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
																						id : "endDate-"
																								+ data.Id,
																						value : data.YearEnd,
																						min : 1920,
																						max : 2099,
																						step : 1,
																						change : function(
																								oEvent) {
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
																						id : "institution-"
																								+ data.Id,
																						maxLength : 300,
																						value : data.NameInstitution,
																						required : true,
																						liveChange : function(
																								oEvent) {
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
																						id : "faculty-"
																								+ data.Id,
																						maxLength : 300,
																						value : data.NameFaculty,
																						required : true,
																						liveChange : function(
																								oEvent) {
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
																						id : "pulpit-"
																								+ data.Id,
																						maxLength : 300,
																						value : data.NamePulpit,
																						required : true,
																						liveChange : function(
																								oEvent) {
																							self
																									.onChangeNamePulpit(oEvent)
																						}
																					}) ]
																})
																.addStyleClass("formEducations") ]
													});
										},

										addFormElementDi : function(data, self,
												bundle) {
											return new sap.ui.layout.form.FormElement(
													{
														id : "elem-" + data.Id
																+ "-display",
														fields : [ new sap.ui.layout.form.SimpleForm(
																{
																	editable : false,
																	layout : sap.ui.layout.form.SimpleFormLayout.ResponsiveGridLayout,
																	labelSpanXL : 4,
																	labelSpanL : 4,
																	labelSpanM : 4,
																	labelSpanS : 4,
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
																						text : data.YearStart
																					}),
																			new sap.m.Label(
																					{
																						text : bundle
																								.getText("year_end")
																					}),
																			new sap.m.Text(
																					{
																						text : data.YearEnd
																					}),
																			new sap.m.Label(
																					{
																						text : bundle
																								.getText("name_institution")
																					}),
																			new sap.m.Text(
																					{
																						text : data.NameInstitution
																					}),
																			new sap.m.Label(
																					{
																						text : bundle
																								.getText("name_faculty")
																					}),
																			new sap.m.Text(
																					{
																						text : data.NameFaculty
																					}),
																			new sap.m.Label(
																					{
																						text : bundle
																								.getText("name_pulpit")
																					}),
																			new sap.m.Text(
																					{
																						text : data.NamePulpit
																					}) ]
																})
																.addStyleClass("formEducations") ]
													});
										},

										contentRemoveEducations : function(edu) {
											$('#elem-' + edu.Id + "-edit")
													.remove();

											var container = this
													.getView()
													.byId("educationsContainer");

											container.removeFormElement("elem-"
													+ edu.Id + "-edit")
										},

										isCheckInput : function(id, name, data,
												isEdu, isLive) {

											var self = this;

											var el;

											if (isEdu) {
												var container = this
														.getView()
														.byId(
																"educationsContainer");

												container
														.getFormElements()
														.forEach(
																function(item,
																		i) {
																	item
																			.getFields()
																			.forEach(
																					function(
																							itemy,
																							iy) {
																						itemy
																								.getContent()
																								.forEach(
																										function(
																												itemz,
																												iz) {
																											var idz = itemz
																													.getId();
																											if (idz !== undefined
																													&& idz !== null
																													&& idz !== "") {
																												if (idz === id) {
																													el = itemz;
																												}
																											}
																										});
																					});
																});
											} else {
												el = this.getView().byId(id);
											}

											var ret = false;

											if (el !== undefined && el !== null) {
												if (isLive) {
													ret = self.isValidLive(el,
															data, name)
												} else {
													if (data === null
															|| data === undefined
															|| data === "") {
														el
																.setValueState(sap.ui.core.ValueState.Error);
														el
																.setValueStateText("Обязательное бля ввода поле!");
														ret = false;
													} else {
														ret = self.isValid(el,
																data, name)
													}
												}
											}

											return ret;
										},

										isValidLive : function(el, data, type) {

											var ret = true;

											switch (type) {

											case "name":

												var pattern = /^[а-яеёА-ЯЕЁ-]{0,30}$/;
												if (pattern.test(data) == true) {
													el
															.setValueState(sap.ui.core.ValueState.Accept);
												} else {
													el
															.setValueState(sap.ui.core.ValueState.Error);
													el
															.setValueStateText("Вводите только кириллические символы без пробелов!");
													ret = false;
												}

												break;
											case "date":

												var pattern = /^[0-9.]{0,11}$/;
												if (pattern.test(data) == true) {
													el
															.setValueState(sap.ui.core.ValueState.Accept);
												} else {
													el
															.setValueState(sap.ui.core.ValueState.Error);
													el
															.setValueStateText("Вводите дату в формате дд.мм.гггг!");
													ret = false;
												}

												break;
											case "serial_pas":

												var pattern = /^[0-9]{0,4}$/;
												if (pattern.test(data) == true) {
													el
															.setValueState(sap.ui.core.ValueState.Accept);
												} else {
													el
															.setValueState(sap.ui.core.ValueState.Error);
													el
															.setValueStateText("Вводите только числа!");
													ret = false;
												}

												break;
											case "number_pas":

												var pattern = /^[0-9]{0,6}$/;
												if (pattern.test(data) == true) {
													el
															.setValueState(sap.ui.core.ValueState.Accept);
												} else {
													el
															.setValueState(sap.ui.core.ValueState.Error);
													el
															.setValueStateText("Вводите только числа!");
													ret = false;
												}

												break;
											case "unit_code_pas":

												var pattern = /^[-0-9]{0,7}$/;
												if (pattern.test(data) == true) {
													el
															.setValueState(sap.ui.core.ValueState.Accept);
												} else {
													el
															.setValueState(sap.ui.core.ValueState.Error);
													el
															.setValueStateText("Вводите только числа!");
													ret = false;
												}

												break;
											case "snils_number_pas":

												var pattern = /^[-0-9 ]{0,14}$/;
												if (pattern.test(data) == true) {
													el
															.setValueState(sap.ui.core.ValueState.Accept);
												} else {
													el
															.setValueState(sap.ui.core.ValueState.Error);
													el
															.setValueStateText('Вводите только числа!');
													ret = false;
												}

												break;
											case "year":

												var pattern = /^[0-9]{0,4}$/;
												if (pattern.test(data
														.toString()) == true) {
													el
															.setValueState(sap.ui.core.ValueState.Accept);
												} else {
													el
															.setValueState(sap.ui.core.ValueState.Error);
													el
															.setValueStateText("Вводите только числа!");
													ret = false;
												}

												break;
											case "name_edu":

												var pattern = /^[a-zA-Zа-яеёА-ЯЕЁ-]{0,250}$/;
												if (pattern.test(data) == true) {
													el
															.setValueState(sap.ui.core.ValueState.Accept);
												} else {
													el
															.setValueState(sap.ui.core.ValueState.Error);
													el
															.setValueStateText('Вводите только буквы на латинице, киррилице и символ "-"!');
													ret = false;
												}

												break;

											}

											return ret;
										},

										isValid : function(el, data, type) {

											var ret = true;

											switch (type) {

											case "name":

												var pattern = /^[а-яеёА-ЯЕЁ-]{0,30}$/;
												if (pattern.test(data) == true) {
													el
															.setValueState(sap.ui.core.ValueState.Accept);
												} else {
													el
															.setValueState(sap.ui.core.ValueState.Error);
													el
															.setValueStateText("Вводите только кириллические символы!");
													ret = false;
												}

												break;
											case "date":

												var pattern = /^([0-2]\d|3[01])\.(0\d|1[012])\.(\d{4})$/;
												if (pattern.test(data) == true) {
													el
															.setValueState(sap.ui.core.ValueState.Accept);
												} else {
													el
															.setValueState(sap.ui.core.ValueState.Error);
													el
															.setValueStateText("Вводите дату в формате дд.мм.гггг!");
													ret = false;
												}

												break;
											case "serial_pas":

												var pattern = /^[0-9]{4,4}$/;
												if (pattern.test(data) == true
														&& data.length === 4) {
													el
															.setValueState(sap.ui.core.ValueState.Accept);
												} else {
													el
															.setValueState(sap.ui.core.ValueState.Error);
													el
															.setValueStateText("Вводите только числа!");
													ret = false;
												}

												break;
											case "number_pas":

												var pattern = /^[0-9]{6,6}$/;
												if (pattern.test(data) == true
														&& data.length === 6) {
													el
															.setValueState(sap.ui.core.ValueState.Accept);
												} else {
													el
															.setValueState(sap.ui.core.ValueState.Error);
													el
															.setValueStateText("Вводите только числа!");
													ret = false;
												}

												break;
											case "unit_code_pas":

												var pattern = /^\d{3}-\d{3}$/;
												if (pattern.test(data) == true) {
													el
															.setValueState(sap.ui.core.ValueState.Accept);
												} else {
													el
															.setValueState(sap.ui.core.ValueState.Error);
													el
															.setValueStateText("Вводите только числа!");
													ret = false;
												}

												break;
											case "snils_number_pas":

												var pattern = /^\d{3}-\d{3}-\d{3} \d{2}$/;
												if (pattern.test(data) == true) {
													el
															.setValueState(sap.ui.core.ValueState.Accept);
												} else {
													el
															.setValueState(sap.ui.core.ValueState.Error);
													el
															.setValueStateText("Вводите только числа!");
													ret = false;
												}

												break;
											case "year":

												var pattern = /^[0-9]{4,4}$/;
												if (pattern.test(data
														.toString()) == true
														&& data.toString().length === 4) {
													el
															.setValueState(sap.ui.core.ValueState.Accept);
												} else {
													el
															.setValueState(sap.ui.core.ValueState.Error);
													el
															.setValueStateText("Вводите только чиста!");
													ret = false;
												}

												break;

											}
											;

											return ret;
										},

										isCheckData : function() {
											var self = this;
											var ret = true;
											var data = this.getView()
													.getModel().getData();

											var lret = this.isCheckInput(
													"surname", "name",
													data.UserInfo.Surname,
													false, false);

											if (!lret) {
												ret = lret;
											}

											lret = this.isCheckInput("name",
													"name", data.UserInfo.Name,
													false, false);

											if (!lret) {
												ret = lret;
											}

											lret = this.isCheckInput(
													"date_of_birth", "date",
													data.UserInfo.DateOfBirth,
													false, false);

											if (!lret) {
												ret = lret;
											}

											var typeDoc = data.UserInfo.SelectDocKey;

											if (typeDoc === "1") {
												lret = self
														.isCheckInput(
																"serialPas",
																"serialPas",
																data.UserInfo.SerialPas,
																false, false);

												if (!lret) {
													ret = lret;
												}

												lret = self
														.isCheckInput(
																"numberPas",
																"numberPas",
																data.UserInfo.NumberPas,
																false, false);

												if (!lret) {
													ret = lret;
												}

												lret = self
														.isCheckInput(
																"issuedByPas",
																"issuedByPas",
																data.UserInfo.IssuedByPas,
																false, false);

												if (!lret) {
													ret = lret;
												}

												lret = self
														.isCheckInput(
																"dateOfIssuePas",
																"date",
																data.UserInfo.DateOfIssuePas,
																false, false);

												if (!lret) {
													ret = lret;
												}

												lret = self
														.isCheckInput(
																"unitCodePas",
																"unit_code_pas",
																data.UserInfo.UnitCodePas,
																false, false);

												if (!lret) {
													ret = lret;
												}
											} else if (typeDoc === "2") {
												lret = self
														.isCheckInput(
																"snilsNumberPas",
																"snils_number_pas",
																data.UserInfo.SnilsNumberPas,
																false, false);

												if (!lret) {
													ret = lret;
												}
											}

											data.Educations.forEach(function(
													item, i) {
												lret = self.isCheckInput(
														"startDate-" + item.Id,
														"year", item.YearStart,
														true, false);

												if (!lret) {
													ret = lret;
												}

												lret = self.isCheckInput(
														"endDate-" + item.Id,
														"year", item.YearEnd,
														true, false);

												if (!lret) {
													ret = lret;
												}

												lret = self.isCheckInput(
														"institution-"
																+ item.Id,
														"name_edu",
														item.NameInstitution,
														true, false);

												if (!lret) {
													ret = lret;
												}

												lret = self.isCheckInput(
														"faculty-" + item.Id,
														"name_edu",
														item.NameFaculty, true,
														false);

												if (!lret) {
													ret = lret;
												}

												lret = self.isCheckInput(
														"pulpit-" + item.Id,
														"name_edu",
														item.NamePulpit, true,
														false);

												if (!lret) {
													ret = lret;
												}
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

												var form = this.getView().byId(
														"formUserInfo");

												form.destroyLayout();

												form
														.setLayout(new sap.ui.layout.form.ResponsiveGridLayout(
																{
																	labelSpanXL : 4,
																	labelSpanL : 4,
																	labelSpanM : 4,
																	labelSpanS : 4,
																	adjustLabelSpan : false,
																	emptySpanXL : 0,
																	emptySpanL : 0,
																	emptySpanM : 0,
																	emptySpanS : 0,
																	columnsXL : 1,
																	columnsL : 1,
																	columnsM : 1,
																	singleContainerFullSize : false
																}));

												this.generToolBar();

												this.contentEducations();

												sap.ui
														.getCore()
														.setModel(
																this
																		.getView()
																		.getModel());

												var bReplace = true;
												this.getRouter().navTo("table",
														{
															objectId : ""
														}, bReplace);
											}
										},

										generToolBar : function() {
											var self = this

											var page = this.getView().byId(
													"MainPage");

											var editModel = this.getView()
													.getModel("editModel")
													.getData();

											var bundle = this.getView()
													.getModel("i18n")
													.getResourceBundle();

											page.destroyFooter();

											if (editModel.isEdit) {
												page
														.setFooter(new sap.m.Bar(
																{
																	contentRight : [
																			new sap.m.Button(
																					{
																						id : "rem_edu",
																						icon : "sap-icon://delete",
																						text : bundle
																								.getText("remove"),
																						type : sap.m.ButtonType.Emphasized,
																						press : function(
																								self) {
																							self
																									.onRemoveEdu(self);
																						}
																					}),
																			new sap.m.Button(
																					{
																						id : "add_edu",
																						icon : "sap-icon://create",
																						text : bundle
																								.getText("add"),
																						type : sap.m.ButtonType.Emphasized,
																						press : function(
																								self) {
																							self
																									.onAddEdu(self);
																						}
																					}),
																			new sap.m.ToolbarSpacer(
																					{}),
																			new sap.m.Button(
																					{
																						id : "save",
																						icon : "sap-icon://save",
																						text : bundle
																								.getText("save"),
																						type : sap.m.ButtonType.Accept,
																						press : function(
																								self) {
																							self
																									.onSave(self);
																						}
																					}) ]
																}));
											} else if (editModel.isDisplay) {
												page.setFooter(new sap.m.Bar({
													contentRight : []
												}));
											}
										},

										onChangeSurname : function(oEvent) {

											var self = this;

											var data = oEvent.getSource()
													.getValue();
											var id = oEvent.getParameter("id");

											var isChange = self.isCheckInput(
													id, "name", data, false,
													true);
											if (isChange) {
												this
														.getView()
														.getModel()
														.setProperty(
																"/UserInfo/Surname",
																data);
											}

										},

										onChangeName : function(oEvent) {

											var self = this;

											var data = oEvent.getSource()
													.getValue();
											var id = oEvent.getParameter("id");

											var isChange = self.isCheckInput(
													id, "name", data, false,
													true);
											if (isChange) {
												this
														.getView()
														.getModel()
														.setProperty(
																"/UserInfo/Name",
																data)
											}
											;
										},

										onChangePatronymic : function(oEvent) {

											var self = this;

											var data = oEvent.getSource()
													.getValue();
											var id = oEvent.getParameter("id");

											var isChange = self.isCheckInput(
													id, "name", data, false,
													true);
											if (isChange) {
												this
														.getView()
														.getModel()
														.setProperty(
																"/UserInfo/Patronymic",
																data);
											}
											;

										},

										onDateOfBirth : function(oEvent) {

											var self = this;

											var value = oEvent.getSource()
													.getValue();
											var id = oEvent.getParameter("id");

											var isChange = self.isCheckInput(
													id, "date", value, false,
													true);
											if (isChange) {
												var dateValue = oEvent
														.getSource()
														.getDateValue();

												var thisDate = new Date();

												var year = dateValue
														.getFullYear();
												var month = dateValue
														.getMonth();
												var day = dateValue.getDate();

												var thisYear = thisDate
														.getFullYear();
												var thisMonth = thisDate
														.getMonth();
												var thisDay = thisDate
														.getDate();

												var age = 0;

												if ((month === thisMonth && day <= thisDay)
														|| (month < thisMonth)) {
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
												this
														.getView()
														.getModel()
														.setProperty(
																"/UserInfo/Age",
																age);
											}
											;

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

											var self = this;

											var data = oEvent.getSource()
													.getValue();
											var id = oEvent.getParameter("id");

											var isChange = self.isCheckInput(
													id, "serial_pas", data,
													false, true);
											if (isChange) {
												this
														.getView()
														.getModel()
														.setProperty(
																"/UserInfo/SerialPas",
																data);
											}
											;

										},

										onChangeNumberPas : function(oEvent) {

											var self = this;

											var data = oEvent.getSource()
													.getValue();
											var id = oEvent.getParameter("id");

											var isChange = self.isCheckInput(
													id, "number_pas", data,
													false, true);
											if (isChange) {
												this
														.getView()
														.getModel()
														.setProperty(
																"/UserInfo/NumberPas",
																data);
											}
											;

										},

										onChangeIssuedByPas : function(oEvent) {

											var data = oEvent.getSource()
													.getValue();

											this
													.getView()
													.getModel()
													.setProperty(
															"/UserInfo/IssuedByPas",
															data);

										},

										onChangeDateOfIssuePas : function(
												oEvent) {

											var data = oEvent.getSource()
													.getValue();

											this
													.getView()
													.getModel()
													.setProperty(
															"/UserInfo/DateOfIssuePas",
															data);

										},

										onChangeUnitCodePas : function(oEvent) {

											var self = this;

											var data = oEvent.getSource()
													.getValue();
											var id = oEvent.getParameter("id");

											var isChange = self.isCheckInput(
													id, "unit_code_pas", data,
													false, true);
											if (isChange) {
												this
														.getView()
														.getModel()
														.setProperty(
																"/UserInfo/UnitCodePas",
																data);
											}
											;
										},

										onChangeSnilsNumberPas : function(
												oEvent) {

											var self = this;

											var data = oEvent.getSource()
													.getValue();
											var id = oEvent.getParameter("id");

											var isChange = self.isCheckInput(
													id, "snils_number_pas",
													data, false, true);
											if (isChange) {
												this
														.getView()
														.getModel()
														.setProperty(
																"/UserInfo/SnilsNumberPas",
																data);
											}
											;

										},

										onChangeYearStart : function(oEvent) {

											var self = this;

											var data = oEvent.getSource()
													.getValue();
											var idSt = oEvent
													.getParameter("id");

											var isChange = self.isCheckInput(
													idSt, "year", data, true,
													true);
											if (isChange) {
												var r = /\d+/;
												var id = Number(idSt.match(r));

												var educations = this.getView()
														.getModel()
														.getProperty(
																"/Educations");

												educations
														.forEach(function(item,
																i) {
															if (educations[i].Id == id) {
																educations[i].YearStart = data;
															}
														});

												var container = this
														.getView()
														.byId(
																"educationsContainer");

												container
														.getFormElements()
														.forEach(
																function(item,
																		i) {
																	item
																			.getFields()
																			.forEach(
																					function(
																							itemy,
																							iy) {
																						itemy
																								.getContent()
																								.forEach(
																										function(
																												itemz,
																												iz) {
																											var idz = itemz
																													.getId();
																											if (idz !== undefined
																													&& idz !== null
																													&& idz !== "") {
																												var ids = idz
																														.split("-");
																												if (ids[0] === "endDate"
																														&& Number(ids[1]) === id) {
																													itemz
																															.setMin(data);
																												}
																											}
																										});
																					});
																});

												this.getView().getModel()
														.setProperty(
																"/Educations",
																educations);
											}
											;

										},

										onChangeYearEnd : function(oEvent) {

											var self = this;

											var data = oEvent.getSource()
													.getValue();
											var idSt = oEvent
													.getParameter("id");

											var isChange = self.isCheckInput(
													idSt, "year", data, true,
													true);
											if (isChange) {
												var r = /\d+/;
												var id = Number(idSt.match(r));

												var educations = this.getView()
														.getModel()
														.getProperty(
																"/Educations");

												educations
														.forEach(function(item,
																i) {
															if (educations[i].Id == id) {
																educations[i].YearEnd = data;
															}
														});

												this.getView().getModel()
														.setProperty(
																"/Educations",
																educations);
											}
											;

										},

										onChangeNameInstitution : function(
												oEvent) {

											var self = this;

											var data = oEvent.getSource()
													.getValue();
											var idSt = oEvent
													.getParameter("id");

											var isChange = self.isCheckInput(
													idSt, "name_edu", data,
													true, true);
											if (isChange) {
												var r = /\d+/;
												var id = Number(idSt.match(r));

												var educations = this.getView()
														.getModel()
														.getProperty(
																"/Educations");

												educations
														.forEach(function(item,
																i) {
															if (educations[i].Id == id) {
																educations[i].NameInstitution = data;
															}
														});

												this.getView().getModel()
														.setProperty(
																"/Educations",
																educations);
											}
											;

										},

										onChangeNameFaculty : function(oEvent) {

											var self = this;

											var data = oEvent.getSource()
													.getValue();
											var idSt = oEvent
													.getParameter("id");

											var isChange = self.isCheckInput(
													idSt, "name_edu", data,
													true, true);
											if (isChange) {
												var r = /\d+/;
												var id = Number(idSt.match(r));

												var educations = this.getView()
														.getModel()
														.getProperty(
																"/Educations");

												educations
														.forEach(function(item,
																i) {
															if (educations[i].Id == id) {
																educations[i].NameFaculty = data;
															}
														});

												this.getView().getModel()
														.setProperty(
																"/Educations",
																educations);
											}
											;

										},

										onChangeNamePulpit : function(oEvent) {

											var self = this;

											var data = oEvent.getSource()
													.getValue();
											var idSt = oEvent
													.getParameter("id");

											var isChange = self.isCheckInput(
													idSt, "name_edu", data,
													true, true);
											if (isChange) {
												var r = /\d+/;
												var id = Number(idSt.match(r));

												var educations = this.getView()
														.getModel()
														.getProperty(
																"/Educations");

												educations
														.forEach(function(item,
																i) {
															if (educations[i].Id == id) {
																educations[i].NamePulpit = data;
															}
														});

												this.getView().getModel()
														.setProperty(
																"/Educations",
																educations);
											}
											;

										},

										onAddEdu : function(oEvent) {

											var educations = this.getView()
													.getModel().getProperty(
															"/Educations");

											if (educations.length !== 0
													&& educations !== undefined
													&& educations !== null) {
												var min = Number(educations[0].Id);
												var max = min;
												for (var i = 1; i < educations.length; ++i) {
													if (Number(educations[i].Id) > max)
														max = Number(educations[i].Id);
													if (Number(educations[i].Id) < min)
														min = Number(educations[i].Id);
												}
												;

												max = max + 1;
											} else {
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

											this.getView().getModel()
													.setProperty("/Educations",
															educations);

											this.contentEducations();
										},

										onRemoveEdu : function(oEvent) {

											var educations = this.getView()
													.getModel().getProperty(
															"/Educations");

											if (educations.length !== 0
													&& educations !== undefined
													&& educations !== null) {
												var remEdu = educations.pop();

												this.getView().getModel()
														.setProperty(
																"/Educations",
																educations);

												this.contentEducations();
											}
										}

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