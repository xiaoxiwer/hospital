import { getEscortList, getProductList } from '@/services/interface/order';
import { WelfareList } from '@/services/type';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button } from 'antd';
import { useRef } from 'react';

export default function Page() {
  const columns: ProColumns<WelfareList>[] = [
    {
      title: '商品名称',
      dataIndex: 'name',
      ellipsis: true,
      fixed: 'left',
      width: 150,
    },
    {
      title: '描述',
      dataIndex: 'description',
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '库存',
      dataIndex: 'count',
      hideInSearch: true,
    },
    {
      title: '积分价格',
      dataIndex: 'redeemPrice',
      hideInSearch: true,
      valueEnum: {
        0: { text: '女' },
        1: { text: '男' },
      },
    },
    {
      title: '商品图片',
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
      title: '状态',
      dataIndex: 'status',
      ellipsis: true,
      valueEnum: {
        0: { text: '已上架' },
        1: { text: '下架' },
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
          <Button type="link">删除</Button>
        </>
      ),
    },
  ];

  const fetchTenantInfoList = async () => {
    const res = await getProductList();
    return {
      data: res.data,
      success: true,
      total: res.total || 0,
    };
  };

  const actionRef = useRef<ActionType>();

  return (
    <PageContainer>
      <ProTable<WelfareList>
        scroll={{ x: 1500 }}
        actionRef={actionRef}
        search={{
          labelWidth: 100,
          defaultColsNumber: 3,
        }}
        options={false}
        columns={columns}
        request={fetchTenantInfoList}
        toolBarRender={() => [
          <Button type="primary" key="primary">
            新增
          </Button>,
        ]}
      />
    </PageContainer>
  );
}
