import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { API_HOST } from '@/constants/serverHost'
import { syncUserWithDb } from '@/utils/syncUserWithDb'
import { CreateUser, LoginRequestData, UserDTO } from '@/types/AuthTypes'

const apiClient = axios.create({
  baseURL: `${API_HOST}/yandex/auth`,
  withCredentials: true,
})

export const register = createAsyncThunk<{ id: number }, CreateUser>(
  'register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await apiClient.post('/signup', userData)
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.reason)
      }
      return rejectWithValue({ reason: 'An unknown error occurred' })
    }
  }
)

export const login = createAsyncThunk<void, LoginRequestData>('login', async (loginData, { rejectWithValue }) => {
  try {
    const response = await apiClient.post('/signin', loginData)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data.reason)
    }
    return rejectWithValue({ reason: 'An unknown error occurred' })
  }
})

export const fetchCurrentUser = createAsyncThunk('me', async (_, { rejectWithValue }) => {
  try {
    const response = await apiClient.get('/user')
    syncUserWithDb(response.data)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data.reason)
    }
    return rejectWithValue({ reason: 'An unknown error occurred' })
  }
})

export const logout = createAsyncThunk('logout', async (_, { rejectWithValue }) => {
  try {
    const response = await apiClient.post('/logout')
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data.reason)
    }
    return rejectWithValue({ reason: 'An unknown error occurred' })
  }
})

interface AuthState {
  user: UserDTO | null
  isAuth: boolean
  status: 'idle' | 'pending' | 'succeeded' | 'failed'
  error: string | null
  isAuthenticating: boolean
}

const initialState: AuthState = {
  user: null,
  isAuth: false,
  status: 'idle',
  error: null,
  isAuthenticating: true,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(login.pending, state => {
        state.isAuthenticating = true
        state.status = 'pending'
      })
      .addCase(login.fulfilled, state => {
        state.isAuth = true
        state.status = 'succeeded'
        state.isAuthenticating = false
      })
      .addCase(login.rejected, state => {
        state.user = null
        state.isAuth = false
        state.status = 'failed'
        state.isAuthenticating = false
      })

      .addCase(register.pending, state => {
        state.isAuthenticating = true
        state.status = 'pending'
      })
      .addCase(register.fulfilled, state => {
        state.isAuth = true
        state.status = 'succeeded'
        state.isAuthenticating = false
      })
      .addCase(register.rejected, state => {
        state.user = null
        state.isAuth = false
        state.status = 'failed'
        state.isAuthenticating = false
      })

      .addCase(fetchCurrentUser.pending, state => {
        state.isAuthenticating = true
        state.status = 'pending'
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload
        state.isAuth = true
        state.status = 'succeeded'
        state.isAuthenticating = false
      })
      .addCase(fetchCurrentUser.rejected, state => {
        state.user = null
        state.isAuth = false
        state.status = 'failed'
        state.isAuthenticating = false
      })

      .addCase(logout.pending, state => {
        state.isAuthenticating = true
        state.status = 'pending'
      })
      .addCase(logout.fulfilled, state => {
        state.user = null
        state.isAuth = false
        state.status = 'succeeded'
        state.isAuthenticating = false
      })
      .addCase(logout.rejected, state => {
        state.status = 'failed'
        state.isAuthenticating = false
      })
  },
})

export default authSlice.reducer
