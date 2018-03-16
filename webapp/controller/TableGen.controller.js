sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("com.naresh.Z_AUTOCODEGENERATOR.controller.TableGen", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf com.naresh.Z_AUTOCODEGENERATOR.view.TableGen
		 */
			onInit: function() {
				var jCommonTable = this.getOwnerComponent().getModel("jCommonTable");
				jCommonTable.setProperty("/PropertyDesc","");
				
			//	console.log(jSapUITable);
			},

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf com.naresh.Z_AUTOCODEGENERATOR.view.TableGen
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf com.naresh.Z_AUTOCODEGENERATOR.view.TableGen
		 */
			onAfterRendering: function() {
				var jSapUITable = this.getOwnerComponent().getModel("jSapUITable");
				jQuery.ajax("https://ui5.sap.com/test-resources/sap/ui/table/designtime/api.json", {
				dataType: "json",
				success: function (oData) {
					for(var i=0;i<oData.symbols.length ; i++){
						if(oData.symbols[i]["basename"] === "Table"){
							jSapUITable.setData(oData.symbols[i]["ui5-metadata"].properties);		
							break;
						}
					}
				
				},
				error: function () {
					jQuery.sap.log.error("failed to load json");
				}
			});
			
				var jSapUITableProperties = this.getOwnerComponent().getModel("jSelectedTableProperties");
				jSapUITableProperties.setData([]);
			},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf com.naresh.Z_AUTOCODEGENERATOR.view.TableGen
		 */
		//	onExit: function() {
		//
		//	}

			goToTableProperties:function(){
				console.log("test")	
			},
			
			fnHandleSelectionChange:function(oEvent){
				var sPath = oEvent.getSource().getSelectedItem().oBindingContexts.jSapUITable.sPath;
				var jSapUITable = this.getOwnerComponent().getModel("jSapUITable");
				var jCommonTable = this.getOwnerComponent().getModel("jCommonTable");
				
				var oValues = jSapUITable.getProperty(sPath);
				jCommonTable.setProperty("/PropertyDesc",oValues.description);
			},
			fnAddProperty:function(oEvent){
				var sTableId = this.getView().byId("tableProperties");
				var modelData = this.getOwnerComponent().getModel("jSelectedTableProperties").getData();
				var sSelectedProperty = this.getView().byId("propComboBox").getSelectedKey();
				var rowCount;
				/*if(modelData.results !== null || modelData.results!==undefined){
				 rowCount   = modelData.results.length;
				 rowCount = rowCount + 1;
				}
				else{
				 rowCount=1;
				}*/
				 if(sSelectedProperty){
				 	
				 }
    				 modelData.push({"propertyName" : "" , "propertyValue" : ""});  
    				 this.getOwnerComponent().getModel("jSelectedTableProperties").setData(modelData);
    				 this.getOwnerComponent().getModel("jSelectedTableProperties").updateBindings();
			}
			
	});

});