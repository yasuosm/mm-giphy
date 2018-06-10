import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  HOME_FETCH_IMAGE_LIST_BEGIN,
  HOME_FETCH_IMAGE_LIST_SUCCESS,
  HOME_FETCH_IMAGE_LIST_FAILURE,
  HOME_FETCH_IMAGE_LIST_DISMISS_ERROR,
} from '../../../../src/features/home/redux/constants';

import {
  fetchImageList,
  dismissFetchImageListError,
  reducer,
} from '../../../../src/features/home/redux/fetchImageList';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/fetchImageList', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when fetchImageList succeeds', () => {
    const store = mockStore({});

    return store.dispatch(fetchImageList())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_FETCH_IMAGE_LIST_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_FETCH_IMAGE_LIST_SUCCESS);
      });
  });

  it('dispatches failure action when fetchImageList fails', () => {
    const store = mockStore({});

    return store.dispatch(fetchImageList({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_FETCH_IMAGE_LIST_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_FETCH_IMAGE_LIST_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissFetchImageListError', () => {
    const expectedAction = {
      type: HOME_FETCH_IMAGE_LIST_DISMISS_ERROR,
    };
    expect(dismissFetchImageListError()).toEqual(expectedAction);
  });

  it('handles action type HOME_FETCH_IMAGE_LIST_BEGIN correctly', () => {
    const prevState = { fetchImageListPending: false };
    const state = reducer(
      prevState,
      { type: HOME_FETCH_IMAGE_LIST_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchImageListPending).toBe(true);
  });

  it('handles action type HOME_FETCH_IMAGE_LIST_SUCCESS correctly', () => {
    const prevState = { fetchImageListPending: true, imageList: [] };
    const state = reducer(
      prevState,
      { type: HOME_FETCH_IMAGE_LIST_SUCCESS, data: { data: [], pagination: {} } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchImageListPending).toBe(false);
  });

  it('handles action type HOME_FETCH_IMAGE_LIST_FAILURE correctly', () => {
    const prevState = { fetchImageListPending: true };
    const state = reducer(
      prevState,
      { type: HOME_FETCH_IMAGE_LIST_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchImageListPending).toBe(false);
    expect(state.fetchImageListError).toEqual(expect.anything());
  });

  it('handles action type HOME_FETCH_IMAGE_LIST_DISMISS_ERROR correctly', () => {
    const prevState = { fetchImageListError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_FETCH_IMAGE_LIST_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchImageListError).toBe(null);
  });
});

