let expect = require('expect');
let { generateMessage, generateLocationMessage } = require('./message')

describe('generate message' ,() => {
  it('should generate the correct message object', () => {
    let from = 'test'
    let text = 'message'
    let message = generateMessage(from, text)

    expect(message.createdAt).toBeA('number')
    expect(message).toInclude({from, text})
  });
})

describe('generateLocationMessage' ,() => {
  it('should generate the correct location object', () => {
    let from = 'Admin'
    let latitude = 49
    let longitude = -79
    let url = `https://www.google.com/maps?q=${latitude},${longitude}`
    let message = generateLocationMessage(from, latitude, longitude)

    expect(message.createdAt).toBeA('number')
    expect(message).toInclude({from, url})
  });
})
