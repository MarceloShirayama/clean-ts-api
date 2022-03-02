export interface UpdateAccessTokenRepository {
  updateAccessToken<T>(id: T, token: string): Promise<void>
}
