import { getEscortList } from '@/services/interface/order';
import { EscortList } from '@/services/type';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button } from 'antd';
import { useRef } from 'react';

export default function Page() {
  const columns: ProColumns<EscortList>[] = [
    {
      title: '姓名',
      dataIndex: 'name',
      ellipsis: true,
      fixed: 'left',
      width: 150,
    },
    {
      title: '电话',
      dataIndex: 'phone',
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '年龄',
      dataIndex: 'age',
      hideInSearch: true,
    },
    {
      title: '性别',
      dataIndex: 'sex',
      hideInSearch: true,
      valueEnum: {
        0: { text: '女' },
        1: { text: '男' },
      },
    },
    {
      title: '地址',
      dataIndex: 'addressInfo',
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '图片',
      dataIndex: 'picture',
      hideInSearch: true,
      ellipsis: true,
      render: (text, record) => {
        return (
          <img src={record.picture} alt="图片" style={{ width:'50%', height: '50%' }} />
        );
      },
    },
    {
      title: '评分',
      dataIndex: 'accessScore',
      hideInSearch: true,
    },
    {
      title: '福利积分',
      dataIndex: 'score',
      hideInSearch: true,
    },
    {
      title: '医院名称',
      dataIndex: 'hospitalInfo',
      render: (_, record) => record.hospitalInfo.hospitalName,
      hideInSearch: true,
      ellipsis: true,
    },
    {
      title: '状态',
      dataIndex: 'escortStatus',
      ellipsis: true,
      valueEnum: {
        1: { text: '空闲' },
        2: { text: '陪诊中' },
        3: { text: '已被预约' },
        4: { text: '待审核' },
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
          <Button type="link">查看</Button>
          <Button type="link">删除</Button>
        </>
      ),
    },
  ];

  const fetchTenantInfoList = async () => {
    const res = await getEscortList();
    console.log(res.data);
    return {
      data: res.data,
      success: true,
      total: res.total || 0,
    };
  };

  const actionRef = useRef<ActionType>();

  return (
    <PageContainer>
      <ProTable<EscortList>
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
