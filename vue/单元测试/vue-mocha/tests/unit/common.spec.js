import { expect } from 'chai'

describe('测试常用关系', () => {
  it('相等关系', () => {
    expect(1 + 1, '1 + 1 等于 2').to.be.equal(2)
    expect([1, 2, 3], '数组长度为 3').to.be.lengthOf(3)
    expect(true, '某值是否为 true').to.be.true
  });
  it('包含关系', () => {
    expect('lance', '字符串中是否包含"lan"').to.be.contain('lan')
    expect('lance', '字符串中是否包含"lan"（正则匹配）').to.be.match(/lan/)
  });
  it('大于 / 小于', () => {
    expect(5, '数值是否大于4').to.greaterThan(4)
    expect(3, '数值是否小于4').to.lessThan(4)
    expect(9, '数值不大于10').to.be.not.greaterThan(10)
  });
});