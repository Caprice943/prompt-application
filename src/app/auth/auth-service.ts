import { inject, Injectable, signal } from '@angular/core'
import { environment } from '../../environments/environment'
import { HttpClient } from '@angular/common/http'
import { catchError, tap } from 'rxjs/operators'
import { of } from 'rxjs'
import { CurrentUser } from './current-user.model'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
    httpClient = inject(HttpClient)
  baseUrl = environment.apiUrl + 'auth'

  currentUser = signal<CurrentUser | undefined>(undefined)

  loadCurrentUser() {
    return this.httpClient
      .get<CurrentUser>(`${this.baseUrl}/me`)
      .pipe(
        tap((currentUser) => this.currentUser.set(currentUser)),
        catchError(() => {
          this.currentUser.set(undefined)
          return of(undefined)
        })
      )
  }

  login(username: string, password: string) {
    return this.httpClient
      .post<CurrentUser>(`${this.baseUrl}/login`, { username, password })
      .pipe(tap((currentUser) => this.currentUser.set(currentUser)))
  }

  register(username: string, password: string) {
    return this.httpClient
      .post<CurrentUser>(`${this.baseUrl}/register`, { username, password })
      .pipe(tap((currentUser) => this.currentUser.set(currentUser)))
  }

  logout() {
    return this.httpClient
      .post(`${this.baseUrl}/logout`, { })
      .pipe(tap(() => this.currentUser.set(undefined)))
  }
}
