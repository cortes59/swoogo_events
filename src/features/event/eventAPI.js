import request from '../../app/utils/request';

export function fetchEventByIdAPI(id) {
  return request.get(`/events/${id}`)
}
