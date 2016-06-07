import React from 'react';
import {IndexRoute, Route} from 'react-router';
import {
    App,
    NotFound,
    SubmitSearchButton,
    Table
  } from 'containers';

export default (store) => {
  const requireTableResult = (nextState, replace, cb) => {
    const { search: { searchResult }} = store.getState();

    // if no search results present, go back to search page
    if (!searchResult) {
      replace('/');
    }

    cb();
  };

  /**
   * Please keep routes in alphabetical order
   */
  return (
    <Route path="/" component={App}>
      { /* Home (main) route */ }
      <IndexRoute component={SubmitSearchButton}/>

      <Route onEnter={requireTableResult}>
        <Route path="table" component={Table}/>
      </Route>

      { /* Catch all route */ }
      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};
