import { setBearerToken } from '@/http'

export const setHeaderToken = token => setBearerToken(token)
export const getStorageToken = () => localStorage.getItem('token')
export const deleteStorageToken = () => localStorage.removeItem('token')
export const setStorageToken = token => localStorage.setItem('token', token)
