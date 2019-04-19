import axios from "./http"
import * as api from "./api"
export function test(params) {
  return axios.oGet(api.test, params)
}
export function rule(params) {
  return axios.oGet(api.rule, params)
}
export function router(params) {
  return axios.oGet(api.router, params)
}
