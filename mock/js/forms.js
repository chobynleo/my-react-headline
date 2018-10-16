const fetchUrl = '/api/dictForms';
const projectSimpleNameUrl = '/api/dictForms/projectSimpleName';

const translateUrl = '/api/treeDictTranslate';
const initUrl = '/api/getTreeDictRoot';
const expandUrl = '/api/getTreeDictChildNode';

const projectName = [
  { code: '0', detail: 'A项目' },
  { code: '1', detail: 'B项目' },
  { code: '2', detail: 'C项目' },
  { code: '3', detail: 'D项目' },
  { code: '4', detail: 'E项目' },
  { code: '5', detail: 'F项目' },
  { code: '6', detail: 'G项目' },
  { code: '7', detail: 'H项目' },
  { code: '8', detail: 'X项目' },
  { code: '9', detail: 'XX项目' }
];

const projectSimpleName = [
  { code: '0', detail: 'A' },
  { code: '1', detail: 'B' },
  { code: '2', detail: 'C' },
  { code: '3', detail: 'D' },
  { code: '4', detail: 'E' },
  { code: '5', detail: 'F' },
  { code: '6', detail: 'G' },
  { code: '7', detail: 'H' },
  { code: '8', detail: 'X' },
  { code: '9', detail: 'XX' },
  { code: '10', detail: 'XXX' },
  { code: '11', detail: 'XXXXX' }
];

const projectTypes = [
  { code: '06', detail: '开发' },
  { code: '07', detail: '研发' },
  { code: '08', detail: '维护 ' },
  { code: '09', detail: '升级' },
  { code: '10', detail: '二次开发' }
];

const projectAllTypes = [
  { code: '01', detail: '需求' },
  { code: '02', detail: '产品' },
  { code: '03', detail: '测试 ' },
  { code: '04', detail: '回归' },
  { code: '05', detail: '二次开发' },
  { code: '06', detail: '开发' },
  { code: '07', detail: '研发' },
  { code: '08', detail: '维护 ' },
  { code: '09', detail: '升级' },
  { code: '10', detail: '二次开发' }
];

const projectPO = [
  { code: '001', detail: '付晓晓' },
  { code: '002', detail: '周毛毛' },
  { code: '003', detail: '曾帅帅' },
  { code: '004', detail: '赵五' },
  { code: '005', detail: '张三' },
  { code: '006', detail: '李四' }
];

const projectScale = [
  { code: '0001', detail: '大型' },
  { code: '0002', detail: '中性' },
  { code: '0003', detail: '小型' },
  { code: '0004', detail: '合作' },
  { code: '0005', detail: '单独' }
];

const projecBelongs = [
  { label: '研发一部', value: '1', id: '1', pid: '0' },
  { label: 'A组', value: '1-1', id: '1-1', pid: '1' },
  { label: 'B组', value: '1-2', id: '1-2', pid: '1' },
  { label: 'C小组', value: '1-1-1', id: '1-1-1', pid: '1-1', isLeaf: true },
  { label: ' D小组', value: '1-2-1', id: '1-2-1', pid: '1-2', isLeaf: true },
  { label: '开发一部', value: '2', id: '2', pid: '0' },
  { label: '一组', value: '2-1', id: '2-1', pid: '2' },
  { label: '二组', value: '2-2', id: '2-2', pid: '2' },
  { label: '二组1开发小队', value: '2-1-1', id: '2-1-1', pid: '2-1', isLeaf: true },
  { label: ' 二组2开发小队', value: '2-1-1', id: '2-2-1', pid: '2-2', isLeaf: true }
];

const initData = {
  dictItems: [
    {
      code: '440000000000',
      detail: '广东省公安厅',
      parentNode: true,
      disabled: true
    }
  ],
  totalCount: 1
};

const treeDictTranslate = [
  {
    code: '440000000000',
    detail: '广东省公安厅'
  }
];

const TreeDictChildNodebyGD = {
  dictItems: [
    {
      code: '2323',
      detail: '机构名称',
      parentNode: false
    },
    {
      code: '440200000000',
      detail: '珠海市公安局',
      parentNode: false,
      disabled: true
    },
    {
      code: '440100000000',
      detail: '广州市公安局',
      parentNode: true
    },
    {
      code: '440300000000',
      detail: '深圳市公安局',
      parentNode: false
    },
    {
      code: '440600000000',
      detail: '佛山市公安局',
      parentNode: false
    },
    {
      code: '440700000000',
      detail: '江门市公安局',
      parentNode: false
    }
  ],
  totalCount: 6
};

const TreeDictChildNodebyGZ = {
  dictItems: [
    {
      code: '440106000000',
      detail: '广州市天河区分局',
      parentNode: false
    }
  ],
  totalCount: 1
};

const project = {
  projectName,
  projectScale,
  projecBelongs,
  projectTypes,
  projectPO,
  projectAllTypes
};

module.exports = {
  [`GET ${fetchUrl}`](req, res) {
    res.json(project);
  },
  [`POST ${fetchUrl}`](req, res) {
    res.json(project);
  },
  [`GET ${projectSimpleNameUrl}`](req, res) {
    res.json(projectSimpleName);
  },
  [`POST ${projectSimpleNameUrl}`](req, res) {
    const simpleData = {};
    const page = parseInt(req.query.page);
    const pageSize = parseInt(req.query.pageSize);
    simpleData.pagination = {
      page: page,
      pageSize: pageSize,
      total: projectSimpleName.length
    };
    simpleData.data = projectSimpleName.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    res.json(simpleData);
  },

  [`GET ${initUrl}`](req, res) {
    res.json(initData);
  },
  [`POST ${initUrl}`](req, res) {
    res.json(initData);
  },

  [`GET ${translateUrl}`](req, res) {
    res.json(treeDictTranslate);
  },
  [`POST ${translateUrl}`](req, res) {
    res.json(treeDictTranslate);
  },

  [`GET ${expandUrl}`](req, res) {
    if (req.query.nodeId === '440000000000') {
      res.json(TreeDictChildNodebyGD);
    } else if (req.query.nodeId === '440100000000') {
      res.json(TreeDictChildNodebyGZ);
    }
  },
  [`POST ${expandUrl}`](req, res) {
    res.json(treeDictTranslate);
  }
};
