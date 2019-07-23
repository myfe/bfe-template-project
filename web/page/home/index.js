import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { withRouter } from 'dva/router';
import {
  Layout, Button, Card, Input, Icon, Checkbox, List, message
} from 'antd';
import * as appHelper from '../../util/appHelper.js';
import * as homeMeta from '../../model/home.meta';
import './index.less';

const { Content } = Layout;

class IndexPage extends React.Component {
  static propTypes = {
    home: PropTypes.shape({}).isRequired,
  };

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      name: 'to bfe-template',
      input: '',
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.onAddItem = this.onAddItem.bind(this);
    this.goToPageDoc = this.goToPageDoc.bind(this);
  }

  componentWillMount() {
    homeMeta.dispatchAction(homeMeta.ACTION_TYPES.fetchEnv, {});
  }

  onRefreshEnv() {
    homeMeta.dispatchAction(homeMeta.ACTION_TYPES.fetchEnv, {});
  }

  onInputChange(e) {
    this.setState({
      input: e.target.value
    });
  }

  onAddItem() {
    const { home } = this.props;
    const { input } = this.state;
    let isDuplicate = false;
    home.get('todoList').map(item => {
      if (input === item.get('content')) {
        isDuplicate = true;
      }
      return item;
    });
    if (isDuplicate) {
      message.info('已经存在相同内容');
      return false;
    }
    this.setState({
      input: '',
    });
    return homeMeta.dispatchAction(homeMeta.ACTION_TYPES.add, { checked: false, content: input });
  }

  onDeleteItem(content) {
    return homeMeta.dispatchAction(homeMeta.ACTION_TYPES.delete, { content });
  }

  onCheckItem(e, content) {
    const { checked } = e.target;
    return homeMeta.dispatchAction(homeMeta.ACTION_TYPES.update, { checked, content });
  }

  goToPageDoc() {
    this.props.history.push('/doc');
  }

  render() {
    const { name, input } = this.state;
    const { home } = this.props;
    return (
      <Layout>
        <Content>
          <div className="welcome" />
          <h1>
            Welcome&nbsp;
            <span>{ name }</span>
            !
          </h1>
          <p>
            To get started, edit&nbsp;
            <code>web/page/home/home.js</code>
            &nbsp;and save to reload.
            <Button type="link" onClick={this.goToPageDoc}> 查看具体开发文档 </Button>
          </p>

          <div className="demoBox">
            <h3>下面是一段dva的代码示例：</h3>
            <Card
              title="获取一个随机env字符串示例"
              extra={
                <Button type="link" onClick={this.onRefreshEnv}> 刷新 </Button>
              }
            >
              环境：
              { home.get('env') }
            </Card>
            <Card
              title="todo-list示例"
            >
              <List>
                {
                  home.get('todoList').map(item => (
                    <List.Item>
                      <Checkbox
                        value={item.get('content')}
                        checked={item.get('checked')}
                        onChange={e => this.onCheckItem(e, item.get('content'))}
                      >
                        {item.get('content')}
                      </Checkbox>
                      <Button
                        type="default"
                        size="small"
                        shape="circle"
                        icon="minus"
                        onClick={() => this.onDeleteItem(item.get('content'))}
                      />
                    </List.Item>
                  ))
                }
              </List>
              <Input
                value={input}
                allowClear
                addonAfter={
                  <Icon type="plus" onClick={this.onAddItem} />
                }
                onChange={this.onInputChange}
              />
            </Card>
          </div>
        </Content>
      </Layout>
    );
  }
}

appHelper.registerModel(require('../../model/home').default);

const PageHome = withRouter(connect(
  ({ home }) => ({ home }),
)(IndexPage));

export default PageHome;
