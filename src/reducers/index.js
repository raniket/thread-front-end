const initState = {
  user: null,
  resource: [],
}

function updateThreadList(state, action) {
  const threads = state.threads;
  const newThread = action.thread;
  threads.push(newThread);
  console.log('threads: ', threads);
  console.log('newThread: ', newThread);
  return { ...state, threads: threads, threadCreated: true, loading: false}
}

const reducer = (state = initState, action) => {
  switch (action.type) {

    // current rout for header component.
    case 'UPDTE_CURRENTPATH':
      return { ...state, currentPath: action.path }

    // handle resources.
    case 'GET_RESOURCES':
      return { ...state, loading: true };
    case 'GET_RESOURCES_DONE':
      return { ...state, resources: action.resources, resourceReceived: true, loading: false };
    case 'GET_RESOURCES_FAILED':
      return { ...state, resourceReceived: false, loading: false };

    // handle user login.
    case 'USER_LOGIN':
      return { ...state, logedIn: false, loading: true };
    case 'USER_LOGIN_DONE':
      return { ...state, user: action.user, logedIn: true, loading: false };
    case 'USER_LOGIN_FAILED':
      return { ...state, logedIn: false, loginFailed: true, loading: false };
    case 'RESET_LOGIN_FAILED':
      return { ...state, loginFailed: null };

    // handle user signup.
    case 'USER_SIGNUP':
      return { ...state, signedUp: false, loading: true };
    case 'USER_SIGNUP_DONE':
      return { ...state, user: action.user, signedUp: true, loading: false };
    case 'USER_SIGNUP_FAILED':
      return { ...state, signedUp: false, userSignupError: action.userSignupError, loading: false }
    case 'RESET_SIGNED_UP':
      return { ...state, signedUp: false };
    
    // handle user
    case 'GET_USER_DETAILS':
      return { ...state, loading: true };
    case 'GET_USER_DETAILS_DONE':
      return { ...state, user: action.user, loading: false };
    case 'GET_USER_DETAILS_FAILED':
      return { ...state, loading: false };
    
    // threads
    case 'FETCH_THREADS':
      return { ...state, threads: [], threadsReceived: false, loading: true };
    case 'FETCH_THREADS_DONE':
      return { ...state, threads: action.threads, threadsReceived: true, loading: false };
    case 'FETCH_THREADS_FAILED':
      return { ...state, threadsReceived: false, loading: false, };
    case 'RESET_THREAD_CREATED':
      return { ...state, threadCreated: false };

    case 'CREATE_THREAD':
      return { ...state, loading: true };
    case 'CREATE_THREAD_DONE':
      return updateThreadList(state, action);
    case 'CREATE_THREAD_FAILED':
      return { ...state, threadCreated: false, loading: false };
    
    default:
      return state;
  }
}

export default reducer;