import { request } from '@umijs/max';

const api = {
  // 登录
  getLogin: '/api/login',
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

// const token =
//   'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsInBhc3N3b3JkIjoiJDJhJDEwJHMuMWlpbE5CNFQyVmRWOG1Wc3lnNy5jRFAuTTFKVE9aLmh2VWpUTzVzYkk3RGlZaG9QQkZxIiwicm9sZSI6IlJPTEVfQURNSU4iLCJpc3MiOiJnb25nRFkiLCJleHAiOjE3NDE5MTU4MTUsImlhdCI6MTc0MTgyOTQxNSwidXNlcm5hbWUiOiJhZG1pbiJ9.GEDrQEEt2Wkuekefg2S-tQAO-eBAVWZqzVmBZARWvHY';
// const getToken = () => sessionStorage.getItem('Authorization');

const token = localStorage.getItem('Authorization') || ''
export const getProductList = () => {
  return request(api.getProductList, {
    method: 'get', headers: {
      Authorization: token,
      'Source-Platform': 'browser',
    },
  });
};

export const getLogin = (params: any) => {
  return request(api.getLogin, {
    method: 'post',
    data: params,
    headers: {
      'Source-Platform': 'browser',
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
