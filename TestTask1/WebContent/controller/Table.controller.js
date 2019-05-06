sap.ui
		.define(
				[ "sap/myApps/controller/BaseController", "sap/myApps/model/formatter",
						"sap/ui/model/resource/ResourceModel",
						"sap/ui/model/json/JSONModel",
						"sap/ui/core/routing/History"],
				function(BaseController, formatter, ResourceModel, JSONModel, History) {
					"use strict";
					return BaseController.extend("sap.myApps.controller.table",
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

											this.getRouter().getRoute("table").attachPatternMatched(this._onTableMatched, this);

											this.getOwnerComponent().getModel().metadataLoaded().then(this._onMetadataLoaded.bind(this));
											
											var oTableMobModel = new JSONModel({
												MainInfo : [ ],
												DocInfo : [ ],
												EduInfo : [ ]
											});
											
											this.getView().setModel(oTableMobModel, "TableMob");
											
											var i18nModel = new ResourceModel(
													{
														bundleName : "sap.myApps.i18n.i18n"
													});

											this.getView().setModel(i18nModel,
													"i18n");

											var bundle = this.getView()
													.getModel("i18n")
													.getResourceBundle();

											var oModel = sap.ui.getCore().getModel();
											var userModel = oModel.getData();


											var oMainInfo = [];
											var oDocInfo = [];
											var oEduInfo = [];

											if (userModel.UserInfo.Surname !== undefined
													&& userModel.UserInfo.Surname !== null
													&& userModel.UserInfo.Surname !== "") {
												var surname = {};
												surname.NamePar = bundle
														.getText("surname");
												surname.Value = userModel.UserInfo.Surname;

												oMainInfo
														.push(surname);
											}

											if (userModel.UserInfo.Name !== undefined
													&& userModel.UserInfo.Name !== null
													&& userModel.UserInfo.Name !== "") {
												var name = {};
												name.NamePar = bundle
														.getText("name");
												name.Value = userModel.UserInfo.Name;

												oMainInfo
														.push(name);
											}

											if (userModel.UserInfo.Patronymic !== undefined
													&& userModel.UserInfo.Patronymic !== null
													&& userModel.UserInfo.Patronymic !== "") {
												var patronymic = {};
												patronymic.NamePar = bundle
														.getText("patronymic");
												patronymic.Value = userModel.UserInfo.Patronymic;

												oMainInfo
														.push(patronymic);
											}

											if (userModel.UserInfo.DateOfBirth !== undefined
													&& userModel.UserInfo.DateOfBirth !== null
													&& userModel.UserInfo.DateOfBirth !== "") {
												var date_of_birth = {};
												date_of_birth.NamePar = bundle
														.getText("date_of_birth");
												date_of_birth.Value = userModel.UserInfo.DateOfBirth;

												oMainInfo
														.push(date_of_birth);
											}

											if (userModel.UserInfo.Age !== undefined
													&& userModel.UserInfo.Age !== null
													&& userModel.UserInfo.Age !== "") {
												var age = {};
												age.NamePar = bundle
														.getText("age");
												age.Value = userModel.UserInfo.Age;

												oMainInfo
														.push(age);
											}

											if (userModel.UserInfo.SelectDoc !== undefined
													&& userModel.UserInfo.SelectDoc !== null
													&& userModel.UserInfo.SelectDoc !== "") {
												var select_doc = {};
												select_doc.NamePar = bundle
														.getText("typeDoc");
												select_doc.Value = userModel.UserInfo.SelectDoc;

												oDocInfo
														.push(select_doc);
											}

											if (userModel.UserInfo.SelectDocKey == 1) {

												if ((userModel.UserInfo.SerialPas !== undefined
														&& userModel.UserInfo.SerialPas !== null && userModel.UserInfo.SerialPas !== "")
														&& (userModel.UserInfo.NumberPas !== undefined
																&& userModel.UserInfo.NumberPas !== null && userModel.UserInfo.NumberPas !== "")) {
													var serial_number_pas = {};
													serial_number_pas.NamePar = bundle
															.getText("serial_number_pasport");
													serial_number_pas.Value = userModel.UserInfo.SerialPas
															+ "/"
															+ userModel.UserInfo.NumberPas;

													oDocInfo
															.push(serial_number_pas);
												}

												if (userModel.UserInfo.IssuedByPas !== undefined
														&& userModel.UserInfo.IssuedByPas !== null
														&& userModel.UserInfo.IssuedByPas !== "") {
													var issued_by_pas = {};
													issued_by_pas.NamePar = bundle
															.getText("issued_by");
													issued_by_pas.Value = userModel.UserInfo.IssuedByPas;

													oDocInfo
															.push(issued_by_pas);
												}

												if (userModel.UserInfo.DateOfIssuePas !== undefined
														&& userModel.UserInfo.DateOfIssuePas !== null
														&& userModel.UserInfo.DateOfIssuePas !== "") {
													var date_of_issue_pas = {};
													date_of_issue_pas.NamePar = bundle
															.getText("date_of_issue");
													date_of_issue_pas.Value = userModel.UserInfo.DateOfIssuePas;

													oDocInfo
															.push(date_of_issue_pas);
												}

												if (userModel.UserInfo.UnitCodePas !== undefined
														&& userModel.UserInfo.UnitCodePas !== null
														&& userModel.UserInfo.UnitCodePas !== "") {
													var unit_code_pas = {};
													unit_code_pas.NamePar = bundle
															.getText("unit_code");
													unit_code_pas.Value = userModel.UserInfo.UnitCodePas;

													oDocInfo
															.push(unit_code_pas);
												}

											} else if (userModel.UserInfo.SelectDocKey == 2) {

												if (userModel.UserInfo.SnilsNumberPas !== undefined
														&& userModel.UserInfo.SnilsNumberPas !== null
														&& userModel.UserInfo.SnilsNumberPas !== "") {
													var snils_number_pas = {};
													snils_number_pas.NamePar = bundle
															.getText("snils_number");
													snils_number_pas.Value = userModel.UserInfo.SnilsNumberPas;

													oDocInfo
															.push(snils_number_pas);
												}

											}
											
											userModel.Educations.forEach(function(item, i) {
												if (item.YearStart !== undefined && item.YearStart !== null	&& item.YearStart !== "") {
													var year_start = {};
													year_start.NamePar = bundle.getText("year_start");
													year_start.Value = item.YearStart + "г.";
													

													oEduInfo.push(year_start);
												}
												
												if (item.YearEnd !== undefined && item.YearEnd !== null	&& item.YearEnd !== "") {
													var year_end = {};
													year_end.NamePar = bundle.getText("year_end");
													year_end.Value = item.YearEnd + "г.";
													

													oEduInfo.push(year_end);
												}
												
												if (item.NameInstitution !== undefined && item.NameInstitution !== null	&& item.NameInstitution !== "") {
													var name_institution = {};
													name_institution.NamePar = bundle.getText("name_institution");
													name_institution.Value = item.NameInstitution;
													

													oEduInfo.push(name_institution);
												}

												if (item.NameFaculty !== undefined && item.NameFaculty !== null	&& item.NameFaculty !== "") {
													var name_faculty = {};
													name_faculty.NamePar = bundle.getText("name_faculty");
													name_faculty.Value = item.NameFaculty;
													

													oEduInfo.push(name_faculty);
												}
												
												if (item.NamePulpit !== undefined && item.NamePulpit !== null	&& item.NamePulpit !== "") {
													var name_pulpit = {};
													name_pulpit.NamePar = bundle.getText("name_pulpit");
													name_pulpit.Value = item.NamePulpit;
													

													oEduInfo.push(name_pulpit);
												}
											});
											
											var oTableMain = this.getView().byId("main_table_mob");
											var oTableDoc = this.getView().byId("doc_table_mob");
											var oTableEdu = this.getView().byId("edu_table_mob");
											
											oMainInfo.forEach(function(item, i) {
												var oTableMainLis = new sap.m.ColumnListItem({
												});
												
												oTableMainLis.addCell(new sap.m.Text({ text: item.NamePar }));
												oTableMainLis.addCell(new sap.m.Text({ text: item.Value }));
												
												oTableMain.addItem(oTableMainLis);
											});
											
											oDocInfo.forEach(function(item, i) {
												var oTableMainLis = new sap.m.ColumnListItem({
												});
												
												oTableMainLis.addCell(new sap.m.Text({ text: item.NamePar }));
												oTableMainLis.addCell(new sap.m.Text({ text: item.Value }));
												
												oTableDoc.addItem(oTableMainLis);
											});
											
											oEduInfo.forEach(function(item, i) {
												var oTableMainLis = new sap.m.ColumnListItem({
												});
												
												oTableMainLis.addCell(new sap.m.Text({ text: item.NamePar }));
												oTableMainLis.addCell(new sap.m.Text({ text: item.Value }));
												
												oTableEdu.addItem(oTableMainLis);
											});
										},
										
										_onMetadataLoaded: function() {
											// Store original busy indicator delay for the detail view
										},
										
										_onTableMatched: function(oEvent) {


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