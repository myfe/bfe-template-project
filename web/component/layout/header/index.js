import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Layout,
  Menu,
  Row,
  Col,
  Dropdown,
  Icon,
} from 'antd';

import './index.less';

const { Header } = Layout;

export default class LayoutHeader extends PureComponent {
  static propTypes = {
    user: PropTypes.shape({
      name: PropTypes.string,
    }),
    children: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
      PropTypes.string
    ]),
  };

  static defaultProps = {
    user: null,
    children: null,
  };

  getUserMenu = () => (
    <Menu>
      <Menu.Item key="1">
        <a href="a">退出</a>
      </Menu.Item>
    </Menu>
  );

  getAvatar = user => {
    if (!user) {
      return '未登录';
    }

    return (
      <Dropdown
        overlay={this.getUserMenu()}
        className="user-drop"
        getPopupContainer={() => document.querySelector('.layout-header')}
      >
        <div className="user-out">
          {user.get('name')}
          <Icon type="down" />
        </div>
      </Dropdown>
    );
  }

  render() {
    const { user, children } = this.props;
    return (
      <Header className="layout-header">
        <Row type="flex" justify="space-between" className="layout-header-row">
          <Col className="layout-header-content">
            {children}
          </Col>
          <Col className="layout-header-user">
            {this.getAvatar(user)}
          </Col>
        </Row>
      </Header>
    );
  }
}
