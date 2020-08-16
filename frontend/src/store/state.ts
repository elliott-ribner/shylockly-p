import { IRule, IEvent, IUser, IUserProfile } from 'types'
import { isLoggedIn } from 'axios-jwt'

export interface IState {
  isFetchingRule: boolean
  isUpdatingRule: boolean
  updateRuleFailed: boolean
  rule: IRule
  user: IUser
  isUpdatingUser: boolean
  updateUserFailed: boolean
  isFetchingUser: boolean
  fetchUserFailed: boolean
  events: IEvent[]
  isFetchingEvents: boolean
  isFetchingEvent: boolean
  currentEvent: IEvent | undefined
  eventFetchFailed: boolean
  isLoggedIn: boolean
  profile: IUserProfile
  loadingProfile: boolean
}

export const defaultState: IState = {
  isFetchingRule: false,
  isUpdatingRule: false,
  updateRuleFailed: false,
  rule: undefined,
  user: undefined,
  isUpdatingUser: false,
  updateUserFailed: false,
  isFetchingUser: false,
  fetchUserFailed: false,
  events: [],
  isFetchingEvents: false,
  isFetchingEvent: false,
  currentEvent: undefined,
  eventFetchFailed: false,
  isLoggedIn: isLoggedIn(),
  profile: undefined,
  loadingProfile: false,
}
