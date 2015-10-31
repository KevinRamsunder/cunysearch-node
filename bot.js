var request = require('request');
var cheerio = require('cheerio');
var FormData = require('form-data');
var formTemplate = require('./form');


formData = formTemplate.getForm();

// customize form data
formData['ICAction'] = 'CLASS_SRCH_WRK2_SSR_PB_CLASS_SRCH';
formData['CLASS_SRCH_WRK2_INSTITUTION$42$'] = 'QNS01';
formData['CLASS_SRCH_WRK2_STRM$45$'] = '1162';
formData['SSR_CLSRCH_WRK_SUBJECT_SRCH$0'] = 'CSCI';


var options = {
    url: 'https://hrsa.cunyfirst.cuny.edu/psc/cnyhcprd/GUEST/HRMS/c/COMMUNITY_ACCESS.CLASS_SEARCH.GBL?PortalActualURL=https%3a%2f%2fhrsa.cunyfirst.cuny.edu%2fpsc%2fcnyhcprd%2fGUEST%2fHRMS%2fc%2fCOMMUNITY_ACCESS.CLASS_SEARCH.GBL&amp;PortalContentURL=https%3a%2f%2fhrsa.cunyfirst.cuny.edu%2fpsc%2fcnyhcprd%2fGUEST%2fHRMS%2fc%2fCOMMUNITY_ACCESS.CLASS_SEARCH.GBL&amp;PortalContentProvider=HRMS&amp;PortalCRefLabel=Class%20Search&amp;PortalRegistryName=GUEST&amp;PortalServletURI=https%3a%2f%2fhome.cunyfirst.cuny.edu%2fpsp%2fcnyepprd%2f&amp;PortalURI=https%3a%2f%2fhome.cunyfirst.cuny.edu%2fpsc%2fcnyepprd%2f&amp;PortalHostNode=ENTP&amp;NoCrumbs=yes',
   
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.80 Safari/537.36'
    },

    formData : formData, 

    jar: request.jar()
};

request.post(options, function(err, res, body) {
    /*if(err) {
        console.error(err);
        return;
    } else {
        console.log(res);
    }*/
    console.log(res.headers);
});