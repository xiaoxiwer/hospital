import { auditEscort, getEscortList } from '@/services/interface/order';
import { EscortList } from '@/services/type';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, message, Space } from 'antd';
import { useRef, useState } from 'react';

export default function Page() {
  const actionRef = useRef<ActionType>();
  const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]);

  const fetchTenantInfoList = async () => {
    const res = await getEscortList(4);
    return {
      data: res.data,
      success: true,
      total: res.total || 0,
    };
  };

  const handleAudit = async(id: number) => {
    const res = await auditEscort([id]);
    if (res.code === 200) {
      actionRef.current?.reload();
      message.success('审核成功');
    }else{
      message.error('审核失败');
    };
  };

  const handleBatchAudit = async () => {
    const res = await auditEscort(selectedRowKeys);
    if (res.code === 200) {
      actionRef.current?.reload();
      message.success('批量审核成功');
      setSelectedRowKeys([]);
    } else {
      message.error('批量审核失败');
    }
    console.log('批量审核', selectedRowKeys);
  };

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
      render: (_, record) => {
        return (
          <img src={record.picture.split(',')[0]} alt="图片" style={{ width:'50%', height: '50%' }} />
        );
      },
    },
    {
      title: '描述',
      dataIndex: 'description',
      hideInSearch: true,
      ellipsis: true,
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
      render: (_,record) => (
          <Button type="link" onClick={()=>handleAudit(record.id)}>审核</Button>
      ),
    },
  ];

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
        rowKey="id"
        tableAlertOptionRender={() => {
          return (
            <Space size={16}>
               <Button key="batchAudit" type="primary" onClick={handleBatchAudit} disabled={selectedRowKeys.length === 0}>
              批量审核
            </Button>,
            </Space>
          );
        }}
        rowSelection={{
          selectedRowKeys,
          onChange: (selectedKeys) => setSelectedRowKeys(selectedKeys as any) ,
          preserveSelectedRowKeys: true,
        }}
      />
    </PageContainer>
  );
}
