// Service for resource
import request from '../lib/request';

const getAllThreads = (params) => {
  return request({
    url: `/threads`,
    method: 'GET',
    headers: {'Authorization': localStorage.getItem('token')}
  })
}

const createThread = (params) => {
  return request({
    url: `/threads`,
    method: 'POST',
    headers: { 'Authorization': localStorage.getItem('token') },
    data: params.data
  })
}

const ThreadService = {
  getAllThreads, createThread
}

export default ThreadService;