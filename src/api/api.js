import api from './instance';

export function login(data) {
  return api.post('/ddc/es/common/third_login', data);
}

export function getToken(data) {
  return api.get('/ddc/es/common/get_token', data);
}

export function getConfig() {
  return api.get(
    '/ddc/es/parameter/get_parameter_list?key=人群类型,文化程度,职业,问题分类,重点走访类型'
  );
}
export function getHouseholdList() {
  return api.get('/ddc/es/grid_visit/get_my_info');
}

export function getHouseholdDetail(id) {
  return api.get(`/ddc/es/grid_visit/get_household_detail?household_id=${id}`);
}
