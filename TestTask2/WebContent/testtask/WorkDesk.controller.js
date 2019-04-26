sap.ui
		.define(
				[ "sap/ui/core/mvc/Controller", "sap/myApps/model/formatter",
					   "sap/ui/model/resource/ResourceModel" ],
				function(Controller, formatter, ResourceModel) {
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
											 var i18nModel = new ResourceModel({
										            bundleName: "sap.myApps.i18n.i18n"
										         });
										         this.getView().setModel(i18nModel, "i18n");
										},

										onCreateAppeal : function() {
											var oBundle = this.getView().getModel("i18n").getResourceBundle();
									        var sNewAppeal = oBundle.getText("newappeal");
											
											var page = sap.ui.getCore().byId(
													"idAnalitic1").byId(
													'MainNavCont');

											var pageAdd = sap.ui.getCore()
													.byId("idAnalitic1").byId(
															'Workspace');

											var temesUI = sap.ui.getCore()
													.byId("idAnalitic1").byId(
															"temesUI");
											var textUI = sap.ui.getCore().byId(
													"idAnalitic1").byId(
													"textUI");
											var numberUI = sap.ui.getCore()
													.byId("idAnalitic1").byId(
															"objTitle");
											var headTextUI = sap.ui.getCore()
													.byId("idAnalitic1").byId(
															"headText");
											var headDateUI = sap.ui.getCore()
													.byId("idAnalitic1").byId(
															"headDate");

											temesUI.setEnabled(true);
											textUI.setEnabled(true);

											temesUI.setValue("");
											textUI.setValue("");
											numberUI
													.setObjectTitle(sNewAppeal);
											headTextUI.setText(sUser);
											headDateUI.setVisible(false);

											thisAppeal = null;
											this.onUploadComplete();

											// page.addPage(pageAdd);
											page.to(pageAdd);
											this.onFooterButton("create");
										},

										onViewAppeal : function(oEvent) {
											var oBundle = this.getView().getModel("i18n").getResourceBundle();
									        var sAppeal = oBundle.getText("appeal");
											
											var oModel = sap.ui.getCore()
													.getModel();
											var page = sap.ui.getCore().byId(
													"idAnalitic1").byId(
													'MainNavCont');
											var pageAdd = sap.ui.getCore()
													.byId("idAnalitic1").byId(
															'Workspace');

											var temesUI = sap.ui.getCore()
													.byId("idAnalitic1").byId(
															"temesUI");
											var textUI = sap.ui.getCore().byId(
													"idAnalitic1").byId(
													"textUI");
											var numberUI = sap.ui.getCore()
													.byId("idAnalitic1").byId(
															"objTitle");
											var headTextUI = sap.ui.getCore()
													.byId("idAnalitic1").byId(
															"headText");
											var headDateUI = sap.ui.getCore()
													.byId("idAnalitic1").byId(
															"headDate");

											temesUI.setEnabled(false);
											textUI.setEnabled(false);
											headDateUI.setVisible(true);

											var oTable = sap.ui.getCore().byId(
													"idAnalitic1").byId(
													'tableAppeal');

											// var lIndex =
											// oEvent.getSource().oParent.sId.slice(-1);
											// oSource.oParent.mAggregations.cells[""0""].mProperties.text
											// var test =
											// oTable.getCustomData();
											// var r = /\d+/;
											var s = oEvent.getSource()
													.getParent().getCells()[0]
													.getText();// .slice(-8);
											// var lIndex = (s.match(r));
											// var stringUnfo =
											// oTable.getContextByIndex(Number(lIndex)).getObject();

											temesUI.setValue(oEvent.getSource()
													.getParent().getCells()[1]
													.getText());
											textUI.setValue(oEvent.getSource()
													.getParent().getCells()[2]
													.getText());
											numberUI
													.setObjectTitle(sAppeal + " "
															+ s);
											headTextUI.setText(oEvent
													.getSource().getParent()
													.getCells()[3].getText());
											headDateUI.setText(oEvent
													.getSource().getParent()
													.getCells()[4].getText());

											thisAppeal = s;

											this.onUploadComplete();

											page.to(pageAdd);
											this.onFooterButton("view");
										},

										onSaveAppeal : function() {
											var oBundle = this.getView().getModel("i18n").getResourceBundle();
									        var sMsgAc = oBundle.getText("msgac");
									        var sMsgEr = oBundle.getText("msger");
									        var sError = oBundle.getText("error");
									        
											var appeal = {};

											var temesUI = sap.ui.getCore()
													.byId("idAnalitic1").byId(
															"temesUI");
											var textUI = sap.ui.getCore().byId(
													"idAnalitic1").byId(
													"textUI");
											var s = sap.ui.getCore().byId(
													"idAnalitic1").byId(
													"objTitle")
													.getObjectTitle();

											var r = /\d+/;
											var num = (s.match(r)) == null ? ""
												    : (s.match(r));
											appeal.NumberAppeal = num;
											appeal.Temes = temesUI.getValue();
											appeal.Text = textUI.getValue();
											var UploadCollection = sap.ui
													.getCore().byId(
															"idAnalitic1")
													.byId("UploadCollection");

											switch (this.isCheckData(appeal)) {

											case 1:
												temesUI
														.setValueState(sap.ui.core.ValueState.Accept);
												textUI
														.setValueState(sap.ui.core.ValueState.Accept);
												sap.ui
														.getCore()
														.getModel()
														.create(
																'/AppealsSet',
																appeal,
																{

																	success : function(
																			oData,
																			oResponse) {
																		thisAppeal = oData.NumberAppeal;
																		UploadCollection
																				.upload();
																		sap.m.MessageToast
																				.show(sMsgAc);
																	},
																	error : function() {
																		jQuery.sap
																				.require("sap.m.MessageBox");
																		sap.m.MessageBox
																				.error(MsgEr,
																						{

																							title : sError
																						});
																	}
																});

												this.onCancelAppeal();
												break;
											case 2:
												temesUI
														.setValueState(sap.ui.core.ValueState.Error);
												break;
											case 3:
												textUI
														.setValueState(sap.ui.core.ValueState.Error);
												break;
											case 4:
												temesUI
														.setValueState(sap.ui.core.ValueState.Error);
												textUI
														.setValueState(sap.ui.core.ValueState.Error);
												break;

											}
										},

										onCancelAppeal : function() {
											var page = sap.ui.getCore().byId(
													"idAnalitic1").byId(
													'MainNavCont');
											var pageGrid = sap.ui.getCore()
													.byId("idAnalitic1").byId(
															'WorkDesk');

											var objectPageLayout = sap.ui
													.getCore().byId(
															"idAnalitic1")
													.byId("ObjectPageLayout");

											var temesUI = sap.ui.getCore()
													.byId("idAnalitic1").byId(
															"temesUI");
											var textUI = sap.ui.getCore().byId(
													"idAnalitic1").byId(
													"textUI");

											temesUI
													.setValueState(sap.ui.core.ValueState.None);
											textUI
													.setValueState(sap.ui.core.ValueState.None);

											objectPageLayout
													.setSelectedSection('desc');

											page.to(pageGrid);
											this.onFooterButton("grid");
										},

										onFooterButton : function(state) {
											var oBundle = this.getView().getModel("i18n").getResourceBundle();
									        var sCancel = oBundle.getText("cancel");
									        var sSave = oBundle.getText("save");
									        var sCreat = oBundle.getText("creat");
											
											var page = sap.ui.getCore().byId(
													"idAnalitic1").byId(
													"MainPage");
											var workDesk = this;
											if (state === "create") {
												page
														.setFooter(new sap.m.Bar(
																{
																	contentRight : [
																			new sap.m.Button(
																					{
																						// icon
																						// :
																						// "sap-icon://create-form",
																						text : sCancel,
																						type : sap.m.ButtonType.Back,
																						press : function() {
																							workDesk
																									.onCancelAppeal()
																						}
																					}),
																			new sap.m.Button(
																					{
																						icon : "sap-icon://save",
																						text : sSave,
																						type : sap.m.ButtonType.Accept,
																						press : function() {
																							workDesk
																									.onSaveAppeal()
																						}
																					}) ]
																}));
											} else if (state === "grid") {
												page
														.setFooter(new sap.m.Bar(
																{
																	contentRight : [ new sap.m.Button(
																			{
																				icon : "sap-icon://create-form",
																				text : sCreat,
																				type : sap.m.ButtonType.Accept,
																				press : function() {
																					workDesk
																							.onCreateAppeal()
																				}
																			}) ]
																}));
											} else if (state === "view") {
												page
														.setFooter(new sap.m.Bar(
																{
																	contentRight : [ new sap.m.Button(
																			{
																				// icon
																				// :
																				// "sap-icon://create-form",
																				text : sCancel,
																				type : sap.m.ButtonType.Back,
																				press : function() {
																					workDesk
																							.onCancelAppeal()
																				}
																			}) ]
																}));
											}
										},

										onBeforeUploadStarts : function(oEvent) {
											var oCustomerHeaderSlug = new sap.m.UploadCollectionParameter(
													{

														name : "slug",
														value : encodeURIComponent(oEvent
																.getParameter("fileName"))

													});
											oEvent
													.getParameters()
													.addHeaderParameter(
															oCustomerHeaderSlug)

											var oCustomerHeaderVersionResume = new sap.m.UploadCollectionParameter(
													{

														name : "number",
														value : thisAppeal

													});
											oEvent
													.getParameters()
													.addHeaderParameter(
															oCustomerHeaderVersionResume);
										},

										onFileDeleted : function() {

										},

										onChange : function(oEvent) {

											var oUploadCollection = oEvent
													.getSource();
											var SecurityToken = loModel
													.getSecurityToken();
											var oCustomerHeaderToken = new sap.m.UploadCollectionParameter(
													{

														name : "x-csrf-token",
														value : SecurityToken

													});
											oUploadCollection
													.addHeaderParameter(oCustomerHeaderToken);
										},

										onUploadComplete : function() {
											var oBundle = this.getView().getModel("i18n").getResourceBundle();
									        var sDate_cr = oBundle.getText("date_cr");
											
											var workDesk = this;
											var UploadCollection = sap.ui
													.getCore().byId(
															"idAnalitic1")
													.byId("UploadCollection");
											UploadCollection
													.bindAggregation(
															"items",
															{

																path : "/FilesSet",
																filters : new sap.ui.model.Filter(
																		"Name",
																		sap.ui.model.FilterOperator.EQ,
																		thisAppeal),
																template : new sap.m.UploadCollectionItem(
																		{
																			visibleDelete : false,
																			fileName : "{Name}",
																			mimeType : "{MimeType}",
																			documentId : "{NumberFile}",
																			visibleEdit : false,
																			// visibleDelete
																			// :
																			// true,
																			url : {
																				path : "NumberFile",
																				formatter : function(
																						oEvent) {
																					return workDesk
																							.formatURL(oEvent);
																				}
																			},

																		}),
															});
										},

										formatURL : function(oEvent) {
											return "http://217.74.37.187:8000/sap/opu/odata/sap/ztesttask_srv/FilesSet(NumberFile='"
													+ oEvent + "')/$value";
										},

										isCheckData : function(appeal) {
											var status = 1;
											if (appeal.Temes === '')
												status = 2;

											if (appeal.Text === '')
												status = 3;

											if (appeal.Temes === ''
													&& appeal.Text === '')
												status = 4;

											return status;
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