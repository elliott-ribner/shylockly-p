import { useAuthTokenInterceptor } from 'axios-jwt'
import { toaster } from 'evergreen-ui'
import axios from 'axios'
import { rootUrl } from 'urls'
import { IRule, IEvent, IUser, IMandate, ICustomer, IPayment } from 'types'

const httpClient = axios.create({
  baseURL: rootUrl,
  timeout: 5000,
})

export function login(email: string, password: string): Promise<IRule[]> {
  return httpClient.post(`/auth/login/`, { email, password })
}

export function logout(): Promise<IRule[]> {
  return httpClient.get(`/auth/logout/`)
}

export function fetchRule(): Promise<IRule[]> {
  // TODO remove ID and have endpoint look up correct rule (single entity)
  return httpClient.get(`/rules/1`)
}

export function updateRule(rule: IRule) {
  return httpClient.put(`/rules`, rule)
}

export function fetchEvents(): Promise<Array<IEvent>> {
  return httpClient.get(`/events/`)
}

export function fetchEvent(id: string): Promise<IEvent> {
  return httpClient.get(`/events/${id}`)
}

export function fetchMandates(): Promise<Array<IMandate>> {
  return httpClient.get(`/mandates/`)
}

export function fetchMandate(id: string): Promise<IMandate> {
  return httpClient.get(`/mandates/${id}`)
}

export function updateUser(user: IUser) {
  return httpClient.put(`/users`, user).then(res => {
    toaster.success('User updated')
    return res
  })
}

// setting go cardless access token
export function updateAccessToken(code: string) {
  return httpClient.post(`/auth/gc-token`, { code }).then(res => {
    toaster.success('Go cardless connected')
    return res
  })
}

export function fetchUser(id: string): Promise<IEvent> {
  return httpClient.get(`/users/${id}`)
}

export function fetchCurrentProfile(): Promise<IEvent> {
  return httpClient.get(`/auth/profile`)
}

export function fetchCustomers(): Promise<ICustomer[]> {
  return httpClient.get('/customers/')
}

export function fetchCustomer(id: string): Promise<ICustomer> {
  return httpClient.get(`/customers/${id}/`)
}
export function fetchPayments(): Promise<IPayment[]> {
  return httpClient.get('/payments/')
}

export function fetchPayment(id: string): Promise<IPayment> {
  return httpClient.get(`/payments/${id}/`)
}

export function requestTokenRefresh(refreshToken: string) {
  return httpClient
    .post<undefined, IRequestTokenRefreshResponse>(`/auth/refresh_token`, { token: refreshToken })
    .then(data => data.access_token)
}

useAuthTokenInterceptor(httpClient, {
  requestRefresh: requestTokenRefresh,
  header: 'Authorization',
  headerPrefix: 'Bearer ',
})

interface IRequestTokenRefreshResponse {
  access_token: string
}
