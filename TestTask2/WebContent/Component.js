sap.ui.define([ 'jquery.sap.global', 'sap/ui/core/UIComponent' ], function(
		jQuery, UIComponent) {
	"use strict";

	var Component = UIComponent.extend("sap.myApps.Component", {
		metadata : {
			manifest : "json",
			config : {
				"titleResource" : "partner",
				"resourceBundle" : "i18n/i18n.properties",
				"favIcon" : ".Icon/favicon.ico",
			},
		},
		init : function() {
			UIComponent.prototype.init.apply(this, arguments);
			var sLink = "/sap/opu/odata/sap/ZTESTTASK_SRV/";
			var loModel = new sap.ui.model.odata.v2.ODataModel(sLink, {

				useBatch: false,
				defaultUpdateMethod: "Put",

			});
			loModel.setSizeLimit(500);
			loModel.setDefaultBindingMode(sap.ui.model.BindingMode.OneWay);
			sap.ui.getCore().setModel(loModel);
		},

	});
	return Component;
});
