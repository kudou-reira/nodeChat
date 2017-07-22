const expect = require('expect');
const {isRealString} = require('./validation');

describe('isRealString', () => {
    it('should reject non-string values', () => {
        var rand = 1;
        var testString = isRealString(1);
        
        expect(testString).toBe(false);
    });
    
    it('should reject strings with only spaces', () => {
        var rand = '    ';
        var testString = isRealString(rand);
        
        expect(testString).toBe(false);
    });
    
    it('should allow strings with non-space characters', () => {
        var rand = '  212hi  ';
        var testString = isRealString(rand);
        
        expect(testString).toBe(true);
    });
});