export const getResource = (data) => ({
  type: 'GET_RESOURCE', data,
});

export const updateCurrentPath = (path) => ({
  type: 'UPDTE_CURRENTPATH', path,
});

export const userLogin = (data) => ({
  type: 'USER_LOGIN', data
})

export const userLogout = () => ({
  type: 'USER_LOGOUT',
});

export const getUsers = () => ({
  type: 'GET_USERS',
})

export const getResources = () => ({
  type: 'GET_RESOURCES',
})

export const getUserDetails = (data) => ({
  type: 'GET_USER_DETAILS', data
})

export const fetchThreads = () => ({
  type: 'FETCH_THREADS',
})

export const createThread = (data) => ({
  type: 'CREATE_THREAD', data
})

export const userSignup = (data) => ({
  type: 'USER_SIGNUP', data,
})

export const resetSignedUp = () => ({
  type: 'RESET_SIGNED_UP',
});

export const restThreadCreated = () => ({
  type: 'RESET_THREAD_CREATED',
})

export const resetLoginFailed = () => ({
  type: 'RESET_LOGIN_FAILED',
})
