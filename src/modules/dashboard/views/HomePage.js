import React, { Component } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Icon } from 'antd';
import { SGButton } from 'SinoGear';
import { auth } from '../../../utils/auth';
import styles from './HomePage.less';
import defaultLogo from './../../../resources/svg/logo_SinoGear4.svg';

@connect((state) => ({
  currentUser: state.global.currentUser
}))
class HomePage extends Component {
  logout = () => {
    this.props.dispatch({ type: 'login/logout' });
  };

  render() {
    const { currentUser } = this.props;
    return (
      <div style={{ minHeight: 500, height: '60%', margin: '24px 24px 0' }}>
        <div className={styles.login_info}>
          <div className={styles.login_crumb}>
            <a>首页</a>
          </div>
          <div className={styles.login_detail}>
            <div className={styles.login_avatar}>
              <img src={currentUser.userAvatarUrl} key={currentUser.userAvatarKey} alt="" />
            </div>
            <div className={styles.login_content}>
              <div className={styles.content_title}>欢迎您，{auth.isLogin() ? currentUser.username : '游客'}！</div>
              <div>某某某事业群－某某平台部－某某技术部－UED</div>
            </div>
          </div>
        </div>
        <div>
          <Row gutter={24}>
            <Col xl={14} lg={24} md={24} sm={24} xs={24} style={{ marginTop: '24px' }}>
              <Card bordered={false}>
                <div className={styles.intro}>
                  <div className={styles.intro_header}>
                    <div className={styles.intro_title}>基本介绍</div>
                    <div className={styles.intro_body}>
                      <Row gutter={24}>
                        <Col xl={10} lg={24} md={24} sm={24} xs={24}>
                          <div className={styles.media_left}>
                            <img alt="" src={defaultLogo} />
                          </div>
                        </Col>
                        <Col xl={14} lg={24} md={24} sm={24} xs={24}>
                          <div className={styles.media_title}>赛姬开发框架</div>
                          <div className={styles.media_content}>
                            <ul>
                              <li>
                                赛姬框架是基于React的开发框架，使用组件化的开发模式，为项目开发提供便捷的开发体验。
                              </li>
                              <li>
                                赛姬框架紧贴业务特性，涵盖了大量的常用组件和基础功能，最大程度上帮助开发者节省时间成本。
                              </li>
                              <li>本项目为赛姬框架的展示，为用户提供直观的使用体验。</li>
                            </ul>
                          </div>
                          <div className={styles.media_entry}>
                            <SGButton className={styles.media_button} type="primary">
                              返回官网
                            </SGButton>
                            <SGButton className={styles.media_button} type="primary">
                              <a href="http://192.168.14.47:8007/#/components">开发文档</a>
                            </SGButton>
                            <SGButton className={styles.media_button} type="primary">
                              问题咨询
                            </SGButton>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </div>
              </Card>
            </Col>
            <Col xl={10} lg={24} md={24} sm={24} xs={24} style={{ marginTop: '24px' }}>
              <Card bordered={false}>
                <div className={styles.meta}>
                  <div className={styles.meta_header}>
                    <div className={styles.meta_title}>版本信息</div>
                  </div>
                  <div className={styles.timeline}>
                    <ul className={styles.timeline_ul}>
                      <li>
                        2018-01-31
                        <a>SinoGear v0.11.9 发布</a>
                      </li>
                      <li>
                        2017-11-15
                        <a>SinoGear v0.11.0 发布</a>
                      </li>
                      <li>
                        2017-10-26
                        <a>SinoGear v0.8.1 发布</a>
                      </li>
                      <li>
                        2017-09-10
                        <a>SinoGear v0.7.1 发布</a>
                      </li>
                      <li>
                        2017-00-00
                        <a>SinoGear v0.1.0 发布</a>
                      </li>
                      <li>
                        2017-00-00
                        <a>SinoGear v0.0.1 发布</a>
                      </li>
                      <li>
                        2017-00-00
                        <a>SinoGear 正式立项</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
        <div className={styles.intro_container}>
          <Row gutter={24} style={{ marginBottom: '24px' }}>
            <Col span={8}>
              <Card style={{ width: '100%', textAlign: 'center' }}>
                <Icon type="code-o" style={{ fontSize: '40px', color: '#fa7a7a', marginBottom: '10px' }} />
                <p>示例模块</p>
                <span>完整的增删改查模块示例</span>
              </Card>
            </Col>
            <Col span={8}>
              <Card style={{ width: '100%', textAlign: 'center' }}>
                <Icon type="area-chart" style={{ fontSize: '40px', color: '#77d6e1', marginBottom: '10px' }} />
                <p>图表页</p>
                <span>多种类型的数据图表展示</span>
              </Card>
            </Col>
            <Col span={8}>
              <Card style={{ width: '100%', textAlign: 'center' }}>
                <Icon type="form" style={{ fontSize: '40px', color: '#5cd29d', marginBottom: '10px' }} />
                <p>表单页</p>
                <span>基础表单页示例</span>
              </Card>
            </Col>
          </Row>
          <Row gutter={24} style={{ marginBottom: '24px' }}>
            <Col span={8}>
              <Card style={{ width: '100%', textAlign: 'center' }}>
                <Icon type="table" style={{ fontSize: '40px', color: '#f4b066', marginBottom: '10px' }} />
                <p>列表页</p>
                <span>标准、表格、卡片、文章等列表类型展示页面</span>
              </Card>
            </Col>
            <Col span={8}>
              <Card style={{ width: '100%', textAlign: 'center' }}>
                <Icon type="profile" style={{ fontSize: '40px', color: '#5cd29d', marginBottom: '10px' }} />
                <p>详情页</p>
                <span>事件详情与流程页面</span>
              </Card>
            </Col>
            <Col span={8}>
              <Card style={{ width: '100%', textAlign: 'center' }}>
                <Icon type="check-circle-o" style={{ fontSize: '40px', color: '#a58add', marginBottom: '10px' }} />
                <p>结果页</p>
                <span>反馈操作任务的处理结果页面</span>
              </Card>
            </Col>
          </Row>
          <Row gutter={24} style={{ marginBottom: '24px' }}>
            <Col span={8}>
              <Card style={{ width: '100%', textAlign: 'center' }}>
                <Icon type="exception" style={{ fontSize: '40px', color: '#677AE4', marginBottom: '10px' }} />
                <p>异常</p>
                <span>异常提示页面</span>
              </Card>
            </Col>
            <Col span={8}>
              <Card style={{ width: '100%', textAlign: 'center' }}>
                <Icon type="user" style={{ fontSize: '40px', color: '#A17768', marginBottom: '10px' }} />
                <p>账户</p>
                <span>登录、注册页面</span>
              </Card>
            </Col>
            <Col span={8}>
              <Card style={{ width: '100%', textAlign: 'center' }}>
                <Icon type="book" style={{ fontSize: '40px', color: '#a58add', marginBottom: '10px' }} />
                <p>使用文档</p>
                <span>赛姬框架使用文档</span>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default HomePage;
