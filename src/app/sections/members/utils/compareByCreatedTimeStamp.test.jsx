import moment from 'moment';
import compareByCreatedTimeStamp from './compareByCreatedTimeStamp.jsx';
import { expect } from 'chai';
import { fromJS } from 'immutable';

const presentTimestamp = fromJS({
  createdTimestamp: moment()
});

const pastTimestamp = fromJS({
  createdTimestamp: moment().subtract(1, 'day')
});

const futureTimestamp = fromJS({
  createdTimestamp: moment().add(1, 'day')
});

const emptyTimestamp = fromJS({});

describe('compareByCreatedTimeStamp', ()=> {

  describe('comparing present date', ()=> {

    describe('ascending order', ()=> {
      it('should return \'-1\' when comparing a present and future date', () => {
        const diff = compareByCreatedTimeStamp(0, presentTimestamp, futureTimestamp);
        expect(diff).to.equal(-1);
      });

      it('should return \'1\' when comparing a present and past date', () => {
        const diff = compareByCreatedTimeStamp(0, presentTimestamp, pastTimestamp);
        expect(diff).to.equal(1);
      });

      it('should return \'1\' when comparing a present and empty date', () => {
        const diff = compareByCreatedTimeStamp(0, presentTimestamp, emptyTimestamp);
        expect(diff).to.equal(1);
      });

      it('should return \'0\' when comparing a present and present date', () => {
        const diff = compareByCreatedTimeStamp(0, presentTimestamp, presentTimestamp);
        expect(diff).to.equal(0);
      });
    });

    describe('descending order', ()=> {
      it('should return \'1\' when comparing a present and future date', () => {
        const diff = compareByCreatedTimeStamp(1, presentTimestamp, futureTimestamp);
        expect(diff).to.equal(1);
      });

      it('should return \'-1\' when comparing a present and past date', () => {
        const diff = compareByCreatedTimeStamp(1, presentTimestamp, pastTimestamp);
        expect(diff).to.equal(-1);
      });

      it('should return \'-1\' when comparing a present and empty date', () => {
        const diff = compareByCreatedTimeStamp(1, presentTimestamp, emptyTimestamp);
        expect(diff).to.equal(-1);
      });

      it('should return \'0\' when comparing a present and present date', () => {
        const diff = compareByCreatedTimeStamp(1, presentTimestamp, presentTimestamp);
        expect(diff).to.equal(0);
      });
    });

  });

  describe('comparing past date', ()=> {

    describe('ascending order', ()=> {
      it('should return \'-1\' when comparing a past and future date', () => {
        const diff = compareByCreatedTimeStamp(0, pastTimestamp, futureTimestamp);
        expect(diff).to.equal(-1);
      });

      it('should return \'0\' when comparing a past and past date', () => {
        const diff = compareByCreatedTimeStamp(0, pastTimestamp, pastTimestamp);
        expect(diff).to.equal(0);
      });

      it('should return \'1\' when comparing a past and empty date', () => {
        const diff = compareByCreatedTimeStamp(0, pastTimestamp, emptyTimestamp);
        expect(diff).to.equal(1);
      });

      it('should return \'-1\' when comparing a past and present date', () => {
        const diff = compareByCreatedTimeStamp(0, pastTimestamp, presentTimestamp);
        expect(diff).to.equal(-1);
      });
    });

    describe('descending order', ()=> {
      it('should return \'1\' when comparing a past and future date', () => {
        const diff = compareByCreatedTimeStamp(1, pastTimestamp, futureTimestamp);
        expect(diff).to.equal(1);
      });

      it('should return \'0\' when comparing a past and past date', () => {
        const diff = compareByCreatedTimeStamp(1, pastTimestamp, pastTimestamp);
        expect(diff).to.equal(0);
      });

      it('should return \'-1\' when comparing a past and empty date', () => {
        const diff = compareByCreatedTimeStamp(1, pastTimestamp, emptyTimestamp);
        expect(diff).to.equal(-1);
      });

      it('should return \'1\' when comparing a past and present date', () => {
        const diff = compareByCreatedTimeStamp(1, pastTimestamp, presentTimestamp);
        expect(diff).to.equal(1);
      });
    });

  });

  describe('comparing future date', ()=> {

    describe('ascending order', ()=> {
      it('should return \'1\' when comparing a future and present date', () => {
        const diff = compareByCreatedTimeStamp(0, futureTimestamp, presentTimestamp);
        expect(diff).to.equal(1);
      });

      it('should return \'1\' when comparing a future and past date', () => {
        const diff = compareByCreatedTimeStamp(0, futureTimestamp, pastTimestamp);
        expect(diff).to.equal(1);
      });

      it('should return \'1\' when comparing a future and empty date', () => {
        const diff = compareByCreatedTimeStamp(0, futureTimestamp, emptyTimestamp);
        expect(diff).to.equal(1);
      });

      it('should return \'0\' when comparing a future and future date', () => {
        const diff = compareByCreatedTimeStamp(0, futureTimestamp, futureTimestamp);
        expect(diff).to.equal(0);
      });
    });

    describe('descending order', ()=> {
      it('should return \'-1\' when comparing a future and present date', () => {
        const diff = compareByCreatedTimeStamp(1, futureTimestamp, presentTimestamp);
        expect(diff).to.equal(-1);
      });

      it('should return \'-1\' when comparing a future and past date', () => {
        const diff = compareByCreatedTimeStamp(1, futureTimestamp, pastTimestamp);
        expect(diff).to.equal(-1);
      });

      it('should return \'-1\' when comparing a future and empty date', () => {
        const diff = compareByCreatedTimeStamp(1, futureTimestamp, emptyTimestamp);
        expect(diff).to.equal(-1);
      });

      it('should return \'0\' when comparing future and future date', () => {
        const diff = compareByCreatedTimeStamp(1, futureTimestamp, futureTimestamp);
        expect(diff).to.equal(0);
      });
    });

  });

  describe('comparing empty date', ()=> {

    describe('ascending order', ()=> {
      it('should return \'1\' when comparing a empty and present date', () => {
        const diff = compareByCreatedTimeStamp(0, emptyTimestamp, presentTimestamp);
        expect(diff).to.equal(1);
      });

      it('should return \'1\' when comparing a empty and past date', () => {
        const diff = compareByCreatedTimeStamp(0, emptyTimestamp, pastTimestamp);
        expect(diff).to.equal(1);
      });

      it('should return \'1\' when comparing a empty and empty date', () => {
        const diff = compareByCreatedTimeStamp(0, emptyTimestamp, emptyTimestamp);
        expect(diff).to.equal(1);
      });

      it('should return \'1\' when comparing a empty and future date', () => {
        const diff = compareByCreatedTimeStamp(0, emptyTimestamp, futureTimestamp);
        expect(diff).to.equal(1);
      });
    });

    describe('descending order', ()=> {
      it('should return \'-1\' when comparing a empty and present date', () => {
        const diff = compareByCreatedTimeStamp(1, emptyTimestamp, presentTimestamp);
        expect(diff).to.equal(-1);
      });

      it('should return \'-1\' when comparing a empty and past date', () => {
        const diff = compareByCreatedTimeStamp(1, emptyTimestamp, pastTimestamp);
        expect(diff).to.equal(-1);
      });

      it('should return \'-1\' when comparing a empty and empty date', () => {
        const diff = compareByCreatedTimeStamp(1, emptyTimestamp, emptyTimestamp);
        expect(diff).to.equal(-1);
      });

      it('should return \'-1\' when comparing empty and future date', () => {
        const diff = compareByCreatedTimeStamp(1, emptyTimestamp, futureTimestamp);
        expect(diff).to.equal(-1);
      });
    });

  });

});
