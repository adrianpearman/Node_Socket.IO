let expect = require('expect');
let { generateMessage } = require('./message')

describe('generate message' ,() => {
  it('should generate the correct message object', () => {
    let from = 'test'
    let text = 'message'
    let message = generateMessage(from, text)

    expect(message.createdAt).toBeA('number')
    expect(message).toInclude({from, text})
  });
})
