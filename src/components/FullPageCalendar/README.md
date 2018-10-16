# 日期（节假日）管理组件 FullPageCalendar

本组件是对组件基于 rc-calendar 封装，虽直接引入了 rc-calendar 的源码，当目前没有对`/rc-calendar`目录下的源码作改动，但为了减少档案体积，删减了
部分没有引用到的文件及目录。
组件样式定义及修改请转到`/rc-calendar/assets`目录，为便于查找和以后升级，有更改的样式作了`// {edit}`标记。

## 何时使用

适用于平铺展示全年日期并设置节假日日期的场景。

## 组件 API

| 参数            | 说明                                               | 类型    | 默认值             |
| :-------------- | :------------------------------------------------- | :------ | :----------------- |
| lunarVisible    | 默认是否展示农历                                   | boolean | true               |
| selectedYear    | 默认展示的年份                                     | number  | now.year()，当前年 |
| fomatter        | 日期格式化格式                                     | string  | 'YYYY-MM-DD'       |
| excludeTypes    | 节假日类型                                         | Array   | -                  |
| showRangeYear   | (切换)年份区间，前后多少年                         | array   | -                  |
| allSelectedDate | 初始化设置日期                                     | object  | -                  |
| allInOneSave    | 单次提交配置                                       | object  | -                  |
| onYearSelect    | 切换年回调，可动态获取年数据                       | object  | -                  |
| onSave          | 提交回调，根据 allInOneSave 配置是单次还是一次提交 | object  | -                  |
| onDel           | 删除回调                                           | object  | -                  |

## 示例代码

```
// 所有例外时间 -- 以类型组织
const allSelectedDate = {
  offday: ['2018-1-1', '2018-6-18', '2018-9-24'],
  reday: ['2018-4-8', '2018-4-28', '2018-9-29', '2018-9-30'],
  yuandan: ['2018-1-1'],
  chunjie: ['2018-2-15', '2018-2-16', '2018-2-17', '2018-2-18', '2018-2-19', '2018-2-20', '2018-2-21'],
  qingming: ['2018-4-5', '2018-4-6', '2018-4-7'],
  laodong: ['2018-4-29', '2018-4-30', '2018-5-1'],
  duanwu: ['2018-6-16', '2018-6-17', '2018-6-18'],
  zhongqiu: ['2018-9-22', '2018-9-23', '2018-9-24'],
  guoqing: ['2018-10-1', '2018-10-2', '2018-10-3', '2018-10-4', '2018-10-5', '2018-10-6', '2018-10-7']
};

const excludeTypeData = [
  {
    label: '调休日',
    value: 'offday',
    badge: true,
    badgeLabel: '休'
  },
  {
    label: '补班日',
    value: 'reday',
    badge: true,
    badgeLabel: '班',
    badgeStyle: {
      backgroundColor: '#4A4A4A'
    }
  },
  {
    label: '节假日',
    value: 'holiday',
    color: 'blue',
    icon: 'smile-o',
    children: [
      { label: '元旦', value: 'yuandan', color: 'blue', icon: 'smile-o' },
      { label: '春节', value: 'chunjie', color: '#FF0080', icon: 'heart-o' },
      { label: '清明', value: 'qingming', color: '#8E8E8E', icon: 'medicine-box' },
      { label: '劳动', value: 'laodong', color: '#7CFC00', icon: 'frown-o' },
      { label: '端午', value: 'duanwu', color: 'blue' },
      { label: '中秋', value: 'zhongqiu', color: '#458B00', icon: 'gift' },
      { label: '国庆', value: 'guoqing', color: '#820041', icon: 'car' }
    ]
  }
];

const fomatter = 'YYYY-MM-DD';


class FullPageCalendarTestPage extends Component {
  onYearSelect = (data) => {
    console.info('调试输出 onYearSelect data:', data);
  };

  onSave = (data) => {
    console.info('调试输出 onSave data:', data);
  };

  onDel = (data) => {
    console.info('调试输出 onDel data:', data);
  };

  render() {
    return (
      <div className={styles.pageContainer}>
        <FullPageCalendar
          lunarVisible
          fomatter={fomatter}
          allSelectedDate={allSelectedDate}
          excludeTypes={excludeTypeData}
          selectedYear={2018}
          showRangeYear={[4, 7]}
          allInOneSave={false}
          onYearSelect={this.onYearSelect}
          onSave={this.onSave}
          onDel={this.onDel}
        />;
      </div>);
  }
}
```

## 更新日志

### （1）2018.7.17 修改记录

- 初次提交，实现基本功能；

### （2）2018.7.25 修改记录

- 修改日期类型，可根据数据源多级展示联动选择，第一级类型少于等于 3 个项时平铺展示，大于 3 项自动切换为下拉选择；
- 新增角标提示类型，可在数据源中配置，可设置角标文字和样式，默认右上角，绿色阴影显示；
- 新增单次选择提交和 allInOne 一次提交配置，可切换提交类型，如配置为单次提交，保存按钮不出现；
- 新增如当某日期被选择为节假日，不显示农历，角标类型除外；
- 界面美化，缩小了月历框和行高；

### （3）2018.7.30 修改记录

- 新增选中年份回调，可动态获取年份数据，参看`onYearSelect`属性；
- 新增重置日期设置，选中已设置的日期后可重置清空操作，触发`onDel`回调；
- 新增动态年份显示，可动态设置显示的区间，参看`showRangeYear`属性；

### （4）2018.8.1 修改记录

- 修改美化切换年工具条样式；
- 修复月历框非本月日期可点击缺陷；
- 调整示例：去掉节假日前图标，缩小角标字体，修改节假日字体颜色；
