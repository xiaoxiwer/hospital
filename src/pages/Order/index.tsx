import { getOrderList } from '@/services/interface/order';
import { UserList } from '@/services/type';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button } from 'antd';
import { useRef } from 'react';

export default function OrderPage() {
  const columns: ProColumns<UserList>[] = [
    {
      title: '订单编号',
      dataIndex: 'orderCode',
      ellipsis: true,
      fixed: 'left',
      width: 150,
    },
    {
      title: '下单人名称',
      dataIndex: 'nickName',
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '陪诊类型',
      dataIndex: 'type',
      hideInSearch: true,
      ellipsis: true,
    },
    {
      title: '陪诊员名称',
      dataIndex: 'escortInfo',
      hideInSearch: true,
      render: (_, record) => record.escortInfo.name,
      ellipsis: true,
    },
    {
      title: '陪诊员电话',
      dataIndex: 'escortInfo',
      render: (_, record) => record.escortInfo.phone,
      hideInSearch: true,
    },
    {
      title: '就诊人名称',
      dataIndex: 'patientInfo',
      render: (_, record) => record.patientInfo.patientName,
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '就诊人电话',
      dataIndex: 'patientInfo',
      render: (_, record) => record.patientInfo.patientPhone,
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '地址',
      dataIndex: 'patientInfo',
      render: (_, record) => record.patientInfo.address,
      hideInSearch: true,
      ellipsis: true,
    },
    {
      title: '状态',
      dataIndex: 'orderStatus',
      ellipsis: true,
      valueEnum: {
        1: { text: '预约中' },
        2: { text: '待陪诊' },
        3: { text: '陪诊中' },
        4: { text: '已完成' },
        5: { text: '已取消' },
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      ellipsis: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      fixed: 'right',
      render: () => (
        <>
          <Button type="link">编辑</Button>
          <Button type="link">归档</Button>
        </>
      ),
    },
  ];

  const fetchTenantInfoList = async () => {
    const isAdmin = true;
    const res = await getOrderList(isAdmin);
    return {
      data: res.data,
      success: true,
      total: res.total || 0,
    };
  };

  const actionRef = useRef<ActionType>();

  return (
    <PageContainer>
      <ProTable<UserList>
        scroll={{ x: 1500 }}
        actionRef={actionRef}
        search={{
          labelWidth: 100,
          defaultColsNumber: 3,
        }}
        options={false}
        columns={columns}
        request={fetchTenantInfoList}
      />
    </PageContainer>
  );
}
