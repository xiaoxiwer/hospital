export interface UserList {
  createTime: string; //创建时间
  escortInfo: EscortInfo;
  id: number;
  orderCode: string; //订单编号
  orderPrice: number; //交易金额
  orderStatus: number; //订单状态
  updateTime: string; //更新时间
  type: string; //陪诊类型
  nickName: string; //下单人名称
  patientInfo: PatientInfo; //就诊人名称
}
export interface EscortInfo {
  name: string; //陪诊员名称
  phone: string; //陪诊员电话
}
export interface PatientInfo {
  patientPhone: string; //就诊人名称
  patientName: string; //就诊人电话
  address: string; //地址
}

export interface HospitalList {
  id: number;
  hospitalName: string; //医院名称
  hospitalAddress: string; //医院地址
  hospitalDesc: string; //医院描述
  subjectHome: string; //科室
  level: string; //等级
  pictures: string; //图片
  updateTime: string; //更新时间
  createTime: string; //创建时间
}
export interface EscortList {
  id: number;
  name: string; //陪诊员名称
  phone: string; //陪诊员电话
  sex: number; //性别
  age: number; //年龄
  addressInfo: string; //地址
  picture: string; //图片
  description: string; //描述
  escortStatus: number; //陪诊员状态 1:空闲 2:陪诊中 3:已被预约 4:待审核
  score: number; //陪诊员福利评分
  accessScore: number; //陪诊员服务评分
  createTime: string; //创建时间
  hospitalInfo: HospitalList; //医院信息
}

export interface WelfareList {
  id: number;
  name: string; //福利名称
  createTime: string;
  description: string; //福利描述
  picture: string; //图片
  redeemPrice: number; //价格
  status: number; //状态 0:上架 1:下架
  count: number; //库存
}
