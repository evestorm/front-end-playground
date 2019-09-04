import { parser, stringify } from '@/code/parser.js'
import { expect } from 'chai'

// 使用 mocha + chai 编写断言

// 常见关系：相等 大于小于 包含不包含
describe('parser方法', () => {
  it('测试 parser 方法是否正确', () => {
    // to.be 全等
    // deep.equal 两对象是否相等（引用空间无所谓）
    expect(parser('name=lance&age=20')).to.be.deep.equal({
      name: 'lance',
      age: '20'
    })
  });
});

describe('stringify 方法', () => {
  it('测试 stringify 方法是否正确', () => {
    expect(stringify({
      name: 'lance',
      age: '20'
    })).to.be.equal('name=lance&age=20')
  });
});