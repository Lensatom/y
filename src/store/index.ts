import { create } from 'zustand'
import { UserState } from './interfaces'

const defaultUserState = {
  id: null,
  name: null,
  photoURL: null,
  email: null,
  isLoggedIn: false,
}

export const useUserStore = create<UserState>((set) => ({
  ...defaultUserState,
  update: (data) => set((state) => ({...state, ...data})),
  login: (data) => set((state) => ({...state, ...data, isLoggedIn: true}))
}))