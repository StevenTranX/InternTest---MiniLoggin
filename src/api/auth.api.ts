import { SuccessResponse } from './../types/auth.type'
import http from 'src/utils/http'
import { User } from 'src/types/user.type'

const authApi = {
  login(body: { email: string; password: string }) {
    const url = '/auth/signin'
    return http.post<SuccessResponse<User>>(url, body)
  },
  updateUser(body: { id: number; birthday: Date; name: string; phone: string }) {
    const { id } = body
    const url = `/users/${id}`
    return http.put(url, body)
  }
}

export default authApi
