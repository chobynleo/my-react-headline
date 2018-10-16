import React, { Component } from 'react';
import { shallow, mount, render } from 'enzyme';
import { SGButton } from 'SinoGear';

//  Jest API:  http://facebook.github.io/jest/docs/en/expect.html
//  Enzyme API:  http://airbnb.io/enzyme/docs/api/index.html

describe('Test 1: element render test', () => {
  const wrapper = shallow(<SGButton />);
  //  测试button元素是否渲染
  it('find button', () => {
    expect(wrapper.find('button').exists()).toBe(true);
  });
  //  测试SGButton中的button元素个数
  it('how many button in SGButton', () => {
    expect(wrapper.find('button')).toHaveLength(1);
  });
});

//  使用jest的mock function功能测试onClick，用于无法取得输出或输出无变化的情况下测试点击行为是否被触发
describe('Test 2: test click', () => {
  //  jest mock function
  const mockFn = jest.fn();
  const wrapper = shallow(<SGButton onClick={mockFn} />);
  it('test button to be called', () => {
    //  使用enzyme的simulate模拟click行为
    wrapper.find('button').simulate('click');
    //  判断jest的mock function是否被触发
    expect(mockFn).toBeCalled();
  });
});

//  测试点击按钮的结果
describe('Test 3: test click result', () => {
  it('should hasClass ant-btn-loading', () => {
    //  构建一个点击按钮后触发loading效果的SGButton
    class DefaultButton extends Component {
      state = {
        loading: false
      };
      enterLoading = () => {
        this.setState({ loading: true });
      };
      render() {
        return <SGButton loading={this.state.loading} onClick={this.enterLoading}>Button</SGButton>;
      }
    }
    const wrapper = mount(
      <DefaultButton />
    );
    wrapper.simulate('click');
    //  测试点击后新增的loading相关className是否存在
    expect(wrapper.hasClass('ant-btn-loading')).toBe(true);
  });
});

//  snapshot快照测试，首次运行测试时生成一份snapshot文件，或通过npm test -- -u 命令重新生成快照文件。
//  后面每次运行测试会在渲染后与生成的snapshots文件中的渲染结果对比。
describe('Test 4: SGButton snapshot', () => {
  it('renders correctly', () => {
    const wrapper = render(
      <SGButton>Follow</SGButton>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
