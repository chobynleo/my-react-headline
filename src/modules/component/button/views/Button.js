import React, { PureComponent } from 'react';
import { Card, Row, Col, Button, Menu, Dropdown, Icon } from 'antd';

import styles from './Button.less';

const ButtonGroup = Button.Group;

class ButtonDemo extends PureComponent {
  handleMenuClick = (e) => {
    console.log('click', e);
  };

  render() {
    const menu = (
      <Menu onClick={this.handleMenuClick}>
        <Menu.Item key="1">1st item</Menu.Item>
        <Menu.Item key="2">2nd item</Menu.Item>
        <Menu.Item key="3">3rd item</Menu.Item>
      </Menu>
    );

    return (
      <Card title="全局" className={styles['sg-form_card']}>
        <div>
          <h4 style={{ fontWeight: 'bold' }}>默认</h4>
          <p>可以使用任何可用的按钮类来快速创建按钮，我们提供了自定义不同样式来适应不同的应用场景。</p>
        </div>
        <Row>
          <Col span={4}>
            <Button type="primary" className={styles['button-width']}>
              primary
            </Button>
            <Row>
              <div className={styles.interval} />
              <Col span={4}>
                <div className={`${styles['button-describe']} ant-btn-primary`} />
              </Col>
              <Col span={10}>普通primary</Col>
            </Row>
            <Row>
              <div className={styles.interval} />
              <Col span={4}>
                <div className={`${styles['button-describe']} ant-btn-primary`} />
              </Col>
              <Col span={10}>鼠标悬停 primary</Col>
            </Row>
            <Row>
              <div className={styles.interval} />
              <Col span={4}>
                <div className={`${styles['button-describe']} ant-btn-primary`} />
              </Col>
              <Col span={10}>激活 primary</Col>
            </Row>
          </Col>
          <Col span={4}>
            <Button type="dashed" className={styles['button-width']}>
              dashed
            </Button>
            <Row>
              <div className={styles.interval} />
              <Col span={4}>
                <div className={styles['button-describe']} style={{ background: '#e4eaec' }} />
              </Col>
              <Col span={10}>普通 dashed</Col>
            </Row>
            <Row>
              <div className={styles.interval} />
              <Col span={4}>
                <div className={styles['button-describe']} style={{ background: '#e4eaec' }} />
              </Col>
              <Col span={10}>鼠标悬停 dashed</Col>
            </Row>
            <Row>
              <div className={styles.interval} />
              <Col span={4}>
                <div className={styles['button-describe']} style={{ background: '#e4eaec', borderColor: '#e4eaec' }} />
              </Col>
              <Col span={10}>激活 dashed</Col>
            </Row>
          </Col>
          <Col span={4}>
            <Button type="danger" className={styles['button-width']}>
              danger
            </Button>
            <Row>
              <div className={styles.interval} />
              <Col span={4}>
                <div className={styles['button-describe']} style={{ background: '#f5f5f5' }} />
              </Col>
              <Col span={10}>普通 #f5f5f5</Col>
            </Row>
            <Row>
              <div className={styles.interval} />
              <Col span={4}>
                <div className={styles['button-describe']} style={{ background: '#ff4d4f' }} />
              </Col>
              <Col span={10}>鼠标悬停 #ff4d4f</Col>
            </Row>
            <Row>
              <div className={styles.interval} />
              <Col span={4}>
                <div className={styles['button-describe']} style={{ background: '#ff4d4f' }} />
              </Col>
              <Col span={10}>激活 #ff4d4f</Col>
            </Row>
          </Col>
          <Col span={4}>
            <Button className={styles['button-warning']}>Warning</Button>
            <Row>
              <div className={styles.interval} />
              <Col span={4}>
                <div className={styles['button-describe']} style={{ background: '#f2a654' }} />
              </Col>
              <Col span={10}>普通 #f2a654</Col>
            </Row>
            <Row>
              <div className={styles.interval} />
              <Col span={4}>
                <div className={styles['button-describe']} style={{ background: '#f4b066' }} />
              </Col>
              <Col span={10}>鼠标悬停 #f4b066</Col>
            </Row>
            <Row>
              <div className={styles.interval} />
              <Col span={4}>
                <div className={styles['button-describe']} style={{ background: '#e79857' }} />
              </Col>
              <Col span={10}>激活 #e79857</Col>
            </Row>
          </Col>
          <Col span={4}>
            <Button className={styles['button-info']}>Info</Button>
            <Row>
              <div className={styles.interval} />
              <Col span={4}>
                <div className={styles['button-describe']} style={{ background: '#57c7d4' }} />
              </Col>
              <Col span={10}>普通 #57c7d4</Col>
            </Row>
            <Row>
              <div className={styles.interval} />
              <Col span={4}>
                <div className={styles['button-describe']} style={{ background: '#77d6e1' }} />
              </Col>
              <Col span={10}>鼠标悬停 #77d6e1</Col>
            </Row>
            <Row>
              <div className={styles.interval} />
              <Col span={4}>
                <div className={styles['button-describe']} style={{ background: '#47b8c6' }} />
              </Col>
              <Col span={10}>激活 #47b8c6</Col>
            </Row>
          </Col>
          <Col span={4}>
            <Button className={styles['button-success']}>Success</Button>
            <Row>
              <div className={styles.interval} />
              <Col span={4}>
                <div className={styles['button-describe']} style={{ background: '#46be8a' }} />
              </Col>
              <Col span={10}>普通 #46be8a</Col>
            </Row>
            <Row>
              <div className={styles.interval} />
              <Col span={4}>
                <div className={styles['button-describe']} style={{ background: '#5cd29d' }} />
              </Col>
              <Col span={10}>鼠标悬停 #5cd29d</Col>
            </Row>
            <Row>
              <div className={styles.interval} />
              <Col span={4}>
                <div className={styles['button-describe']} style={{ background: '#36ab7a' }} />
              </Col>
              <Col span={10}>激活 #36ab7a</Col>
            </Row>
          </Col>
        </Row>
        <br />
        <Row>
          <Col span={10}>
            <h4>幽灵按钮</h4>
            <p>通过添加ghost属性来实现描边效果</p>
            <div className={styles['ghost-bg']}>
              <Button type="primary" ghost style={{ marginRight: '15px' }}>
                Primary
              </Button>
              <Button ghost style={{ marginRight: '15px' }}>
                Default
              </Button>
              <Button type="dashed" ghost style={{ marginRight: '15px' }}>
                Dashed
              </Button>
              <Button type="danger" ghost>
                {' '}
                danger{' '}
              </Button>
            </div>
          </Col>
          <Col span={10} style={{ marginLeft: '15px' }}>
            <h4>圆角按钮</h4>
            <p>圆形按钮与方形按钮可以用来区分不同的行为或风格。</p>
            <Col span={15}>
              <Button type="primary" size="large">
                大
              </Button>
              <br />
              <br />
              <Button type="primary">中</Button>
              <br />
              <br />
              <Button type="primary" size="small">
                小
              </Button>
            </Col>
            <Col span={5}>
              <Button type="primary" size="large" shape="circle">
                大
              </Button>
              <br />
              <br />
              <Button type="primary" shape="circle">
                中
              </Button>
              <br />
              <br />
              <Button type="primary" size="small" shape="circle">
                小
              </Button>
            </Col>
          </Col>
          <br />
        </Row>
        <br />
        <Row>
          <Col span={10}>
            <h4>大小</h4>
            <p>按钮完美支持响应式设计，其尺寸可根据开发者的需求自由变化</p>
            <Button type="primary" size="large" style={{ marginRight: '30px' }}>
              大按钮
            </Button>
            <Button type="primary" style={{ marginRight: '30px' }}>
              默认按钮
            </Button>
            <Button type="primary" size="small">
              小按钮
            </Button>
          </Col>
          <Col span={10}>
            <h4>按钮组合</h4>
            <p>可以将多个 Button 放入 Button.Group 的容器中</p>
            <ButtonGroup>
              <Button>L</Button>
              <Button>M</Button>
              <Button>R</Button>
            </ButtonGroup>
          </Col>
        </Row>
        <br />
        <Row>
          <Col span={10}>
            <h4>加载状态</h4>
            <p>添加 loading 属性即可让按钮处于加载状态，最后两个按钮演示点击后进入加载状态。</p>
            <Button type="primary" loading style={{ marginRight: '30px' }}>
              Loading
            </Button>
            <Button shape="circle" loading style={{ marginRight: '30px' }} />
            <Button type="primary" shape="circle" loading />
          </Col>
          <Col span={11}>
            <h4>带图标的按钮</h4>
            <p>带图标的按钮示例</p>
            <Button
              type="primary"
              icon="like"
              className={styles['button-warning']}
              style={{ width: 'auto', marginRight: '30px' }}>
              喜欢
            </Button>
            <Button
              type="primary"
              icon="check"
              className={styles['button-success']}
              style={{ width: 'auto', marginRight: '30px' }}>
              成功
            </Button>
            <Button type="primary" icon="upload">
              上传
            </Button>
          </Col>
        </Row>
        <br />
        <Row>
          <Col span={10}>
            <h4>图片按钮</h4>
            <p>按钮中仅包含图标。</p>
            <Button shape="circle" icon="search" style={{ marginRight: '30px' }} />
            <Button icon="car" shape="circle" style={{ marginRight: '30px', background: '#46be8a' }} />
            <Button icon="shake" shape="circle" style={{ marginRight: '30px', background: '#f96868' }} />
            <Button icon="shop" shape="circle" style={{ marginRight: '30px', background: '#526069' }} />
            <Button icon="smile" shape="circle" style={{ marginRight: '30px', background: '#46be8a' }} />
            <div style={{ marginTop: '10px' }}>
              <Button icon="cloud" style={{ marginRight: '30px', background: '#f96868' }} />
              <Button icon="mobile" style={{ marginRight: '30px', background: '#57c7d4' }} />
              <Button icon="heart" style={{ marginRight: '30px', background: '#46be8a' }} />
              <Button icon="gift" style={{ marginRight: '30px', background: '#f96868' }} />
              <Button icon="trophy" />
            </div>
          </Col>
          <Col span={11}>
            <h4>社交图标</h4>
            <p>常见社交媒体图标示例</p>
            <Button icon="wechat" style={{ marginRight: '30px', background: '#51c332', color: '#fff' }} />
            <Button icon="qq" style={{ marginRight: '30px', background: '#43c6f7', color: '#fff' }} />
            <Button icon="weibo-circle" style={{ marginRight: '30px', background: '#e6624b', color: '#fff' }} />
            <Button icon="alipay-circle" style={{ marginRight: '30px', background: '#43c6f7', color: '#fff' }} />
            <Button icon="linkedin" style={{ background: '#0976b4', color: '#fff' }} />
          </Col>
        </Row>
        <br />
        <Row>
          <Col span={10}>
            <h4>嵌套按钮组</h4>
            <p>把下拉菜单混合到一系列按钮中</p>
            <Button type="primary">primary</Button>
            <Button>secondary</Button>
            <Dropdown overlay={menu}>
              <Button>
                Actions <Icon type="down" />
              </Button>
            </Dropdown>
          </Col>
          <Col span={11}>
            <h4>不可用状态</h4>
            <p>添加 disabled 属性即可让按钮处于不可用状态，同时按钮样式也会改变</p>
            <Button disabled>Ghost(disabled)</Button>
            <br />
            <br />
            <Button type="dashed" disabled>
              Dashed(disabled)
            </Button>
          </Col>
        </Row>
      </Card>
    );
  }
}

export default ButtonDemo;
