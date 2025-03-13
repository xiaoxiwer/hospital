import { addHospital, getHospitalList } from '@/services/interface/order';
import { HospitalList } from '@/services/type';
import { UploadOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import {
  Button,
  Form,
  Input,
  message,
  Modal,
  Select,
  Upload,
  UploadFile,
} from 'antd';
import { useRef, useState } from 'react';

export default function HospitalPage() {
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();
  const [open, SetOpen] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<HospitalList>();
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleEdit = (record: HospitalList) => {
    form.setFieldsValue(record);
    setIsEditing(true);
    SetOpen(true);
  };
  const columns: ProColumns<HospitalList>[] = [
    {
      title: '编号',
      dataIndex: 'id',
      ellipsis: true,
      fixed: 'left',
      width: 50,
    },
    {
      title: '医院名称',
      dataIndex: 'hospitalName',
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '医院地址',
      dataIndex: 'hospitalAddress',
      hideInSearch: true,
      ellipsis: true,
    },
    {
      title: '医院描述',
      dataIndex: 'hospitalDesc',
      hideInSearch: true,
      ellipsis: true,
    },
    {
      title: '医院类型',
      dataIndex: 'subjectHome',
      hideInSearch: true,
    },
    {
      title: '医院等级',
      dataIndex: 'level',
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      ellipsis: true,
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      ellipsis: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      fixed: 'right',
      render: (text, record) => (
        <>
          <Button
            type="link"
            onClick={() => {
              setCurrentRow(record);
              handleEdit(record);
            }}
          >
            编辑
          </Button>
          <Button type="link">归档</Button>
        </>
      ),
    },
  ];

  const fetchTenantInfoList = async () => {
    const res = await getHospitalList();
    return {
      data: res.data,
      success: true,
      total: res.total || 0,
    };
  };

  const handleAdd = () => {
    setIsEditing(false);
    form.resetFields();
    SetOpen(true);
  };
  const handleOk = async () => {
    const values = await form.validateFields();
    if (isEditing) {
      const res = await addHospital({ ...values, id: currentRow?.id });
      if (res.code !== 200) return message.error(res.message);
      message.success('编辑成功');
    } else {
      const res = await addHospital(values);
      if (res.code !== 200) return message.error(res.message);
      message.success('添加成功');
    }
    SetOpen(false);
    form.resetFields();
    actionRef.current?.reload(); // 刷新表格数据
  };

  const handleCancel = async () => {
    SetOpen(false);
    form.resetFields();
  };
  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };
  const uploadButton = (
    <div>
      <UploadOutlined />
      <div style={{ marginTop: 8 }}>上传图片</div>
    </div>
  );
  return (
    <PageContainer>
      <ProTable<HospitalList>
        scroll={{ x: 1000 }}
        actionRef={actionRef}
        search={{
          labelWidth: 100,
          defaultColsNumber: 3,
        }}
        toolBarRender={() => [
          <Button type="primary" key="primary" onClick={handleAdd}>
            新增
          </Button>,
        ]}
        options={false}
        columns={columns}
        request={fetchTenantInfoList}
      />
      <Modal
        title={`${isEditing ? '编辑' : '添加'}医院信息`}
        width="500px"
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form}>
          <Form.Item
            name="hospitalName"
            label="医院名称"
            rules={[{ required: true, message: '请输入医院名称!' }]}
          >
            <Input placeholder="请输入医院名称" />
          </Form.Item>
          <Form.Item
            name="hospitalAddress"
            label="医院地址"
            rules={[{ required: true, message: '请输入医院地址!' }]}
          >
            <Input placeholder="请输入医院地址" />
          </Form.Item>
          <Form.Item
            name="hospitalDesc"
            label="医院描述"
            rules={[{ required: true, message: '请输入医院描述!' }]}
          >
            <Input placeholder="请输入医院描述" />
          </Form.Item>
          <Form.Item
            name="subjectHome"
            label="医院类型"
            rules={[{ required: true, message: '请输入医院类型!' }]}
          >
            <Input placeholder="请输入医院类型" />
          </Form.Item>
          <Form.Item
            name="level"
            label="医院等级"
            rules={[{ required: true, message: '请选择医院等级!' }]}
          >
            <Select
              placeholder="请选择"
              options={[
                { value: '一甲', label: '一甲' },
                { value: '二甲', label: '二甲' },
                { value: '三甲', label: '三甲' },
              ]}
            />
          </Form.Item>
          <Form.Item
            name="pictures"
            label="医院图片"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            extra="最多选择5张图片"
            rules={[{ required: true, message: '请选择至少一张图片' }]}
          >
            <Upload
              accept=".jpg,.png"
              listType="picture-card"
              fileList={fileList}
              onChange={({ fileList }) => setFileList(fileList)}
              beforeUpload={() => false}
              multiple
              maxCount={5}
            >
              {fileList.length >= 5 ? null : uploadButton}
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </PageContainer>
  );
}
