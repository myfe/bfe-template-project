/**
 * 侧边栏配置
 */
export const NAVIGATOR_DATASOURCE = [
  {
    key: 'home',
    title: '首页',
    icon: 'home',
    available: true,
    link: '/home',
  },
  {
    key: 'order',
    title: '菜单1',
    icon: 'transaction',
    link: '/order',
    available: true,
    fullPath: true,
  }
];

/**
 * 面包屑配置
 */
export const BREAD_CRUMB_MAP = {
  home: '首页',
  order: '订阅',
};

export default {
  NAVIGATOR_DATASOURCE,
  BREAD_CRUMB_MAP
};
