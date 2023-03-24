export interface SuccessResponse<Data> {
  statusCode: number
  content: Data
  token: string
  dateTime: Date
}

export interface ErrorResponse {
  statusCode: number
  message: string
  content: string
  dateTime: Date
}
