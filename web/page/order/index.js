
import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd';

import './index.less';

class Order extends React.Component {
  static propTypes = {
    data: PropTypes.number,
  }

  static defaultProps = {
    data: ''
  }

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const { data } = this.props;
    return (
      <Card>
        {`${data}123`}
      </Card>
    );
  }
}

export default Order;
