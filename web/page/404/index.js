import React from 'react';
import { connect } from 'dva';

function Page404() {
  return (
    <div>404 not found</div>
  );
}

Page404.propTypes = {
};

export default connect()(Page404);
