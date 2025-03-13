import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './index.less'; // 如果需要自定义样式，可以在这个文件中编写
import { getLogin } from '@/services/interface/order';
import { history } from '@umijs/max';

const Login = () => {
  const [loading, setLoading] = useState(false);

  const handleLogin = async (values: any) => {
    setLoading(true);
    const { username, password } = values;
    const res = await getLogin({ username, password });
    console.log('Login response:', res);
    const Authorization = res?.data?.token;
    localStorage.setItem('Authorization', Authorization);
    if (res.code === 200) {
      message.success('登录成功');
    history.push('/order');
    } else {
      message.error(res.msg);
    }
    setLoading(false);
  };

  return (
    <div className="login-container">
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={handleLogin}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: '请输入用户名!' }]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: '请输入密码!' }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="密码"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>记住我</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="">
            忘记密码
          </a>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button" loading={loading}>
            登录
          </Button>
          或 <a href="">现在注册!</a>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;