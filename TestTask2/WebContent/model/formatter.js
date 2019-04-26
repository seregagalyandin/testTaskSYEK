sap.ui.define([], function () {
	"use strict";
	return {
    	myDate: function(mDate, Timecr) {
    		if(mDate !== null && mDate !== undefined)
    			{
    			var myDate = new Date(mDate);
    			}
    		else
    			{
    			return '';
    			}
    		var day = myDate.getDate().toString();
    		var month = myDate.getMonth() + 1;
    		var year = myDate.getFullYear().toString();
    		
    		if(day < 10)
    		{
    			day = '0' + day;
    		}
    		
    		if(month < 10)
    		{
    			month = '0' + month.toString();
    		}
    		
    		return day + '.' + month + '.' + year;
    	},
    };
});