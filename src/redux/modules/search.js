const LOAD = 'redux-example/LOAD';
const LOAD_SUCCESS = 'redux-example/LOAD_SUCCESS';
const LOAD_FAIL = 'redux-example/LOAD_FAIL';

const initialState = {
  loaded: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        searchResult: action.result
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    case 'INST':
      return {
        ...state
      };
    case 'INST_SUCCESS':
      return {
        ...state,
        instNamedResult: action.result[0],
        instDataResult: action.result[1]
      };
    case 'INST_FAIL':
      return {
        ...state,
        error: action.error
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.search && globalState.search.loaded;
}

export function getInsts() {
  return {
    types: ['INST', 'INST_SUCCESS', 'INST_FAIL'],
    promise: (client) => client.get('/inst')
  };
}

export function query(inst, term, dept) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.post('/searchRequest', {
      data: {
        'inst': inst,
        'term': {name: term.Name, htmlKey: term.HtmlKey},
        'dept': {name: dept.Name, htmlKey: dept.HtmlKey}
      }
    })
  };
}
