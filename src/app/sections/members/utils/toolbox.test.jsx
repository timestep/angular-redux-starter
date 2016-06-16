/* eslint no-undefined:0 */
import {
  inchesToFeet,
  parseFEV1Digits,
  scrubObj
} from './toolbox.jsx';
import {expect} from 'chai';

let dirtyObj = {
  a: '1',
  e: NaN,
  gender: 'female',
  l: 90,
  q: null,
  x: undefined
};

describe('toolbox', () => {
  it('scrubObj', () => {
    const cleanObj = scrubObj(dirtyObj);
    expect(cleanObj).to.not.have.all.keys('x', 'q', 'e', 'l', 'a');
    expect(cleanObj).to.have.keys('l', 'a', 'gender');
    expect(cleanObj.l).to.eql(90);
    expect(cleanObj.a).to.eql('1');
    expect(cleanObj.x).to.eql(undefined);
    expect(cleanObj.q).to.eql(undefined);
    expect(cleanObj.q).to.not.eql(null);
    expect(cleanObj.e).to.eql(undefined);
    expect(cleanObj.e).to.not.eql(NaN);
    expect(cleanObj.gender).to.eql('female');
  });

  describe('inchesToFeet', () => {
    it('should pass with input 0', () => {
      const feetInchObj = inchesToFeet(0);
      expect(feetInchObj).to.have.keys('feet', 'inches');
      expect(feetInchObj.feet).to.eql(0);
      expect(feetInchObj.inches).to.eql(0);
    });
    it('should pass with input 10', () => {
      const feetInchObj = inchesToFeet(10);
      expect(feetInchObj).to.have.keys('feet', 'inches');
      expect(feetInchObj.feet).to.eql(0);
      expect(feetInchObj.inches).to.eql(10);
    });
    it('should pass with input 120', () => {
      const feetInchObj = inchesToFeet(120);
      expect(feetInchObj).to.have.keys('feet', 'inches');
      expect(feetInchObj.feet).to.eql(10);
      expect(feetInchObj.inches).to.eql(0);
    });
    it('should pass with input 122', () => {
      const feetInchObj = inchesToFeet(122);
      expect(feetInchObj).to.have.keys('feet', 'inches');
      expect(feetInchObj.feet).to.eql(10);
      expect(feetInchObj.inches).to.eql(2);
    });

    it('should pass with string input 122', () => {
      const feetInchObj = inchesToFeet('122');
      expect(feetInchObj).to.have.keys('feet', 'inches');
      expect(feetInchObj.feet).to.eql(10);
      expect(feetInchObj.inches).to.eql(2);
    });
  });

  describe('parseFEV1Digits', () => {
    it('should succesfully parse 2.43', () => {
      const mockFev1 = '2.43';
      const actualFev1 = parseFEV1Digits(mockFev1);
      expect(actualFev1[0]).to.eql('2');
      expect(actualFev1[1]).to.eql('4');
      expect(actualFev1[2]).to.eql('3');
    });
    it('should succesfully parse 2.4', () => {
      const mockFev1 = '2.4';
      const actualFev1 = parseFEV1Digits(mockFev1);
      expect(actualFev1[0]).to.eql('2');
      expect(actualFev1[1]).to.eql('4');
      expect(actualFev1[2]).to.eql('0');
    });
    it('should succesfully parse 2.40', () => {
      const mockFev1 = '2.40';
      const actualFev1 = parseFEV1Digits(mockFev1);
      expect(actualFev1[0]).to.eql('2');
      expect(actualFev1[1]).to.eql('4');
      expect(actualFev1[2]).to.eql('0');
    });
    it('should succesfully parse 10.42', () => {
      const mockFev1 = '10.42';
      const actualFev1 = parseFEV1Digits(mockFev1);
      expect(actualFev1[0]).to.eql('10');
      expect(actualFev1[1]).to.eql('4');
      expect(actualFev1[2]).to.eql('2');
    });
    it('should succesfully parse 0.42', () => {
      const mockFev1 = '0.42';
      const actualFev1 = parseFEV1Digits(mockFev1);
      expect(actualFev1[0]).to.eql('0');
      expect(actualFev1[1]).to.eql('4');
      expect(actualFev1[2]).to.eql('2');
    });
    it('should succesfully parse 0', () => {
      const mockFev1 = '0';
      const actualFev1 = parseFEV1Digits(mockFev1);
      expect(actualFev1[0]).to.eql('0');
      expect(actualFev1[1]).to.eql('0');
      expect(actualFev1[2]).to.eql('0');
    });
    it('should succesfully parse ""', () => {
      const mockFev1 = '';
      const actualFev1 = parseFEV1Digits(mockFev1);
      expect(actualFev1[0]).to.eql('0');
      expect(actualFev1[1]).to.eql('0');
      expect(actualFev1[2]).to.eql('0');
    });
    it('should succesfully parse null', () => {
      const mockFev1 = null;
      const actualFev1 = parseFEV1Digits(mockFev1);
      expect(actualFev1[0]).to.eql('0');
      expect(actualFev1[1]).to.eql('0');
      expect(actualFev1[2]).to.eql('0');
    });
    it('should succesfully parse undefined', () => {
      const mockFev1 = undefined;
      const actualFev1 = parseFEV1Digits(mockFev1);
      expect(actualFev1[0]).to.eql('0');
      expect(actualFev1[1]).to.eql('0');
      expect(actualFev1[2]).to.eql('0');
    });
    it('should succesfully parse 123123', () => {
      const mockFev1 = 123123;
      const actualFev1 = parseFEV1Digits(mockFev1);
      expect(actualFev1[0]).to.eql('123123');
      expect(actualFev1[1]).to.eql('0');
      expect(actualFev1[2]).to.eql('0');
    });
    it('should succesfully parse 1232.32', () => {
      const mockFev1 = 10.32;
      const actualFev1 = parseFEV1Digits(mockFev1);
      expect(actualFev1[0]).to.eql('10');
      expect(actualFev1[1]).to.eql('3');
      expect(actualFev1[2]).to.eql('2');
    });
    it('should succesfully parse 10', () => {
      const mockFev1 = 10;
      const actualFev1 = parseFEV1Digits(mockFev1);
      expect(actualFev1[0]).to.eql('10');
      expect(actualFev1[1]).to.eql('0');
      expect(actualFev1[2]).to.eql('0');
    });
    it('should succesfully parse "10"', () => {
      const mockFev1 = '10';
      const actualFev1 = parseFEV1Digits(mockFev1);
      expect(actualFev1[0]).to.eql('10');
      expect(actualFev1[1]).to.eql('0');
      expect(actualFev1[2]).to.eql('0');
    });
    it('should succesfully parse "4"', () => {
      const mockFev1 = '4';
      const actualFev1 = parseFEV1Digits(mockFev1);
      expect(actualFev1[0]).to.eql('4');
      expect(actualFev1[1]).to.eql('0');
      expect(actualFev1[2]).to.eql('0');
    });
  });

});
