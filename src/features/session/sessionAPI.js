import qs from "querystring";

import request from "../../app/utils/request";

export function fetchEventSessionsAPI(params) {
  return request.get(`/sessions?${qs.encode(params)}`);
}

export function fetchSessionByIdAPI(id) {
  return request.get(`/sessions/${id}`);
}
