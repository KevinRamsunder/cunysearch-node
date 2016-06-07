const config = {};

config.cuny = {};
config.cuny.longUrl = 'https://hrsa.cunyfirst.cuny.edu/psc/cnyhcprd/GUEST/HRMS/c/COMMUNITY_ACCESS.CLASS_SEARCH.GBL?PortalActualURL=https%3a%2f%2fhrsa.cunyfirst.cuny.edu%2fpsc%2fcnyhcprd%2fGUEST%2fHRMS%2fc%2fCOMMUNITY_ACCESS.CLASS_SEARCH.GBL&amp;PortalContentURL=https%3a%2f%2fhrsa.cunyfirst.cuny.edu%2fpsc%2fcnyhcprd%2fGUEST%2fHRMS%2fc%2fCOMMUNITY_ACCESS.CLASS_SEARCH.GBL&amp;PortalContentProvider=HRMS&amp;PortalCRefLabel=Class%20Search&amp;PortalRegistryName=GUEST&amp;PortalServletURI=https%3a%2f%2fhome.cunyfirst.cuny.edu%2fpsp%2fcnyepprd%2f&amp;PortalURI=https%3a%2f%2fhome.cunyfirst.cuny.edu%2fpsc%2fcnyepprd%2f&amp;PortalHostNode=ENTP&amp;NoCrumbs=yes';
config.cuny.shortUrl = 'https://hrsa.cunyfirst.cuny.edu/psc/cnyhcprd/GUEST/HRMS/c/COMMUNITY_ACCESS.CLASS_SEARCH.GBL';
config.cuny.headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.80 Safari/537.36'};

config.html = {};
config.html.key = 'input[id=\'ICSID\']';
config.html.inst = 'select[id=\'CLASS_SRCH_WRK2_INSTITUTION$31$\']';
config.html.term = 'select[id=\'CLASS_SRCH_WRK2_STRM$35$\']';
config.html.depts = 'select[id=\'SSR_CLSRCH_WRK_SUBJECT_SRCH$0\']';

config.server = {};
config.server.session_secret = 'Y2xic2FoeGJsanhzYmFzbGp4Ymhhc2xq';

config.mongo = {};
config.mongo.port = 27017;
config.mongo.db = 'cunyfirst';

export default config;