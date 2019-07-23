import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Layout } from 'antd';
import LayoutHeader from '../component/layout/header';
import LayoutNavigator from '../component/layout/navigator';

import { NAVIGATOR_DATASOURCE } from './config';
import './root-view.less';

const { Sider, Content } = Layout;

class LayoutView extends React.Component {
  static propTypes = {
    user: PropTypes.shape({}).isRequired,
    path: PropTypes.string.isRequired,
    Component: PropTypes.node.isRequired
  };

  componentWillMount() {

  }

  render() {
    const { path, user, Component } = this.props;
    const currentPath = path.substring(1) || 'home';
    return (
      <Layout className="layout-default">
        <Sider width={220} className="layout-sider">
          <div className="layout-logo">
            <h1 className="title">template</h1>
          </div>
          <LayoutNavigator
            datasource={NAVIGATOR_DATASOURCE}
            current={currentPath}
            user={user}
          />
        </Sider>
        <Layout>
          <LayoutHeader user={user} />
          <Content className="layout-content">
            <Component />
          </Content>
          <footer className="layout-footer">
            <p>@myfe-bfe template</p>
          </footer>
        </Layout>
      </Layout>
    );
  }
}

const RootView = connect(
  ({ user }) => ({ user }),
)(LayoutView);

export default RootView;
