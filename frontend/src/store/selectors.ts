import { IState } from 'store/state'

export function getRule(state: IState) {
  return state.rule
}

export function getIsFetchingRule(state: IState) {
  return state.isFetchingRule
}

export function getIsUpdatingRule(state: IState) {
  return state.isUpdatingRule
}
export function getUpdateRuleFailed(state: IState) {
  return state.updateRuleFailed
}

export function getEvents(state: IState) {
  return state.events.sort((a, b) => (new Date(a.created_at) > new Date(b.created_at) ? 1 : -1))
}

export function getIsFetchingEvents(state: IState) {
  return state.isFetchingEvents
}

export function getCurrentEvent(state: IState) {
  return state.currentEvent
}

export function getIsFetchingEvent(state: IState) {
  return state.isFetchingEvent
}

export function getEventFetchFailed(state: IState) {
  return state.eventFetchFailed
}

export function getUser(state: IState) {
  return state.user
}

export function isLoggedIn(state: IState) {
  return state.isLoggedIn
}

export function getProfile(state: IState) {
  return state.profile
}

export function isLoadingProfile(state: IState) {
  return state.loadingProfile
}
