// Service for resource
import request from '../lib/request';

/**
 * Create a resource
 *
 * @param {*} params payload for creating resource
 * @returns success
 */
const create = (params) => {
  return request({
    url: `/user/signup`,
    method: 'POST',
    data: params.data
  });
}

const userLogin = (params) => {
  return request({
    url: `/user/login`,
    method: 'POST',
    data: params.data
  })
}

const getUser = (params) => {
  const {userId, token} = params.data;
  return request({
    url: `/user/${userId}`,
    method: 'GET',
    headers: {'Authorization': token}
  })
}

const UserService = {
  create, userLogin, getUser
}

export default UserService;