import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';

import './index.less';

const { SubMenu, ItemGroup } = Menu;

export default class LayoutNavigator extends PureComponent {
  static propTypes = {
    current: PropTypes.string,
    datasource: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string,
      link: PropTypes.string,
      key: PropTypes.string
    })),
  };

  static defaultProps = {
    current: '',
    datasource: [],
  };

  getItem = data => {
    const { current } = this.props;
    if (data) {
      const {
        type = 'item',
        key, title, link,
        icon, available,
      } = data;

      switch (type) {
        case 'submenu':
          return available
            ? (
              <SubMenu key={key} title={this.getSubMenuTitle(data)}>
                {data.children.map(child => this.getItem(child))}
              </SubMenu>
            )
            : null;
        case 'group':
          return (
            <ItemGroup key={key} title={title}>
              {data.children.map(child => this.getItem(child))}
            </ItemGroup>
          );
        default:
          return available
            ? (
              <Menu.Item key={key}>
                {link
                  ? (
                    <Link
                      to={link}
                      onClick={e => {
                        if (link === `/${current}`) {
                          e.preventDefault();
                        }
                      }}
                      href={link}
                    >
                      {this.getIcon(icon)}
                      {title}
                    </Link>
                  )
                  : title
                }
              </Menu.Item>
            )
            : null;
      }
    }

    return null;
  };

  getSubMenuTitle = data => {
    const { title, icon } = data;
    return (
      <span>
        {this.getIcon(icon)}
        <span>{title}</span>
      </span>
    );
  }

  getIcon = icon => {
    if (typeof icon === 'string') {
      return (
        <Icon type={icon} />
      );
    }
    return icon;
  };

  getDatasource = (datasource, current) => {
    const defaultOpenKeys = datasource.map(item => item.key);
    return (
      <Menu
        mode="inline"
        theme="dark"
        inlineCollapsed="false"
        defaultOpenKeys={defaultOpenKeys}
        // openKeys={this.state.openKeys}
        selectedKeys={[current]}
        onOpenChange={this.onOpenChange}
      >
        {datasource.map(item => this.getItem(item))}
      </Menu>
    );
  }

  render() {
    const { datasource, current } = this.props;

    return (
      this.getDatasource(datasource, current)
    );
  }
}
