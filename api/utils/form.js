import FormData from 'form-data';

function getTemplate(key, inst, term, dept) {
    const fields = {
        ICType : 'Panel',
        ICElementNum : '0',
        ICStateNum : '2',
        ICAction : 'CLASS_SRCH_WRK2_SSR_PB_CLASS_SRCH',
        ICXPos : '0',
        ICYPos : '0',
        ICFocus : '',
        ICSaveWarningFilter : '0',
        ICChanged : '-1',
        ICResubmit : '0',
        ICSID : key,
        ICModalWidget : '0',
        ICZoomGrid : '0',
        ICZoomGridRt : '0',
        ICModalLongClosed : '',
        ICActionPrompt : 'false',
        ICFind : '',
        ICAddCount : '',
        CLASS_SRCH_WRK2_INSTITUTION$31$ : inst,
        CLASS_SRCH_WRK2_STRM$35$ : term,
        SSR_CLSRCH_WRK_SUBJECT_SRCH$0 : dept,
        SSR_CLSRCH_WRK_SSR_EXACT_MATCH1$1 : 'G',
        SSR_CLSRCH_WRK_CATALOG_NBR$1 : '0',
        SSR_CLSRCH_WRK_ACAD_CAREER$2 : '',
        SSR_CLSRCH_WRK_CRSE_ATTR$3 : '',
        SSR_CLSRCH_WRK_CRSE_ATTR_VALUE$3 : '',
        SSR_CLSRCH_WRK_CU_RQMNT_DESIGNTN$4 : '',
        SSR_CLSRCH_WRK_SSR_OPEN_ONLY$chk$5 : 'Y',
        SSR_CLSRCH_WRK_SSR_OPEN_ONLY$5 : 'Y',
        SSR_CLSRCH_WRK_SESSION_CODE$6 : '',
        SSR_CLSRCH_WRK_INSTRUCTION_MODE$7 : '',
        SSR_CLSRCH_WRK_SSR_START_TIME_OPR$8 : 'GE',
        SSR_CLSRCH_WRK_MEETING_TIME_START$8 : '',
        SSR_CLSRCH_WRK_SSR_END_TIME_OPR$8 : 'LE',
        SSR_CLSRCH_WRK_MEETING_TIME_END$8 : '',
        SSR_CLSRCH_WRK_INCLUDE_CLASS_DAYS$9 : 'I',
        SSR_CLSRCH_WRK_MON$chk$9 : '',
        SSR_CLSRCH_WRK_TUES$chk$9 : '',
        SSR_CLSRCH_WRK_WED$chk$9 : '',
        SSR_CLSRCH_WRK_THURS$chk$9 : '',
        SSR_CLSRCH_WRK_FRI$chk$9 : '',
        SSR_CLSRCH_WRK_SAT$chk$9 : '',
        SSR_CLSRCH_WRK_SUN$chk$9 : '',
        SSR_CLSRCH_WRK_CLASS_NBR$10 : '',
        SSR_CLSRCH_WRK_DESCR$11 : '',
        SSR_CLSRCH_WRK_SSR_UNITS_MIN_OPR$12 : 'GE',
        SSR_CLSRCH_WRK_UNITS_MINIMUM$12 : '',
        SSR_CLSRCH_WRK_SSR_UNITS_MAX_OPR$12 : 'LE',
        SSR_CLSRCH_WRK_UNITS_MAXIMUM$12 : '',
        SSR_CLSRCH_WRK_SSR_COMPONENT$13 : '',
        SSR_CLSRCH_WRK_CAMPUS$14 : '',
        SSR_CLSRCH_WRK_LOCATION$15 : '',
        SSR_CLSRCH_WRK_SSR_EXACT_MATCH2$16 : 'B',
        SSR_CLSRCH_WRK_LAST_NAME$16 : ''
    };

    return fields;
}

function fullSeatTemplate(key, inst, term, dept, nbr) {
    const fields = {
        ICType : 'Panel',
        ICElementNum : '0',
        ICStateNum : '2',
        ICAction : 'CLASS_SRCH_WRK2_SSR_PB_CLASS_SRCH',
        ICXPos : '0',
        ICYPos : '0',
        ICFocus : '',
        ICSaveWarningFilter : '0',
        ICChanged : '-1',
        ICResubmit : '0',
        ICSID : key,
        ICModalWidget : '0',
        ICZoomGrid : '0',
        ICZoomGridRt : '0',
        ICModalLongClosed : '',
        ICActionPrompt : 'false',
        ICFind : '',
        ICAddCount : '',
        CLASS_SRCH_WRK2_INSTITUTION$31$ : inst,
        CLASS_SRCH_WRK2_STRM$35$ : term,
        SSR_CLSRCH_WRK_SUBJECT_SRCH$0 : dept,
        SSR_CLSRCH_WRK_SSR_EXACT_MATCH1$1 : 'G',
        SSR_CLSRCH_WRK_CATALOG_NBR$1 : '0',
        SSR_CLSRCH_WRK_ACAD_CAREER$2 : '',
        SSR_CLSRCH_WRK_CRSE_ATTR$3 : '',
        SSR_CLSRCH_WRK_CRSE_ATTR_VALUE$3 : '',
        SSR_CLSRCH_WRK_CU_RQMNT_DESIGNTN$4 : '',
        SSR_CLSRCH_WRK_SSR_OPEN_ONLY$chk$5 : 'Y',
        SSR_CLSRCH_WRK_SSR_OPEN_ONLY$5 : 'N',
        SSR_CLSRCH_WRK_SESSION_CODE$6 : '',
        SSR_CLSRCH_WRK_INSTRUCTION_MODE$7 : '',
        SSR_CLSRCH_WRK_SSR_START_TIME_OPR$8 : 'GE',
        SSR_CLSRCH_WRK_MEETING_TIME_START$8 : '',
        SSR_CLSRCH_WRK_SSR_END_TIME_OPR$8 : 'LE',
        SSR_CLSRCH_WRK_MEETING_TIME_END$8 : '',
        SSR_CLSRCH_WRK_INCLUDE_CLASS_DAYS$9 : 'I',
        SSR_CLSRCH_WRK_MON$chk$9 : '',
        SSR_CLSRCH_WRK_TUES$chk$9 : '',
        SSR_CLSRCH_WRK_WED$chk$9 : '',
        SSR_CLSRCH_WRK_THURS$chk$9 : '',
        SSR_CLSRCH_WRK_FRI$chk$9 : '',
        SSR_CLSRCH_WRK_SAT$chk$9 : '',
        SSR_CLSRCH_WRK_SUN$chk$9 : '',
        SSR_CLSRCH_WRK_CLASS_NBR$10 : nbr,
        SSR_CLSRCH_WRK_DESCR$11 : '',
        SSR_CLSRCH_WRK_SSR_UNITS_MIN_OPR$12 : 'GE',
        SSR_CLSRCH_WRK_UNITS_MINIMUM$12 : '',
        SSR_CLSRCH_WRK_SSR_UNITS_MAX_OPR$12 : 'LE',
        SSR_CLSRCH_WRK_UNITS_MAXIMUM$12 : '',
        SSR_CLSRCH_WRK_SSR_COMPONENT$13 : '',
        SSR_CLSRCH_WRK_CAMPUS$14 : '',
        SSR_CLSRCH_WRK_LOCATION$15 : '',
        SSR_CLSRCH_WRK_SSR_EXACT_MATCH2$16 : 'B',
        SSR_CLSRCH_WRK_LAST_NAME$16 : ''
    };

    return fields;
}

function termTemplate(key, htmlKey) {
    const fields = {
        ICAJAX: '1',
        ICNAVTYPEDROPDOWN: '0',
        ICType: 'Panel',
        ICElementNum: '0',
        ICStateNum: '1',
        ICAction: 'CLASS_SRCH_WRK2_INSTITUTION',
        ICXPos: '0',
        ICYPos: '0',
        ResponsetoDiffFrame: '-1',
        TargetFrameName: 'None',
        FacetPath: 'None',
        ICFocus: '',
        ICSaveWarningFilter: '0',
        ICChanged: '-1',
        ICAutoSave: '0',
        ICResubmit: '0',
        ICSID: key,
        ICActionPrompt: 'false',
        ICBcDomData: 'undefined',
        ICFind: '',
        ICAddCount: '',
        ICAPPCLSDATA: '',
        CLASS_SRCH_WRK2_INSTITUTION$31$: htmlKey
    };

    return fields;
}

function enrollmentTemplate(key, htmlKey) {
    const fields = {
        ICType: 'Panel',
        ICElementNum: '0',
        ICStateNum: '3',
        ICAction: htmlKey,
        ICXPos: '0',
        ICYPos: '0',
        ICFocus: '',
        ICSaveWarningFilter: '0',
        ICChanged: '-1',
        ICResubmit: '0',
        ICSID: key,
        ICModalWidget: '0',
        ICZoomGrid: '0',
        ICZoomGridRt: '0',
        ICModalLongClosed: '',
        ICActionPrompt: 'false',
        ICFind: '',
        ICAddCount: ''
    };

    return fields;
}

export default {
    getTemplate,
    fullSeatTemplate,
    termTemplate,
    enrollmentTemplate
};