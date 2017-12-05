const expect = require('expect')
const {isRealString} = require('./validation');

describe('isRealString', () => {
  it('should reject a none-string value', () => {
    let validation = isRealString(90)
    expect(validation).toBe(false)
  });
  it('should reject values that are space only', () => {
    let validation = isRealString('   ')
    expect(validation).toBe(false)
  });
  it('should allow values that contain characters', () => {
    let text = '  test  ';
    let validation = isRealString(text)
    expect(validation).toBe(true)
  });
})
