import React from 'react';
import {
  Layout, Tree, Timeline
} from 'antd';
import './index.less';

const { Content } = Layout;
const { TreeNode, DirectoryTree } = Tree;

const PageDoc = () => (
  <Layout>
    <Content>
      <h1>
        骨架项目使用文档
      </h1>
      <div className="contentBox">
        <h3>
          项目介绍
        </h3>
        <Timeline>
          <Timeline.Item>
            项目整体属于前后端分离结构。前端使用react + dva。后端使用egg。
          </Timeline.Item>
          <Timeline.Item>
            app目录是egg的全部代码。config下是各个环境的配置文件以及egg的插件等配置。web目录下是前端项目。具体目录结构如下：
            <DirectoryTree multiple>
              <TreeNode title="app" key="0-0">
                <TreeNode title="controller" key="0-0-0" />
                <TreeNode title="middleware" key="0-0-1" />
                <TreeNode title="public" key="0-0-2" />
                <TreeNode title="router.js" key="0-0-3" isLeaf />
              </TreeNode>
              <TreeNode title="config" key="0-1">
                <TreeNode title="config.default.js" key="0-1-0" isLeaf />
                <TreeNode title="plugin.js" key="0-1-1" isLeaf />
              </TreeNode>
              <TreeNode title="web" key="0-2">
                <TreeNode title="asset" key="0-2-0">
                  <TreeNode title="css" key="0-2-0-0" />
                  <TreeNode title="img" key="0-2-0-1" />
                </TreeNode>
                <TreeNode title="component" key="0-2-1" />
                <TreeNode title="model" key="0-2-2" />
                <TreeNode title="page" key="0-2-3">
                  <TreeNode title="home" key="0-2-3-0">
                    <TreeNode title="index.js" key="0-2-3-0-0" />
                    <TreeNode title="indes.less" key="0-2-3-0-1" />
                  </TreeNode>
                  <TreeNode title="doc" key="0-2-3-1" />
                  <TreeNode title="404" key="0-2-3-2" />
                </TreeNode>
                <TreeNode title="service" key="0-2-4" />
                <TreeNode title="util" key="0-2-5" />
                <TreeNode title="index.html" key="0-2-6" isLeaf />
                <TreeNode title="index.js" key="0-2-7" isLeaf />
                <TreeNode title="router.js" key="0-2-8" isLeaf />
              </TreeNode>
            </DirectoryTree>
          </Timeline.Item>
        </Timeline>
      </div>
      <div className="contentBox">
        <h3>
          SPA里添加页面和model
        </h3>
        <Timeline>
          <Timeline.Item>
            在web/page目录下添加页面文件夹
          </Timeline.Item>
          <Timeline.Item>
            在web/model目录下添加model文件和model的配置文件（.meta）
          </Timeline.Item>
        </Timeline>
      </div>
      <div className="contentBox">
        <h3>
          改造成多系统（多页）应用
        </h3>
        <Timeline>
          <Timeline.Item>
            修改webpack.config.js中的获取entry的一行：const entries = getEntries('web/**/index.js');
          </Timeline.Item>
          <Timeline.Item>
            修改egg路由。app/router.js。添加相应路由以及相应controller。
          </Timeline.Item>
          <Timeline.Item>
            改造web目录。变成如下结构:
            <DirectoryTree multiple>
              <TreeNode title="web" key="1-0">
                <TreeNode title="demo1" key="1-0-0">
                  <TreeNode title="asset" key="1-0-0-0">
                    <TreeNode title="css" key="1-0-0-0-0" />
                    <TreeNode title="img" key="1-0-0-0-1" />
                  </TreeNode>
                  <TreeNode title="component" key="1-0-0-1" />
                  <TreeNode title="model" key="1-0-0-2" />
                  <TreeNode title="page" key="1-0-0-3">
                    <TreeNode title="home" key="1-0-0-3-0">
                      <TreeNode title="index.js" key="1-0-0-3-0-0" />
                      <TreeNode title="indes.less" key="1-0-0-3-0-1" />
                    </TreeNode>
                    <TreeNode title="doc" key="1-0-0-3-1" />
                    <TreeNode title="404" key="1-0-0-3-2" />
                  </TreeNode>
                  <TreeNode title="service" key="1-0-0-4" />
                  <TreeNode title="util" key="1-0-0-5" />
                  <TreeNode title="index.js" key="1-0-0-7" isLeaf />
                  <TreeNode title="router.js" key="1-0-0-8" isLeaf />
                </TreeNode>
                <TreeNode title="demo2" key="1-0-1">
                  <TreeNode title="asset" key="1-0-1-0">
                    <TreeNode title="css" key="1-0-1-0-0" />
                    <TreeNode title="img" key="1-0-1-0-1" />
                  </TreeNode>
                  <TreeNode title="component" key="1-0-1-1" />
                  <TreeNode title="model" key="1-0-1-2" />
                  <TreeNode title="page" key="1-0-1-3">
                    <TreeNode title="home" key="1-0-1-3-0">
                      <TreeNode title="index.js" key="1-0-1-3-0-0" />
                      <TreeNode title="indes.less" key="1-0-1-3-0-1" />
                    </TreeNode>
                    <TreeNode title="doc" key="1-0-1-3-1" />
                    <TreeNode title="404" key="1-0-1-3-2" />
                  </TreeNode>
                  <TreeNode title="service" key="1-0-1-4" />
                  <TreeNode title="util" key="1-0-1-5" />
                  <TreeNode title="index.js" key="1-0-1-7" isLeaf />
                  <TreeNode title="router.js" key="1-0-1-8" isLeaf />
                </TreeNode>
                <TreeNode title="index.html" key="1-0-3" isLeaf />
              </TreeNode>

            </DirectoryTree>
          </Timeline.Item>
        </Timeline>
      </div>
    </Content>
  </Layout>
);

export default PageDoc;
