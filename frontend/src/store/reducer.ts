import { IState, defaultState } from 'store/state'
import { IAction } from 'store/actions'

export default function(state: IState = defaultState, action: IAction): IState {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isLoggedIn: true,
      }
    case 'LOGOUT_SUCCESS':
      return {
        ...state,
        isLoggedIn: false,
      }
    case 'FETCH_RULE':
      return {
        ...state,
        isFetchingRule: true,
      }
    case 'FETCH_RULE_SUCCESS':
      return {
        ...state,
        rule: action.payload,
        isFetchingRule: false,
      }
    case 'FETCH_RULE_FAILURE':
      return {
        ...state,
        isFetchingRule: false,
      }
    case 'UPDATE_RULE':
      return {
        ...state,
        isUpdatingRule: true,
      }
    case 'UPDATE_RULE_SUCCESS':
      return {
        ...state,
        rule: action.payload,
        isUpdatingRule: false,
      }
    case 'UPDATE_RULE_FAILURE':
      return {
        ...state,
        isUpdatingRule: false,
        updateRuleFailed: true,
      }
    case 'UPDATE_USER':
      return {
        ...state,
        isUpdatingUser: true,
      }
    case 'UPDATE_GC_ACCESS_TOKEN':
      return {
        ...state,
        isUpdatingUser: true,
      }
    case 'UPDATE_USER_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isUpdatingUser: false,
      }
    case 'UPDATE_USER_FAILURE':
      return {
        ...state,
        isUpdatingUser: false,
        updateUserFailed: true,
      }
    case 'FETCH_USER':
      return {
        ...state,
        isFetchingUser: true,
      }
    case 'FETCH_USER_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isFetchingUser: false,
      }
    case 'FETCH_USER_FAILURE':
      return {
        ...state,
        isFetchingUser: false,
        fetchUserFailed: true,
      }
    case 'FETCH_EVENTS':
      return {
        ...state,
        isFetchingEvents: true,
      }
    case 'FETCH_EVENTS_SUCCESS':
      return {
        ...state,
        isFetchingEvents: false,
        events: action.payload,
      }
    case 'FETCH_EVENT':
      return {
        ...state,
        isFetchingEvent: true,
      }
    case 'FETCH_EVENT_SUCCESS':
      return {
        ...state,
        isFetchingEvent: false,
        currentEvent: action.payload.event,
      }
    case 'FETCH_EVENT_FAILURE':
      return {
        ...state,
        isFetchingEvent: false,
        eventFetchFailed: true,
      }
    case 'FETCH_CURRENT_PROFILE':
      return {
        ...state,
        loadingProfile: true,
      }
    case 'FETCH_CURRENT_PROFILE_SUCCESS':
      return {
        ...state,
        profile: action.payload,
        loadingProfile: false,
      }
    case 'FETCH_CURRENT_PROFILE_FAILURE':
      return {
        ...state,
        loadingProfile: false,
      }
    default:
      return state
  }
}
