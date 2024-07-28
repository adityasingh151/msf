import { clearUser } from './authSlice';

const sessionMiddleware = (store) => (next) => (action) => {
  const state = store.getState();
  const timestamp = state.auth.timestamp;
  const expireTime = 3600 * 1000 * 24 * 7;

  console.log("Middleware triggered:", action.type);
  console.log("Current timestamp:", timestamp);
  console.log("Time since last activity:", Date.now() - timestamp);

  if (action.type !== clearUser.type && timestamp && Date.now() - timestamp > expireTime) {
    console.log("Session expired, dispatching clearUser");
    store.dispatch(clearUser());
  }

  return next(action);
};

export default sessionMiddleware;
