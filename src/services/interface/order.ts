import { request } from '@umijs/max';

const api = {
  // 登录
  //   getOrderList: '/api/order/list',
  getOrderList(isAdmin: boolean) {
    return `/api/order/list?isAdmin=${isAdmin}`;
  },
  getHospitalList: '/api/hospitalInfo/list',
  addHospital: '/api/hospitalInfo/save',
  getEscortList: 'api/escort/list',
  auditEscort: '/api/admin/audit',
  // 登出
  getLogout: '/api/outLogin',
  // 商品列表
  getProductList: '/api/welfareShop/list',
  // 商品状态列表
  getProductStatusList: '/api/product/status',
  //类别列表
  getTypeList: '/api/product/type/list',
  // 添加商品
  getAddProduct: '/api/product/save',
  //商品详情
  getProductDetail(id: number) {
    return `/api/product/detail?id=${id}`;
  },
  //添加删除收藏商品
  getCollectionProduct(id: number) {
    return `/api/collectShopInfo/add?id=${id}`;
  },

  //获取收藏商品列表
  getCollection: '/api/collectShopInfo/list',
  //审核（发布）商品
  publishProduct: '/api/product/audit',
  // 聊天
  sendMessage: '/api/chat/saveMessage',
  // 聊天列表
  getMessageList(chatCode: string) {
    return `/api/chat/getMessages?chatCode=${chatCode}`;
  },
  // 下单
  sendOrder: '/api/orderInfo/start',
};

const token =
  'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsInBhc3N3b3JkIjoiJDJhJDEwJHMuMWlpbE5CNFQyVmRWOG1Wc3lnNy5jRFAuTTFKVE9aLmh2VWpUTzVzYkk3RGlZaG9QQkZxIiwicm9sZSI6IlJPTEVfQURNSU4iLCJpc3MiOiJnb25nRFkiLCJleHAiOjE3NDE3ODQyNTgsImlhdCI6MTc0MTY5Nzg1OCwidXNlcm5hbWUiOiJhZG1pbiJ9.E0xCOXownlwSOtlS8xx9Utc8lXOkDZxSWExiInrDdJ4';
const getToken = () => sessionStorage.getItem('Authorization');

export const getProductList = () => {
  return request(api.getProductList, {
    method: 'get', headers: {
      Authorization: token,
      'Source-Platform': 'browser',
    },
  });
};
export const getProductStatusList = (params: any) => {
  return request(api.getProductStatusList, {
    method: 'post',
    data: params,
    headers: {
      Authorization: getToken() || '',
    },
  });
};

export const getTypeList = () => {
  return request(api.getTypeList, {
    method: 'get',
  });
};
export const getAddProduct = (formData: FormData) => {
  return request(api.getAddProduct, {
    method: 'post',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: getToken() || '',
    },
  });
};

export const getLogout = () => {
  return request(api.getLogout, {
    method: 'post',
    headers: {
      Authorization: getToken() || '',
    },
  });
};
export const getProductDetail = (id: number) => {
  return request(api.getProductDetail(id), {
    method: 'get',
    headers: {
      Authorization: getToken() || '',
    },
  });
};

export const getOrderList = (isAdmin: boolean) => {
  return request(api.getOrderList(isAdmin), {
    method: 'get',
    headers: {
      Authorization: token,
      'Source-Platform': 'browser',
    },
  });
};
export const getEscortList = (status?: number) => {
  return request(api.getEscortList, {
    method: 'post',
    data: { status },
    headers: {
      Authorization: token,
      'Source-Platform': 'browser',
    },
  });
};
export const getHospitalList = () => {
  return request(api.getHospitalList, {
    method: 'get',
    // headers: {
    //   Authorization: getToken() || '',
    //   'Source-Platform': 'browser',
    // },
  });
};
export const addHospital = (params: any) => {
  return request(api.addHospital, {
    method: 'post',
    data: params,
    headers: {
      Authorization: token,
      'Source-Platform': 'browser',
    },
  });
};

export const auditEscort = (ids: number[]) => {
  return request(api.auditEscort, {
    method: 'post',
    data: { ids },
    headers: {
      Authorization: token,
      'Source-Platform': 'browser',
    },
  });

}
export const getCollectionProduct = (id: number) => {
  return request(api.getCollectionProduct(id), {
    method: 'get',
    headers: {
      Authorization: getToken() || '',
    },
  });
};

export const getCollection = () => {
  return request(api.getCollection, {
    method: 'get',
    headers: {
      Authorization: getToken() || '',
    },
  });
};
export const publishProduct = (params: any) => {
  return request(api.publishProduct, {
    method: 'post',
    data: params,
    headers: {
      Authorization: getToken() || '',
    },
  });
};
export const sendMessage = (params: any) => {
  return request(api.sendMessage, {
    method: 'post',
    data: params,
    headers: {
      Authorization: getToken() || '',
    },
  });
};
export const getMessageList = (chatCode: string) => {
  return request(api.getMessageList(chatCode), {
    method: 'get',
    headers: {
      Authorization: getToken() || '',
    },
  });
};

export const sendOrder = (params: any) => {
  return request(api.sendOrder, {
    method: 'post',
    data: params,
    headers: {
      Authorization: getToken() || '',
    },
  });
};
