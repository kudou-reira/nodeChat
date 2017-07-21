var expect = require('expect');
var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate the correct message object', () => {
        var from = 'admin';
        var text = 'stuff';
        var message = generateMessage(from, text);
        
        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({
            from: from,
            text: text
        });
    });
});

describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {
        var from = 'admin';
        var longitude = 1;
        var latitude = 1;
        var locationMessage = generateLocationMessage(from, longitude, latitude);
        
        expect(locationMessage.createdAt).toBeA('number');
        
        expect(locationMessage).toInclude({
            from: from,
            url: 'https://www.google.com/maps?q=1,1'
        });
    });
});