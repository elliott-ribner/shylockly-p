import { setAuthTokens, clearAuthTokens } from 'axios-jwt'
import { toaster } from 'evergreen-ui'
import { call, put, takeLatest, select } from 'redux-saga/effects'
import * as API from 'api'
import { IAction } from 'store/actions'
import { getCurrentEvent, getEvents } from 'store/selectors'
import { IEvent } from 'types'

function* login(action: IAction) {
  try {
    const res = yield call(API.login, action.payload.email, action.payload.password)
    setAuthTokens({ accessToken: res.data.access_token, refreshToken: res.data.refresh_token })
    yield put({ type: 'LOGIN_SUCCESS', payload: res.data })
    toaster.success('Logged in')
  } catch (e) {
    yield put({ type: 'LOGIN_FAILURE', payload: { message: e.message } })
  }
}

function* logout() {
  // TODO logout on server
  try {
    clearAuthTokens()
    yield call(API.logout)
    yield put({ type: 'LOGOUT_SUCCESS' })
    toaster.success('Logged out')
  } catch (e) {
    yield put({ type: 'LOGOUT_FAILURE', payload: { message: e.message } })
  }
}

function* fetchRule() {
  try {
    const res = yield call(API.fetchRule)
    yield put({ type: 'FETCH_RULE_SUCCESS', payload: res.data.length ? res.data[0] : undefined })
  } catch (e) {
    yield put({ type: 'FETCH_RULE_FAILURE', payload: e.message })
  }
}

function* updateRule(action: IAction) {
  try {
    const rule = yield call(API.updateRule, action.payload)
    yield put({ type: 'UPDATE_RULE_SUCCESS', payload: rule.data })
    toaster.success('Rule updated')
  } catch (e) {
    yield put({ type: 'UPDATE_RULE_FAILURE', payload: e.message })
    toaster.danger('Rule update failed')
  }
}

function* fetchCurrentProfile() {
  try {
    const res = yield call(API.fetchCurrentProfile)
    yield put({ type: 'FETCH_CURRENT_PROFILE_SUCCESS', payload: res.data })
  } catch (e) {
    yield put({ type: 'FETCH_CURRENT_PROFILE_FAILURE', payload: e.message })
  }
}

function* fetchUser(action: IAction) {
  try {
    const user = yield call(API.fetchUser, action.payload)
    yield put({ type: 'FETCH_USER_SUCCESS', payload: user.data })
  } catch (e) {
    yield put({ type: 'FETCH_USER_FAILURE', payload: e.message })
  }
}

function* updateUser(action: IAction) {
  try {
    const user = yield call(API.updateUser, action.payload)
    yield put({ type: 'UPDATE_USER_SUCCESS', payload: user.data })
  } catch (e) {
    yield put({ type: 'UPDATE_USER_FAILURE', payload: e.message })
  }
}

function* updateAccessToken(action: IAction) {
  try {
    const user = yield call(API.updateAccessToken, action.payload)
    yield put({ type: 'UPDATE_USER_SUCCESS', payload: user.data })
  } catch (e) {
    yield put({ type: 'UPDATE_USER_FAILURE', payload: e.message })
  }
}

function* fetchEvents() {
  try {
    const res = yield call(API.fetchEvents)
    yield put({ type: 'FETCH_EVENTS_SUCCESS', payload: res.data })
  } catch (e) {
    yield put({ type: 'FETCH_EVENTS_FAILURE', payload: e.message })
  }
}

function* fetchEvent(action: IAction) {
  try {
    // Check the store to see if we have this event somewhere
    const existingEvents = yield select(getEvents)
    const selectedEvent = yield select(getCurrentEvent)
    if (selectedEvent) existingEvents.push(selectedEvent)
    const cachedEvent = existingEvents.find((e: IEvent) => e.id === parseInt(action.payload.eventId))

    if (cachedEvent) {
      event = cachedEvent
    } else {
      const res = yield call(API.fetchEvent, action.payload.eventId)
      event = res.data
    }
    yield put({
      type: 'FETCH_EVENT_SUCCESS',
      payload: { event: event },
    })
  } catch (e) {
    yield put({
      type: 'FETCH_EVENT_FAILURE',
      payload: { eventId: action.payload.eventId, error: e },
    })
  }
}

export function* mainSaga() {
  yield takeLatest('LOGIN', login)
  yield takeLatest('LOGOUT', logout)
  yield takeLatest('FETCH_RULE', fetchRule)
  yield takeLatest('UPDATE_RULE', updateRule)
  yield takeLatest('FETCH_EVENTS', fetchEvents)
  yield takeLatest('FETCH_EVENT', fetchEvent)
  yield takeLatest('UPDATE_USER', updateUser)
  yield takeLatest('UPDATE_GC_ACCESS_TOKEN', updateAccessToken)
  yield takeLatest('FETCH_USER', fetchUser)
  yield takeLatest('FETCH_CURRENT_PROFILE', fetchCurrentProfile)
}
