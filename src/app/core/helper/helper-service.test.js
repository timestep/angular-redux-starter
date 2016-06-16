/*jshint expr:true*/

'use strict';

describe('helper-service', function () {

  beforeEach(module('ka-login'));

  it('should exist', inject(function (helper) {
    expect(helper).to.respondTo('isEmail');
    expect(helper).to.respondTo('emailToUserName');
    expect(helper).to.respondTo('checkRole');
    expect(helper.statesAndProvinceList).to.be.array;
  }));

  it('isEmail() should return true if email', inject(function (helper) {
    expect(helper.isEmail('andrew@rangle.io')).to.be.true;
    expect(helper.isEmail('firstname.lastname@rangle.io')).to.be.true;
    expect(helper.isEmail('username@on.ca')).to.be.true;
    expect(helper.isEmail('angular@money.biz')).to.be.true;
  }));

  it('isEmail() should return false if not email', inject(function (helper) {
    expect(helper.isEmail('andrewrangle.io')).to.be.false;
    expect(helper.isEmail('firstname.lastname@rangle.')).to.be.false;
    expect(helper.isEmail('username')).to.be.false;
    expect(helper.isEmail('!@#$%angular@face.com')).to.be.false;
  }));

  it('isComplexPassword() should return true if password meets criteria', inject(function (helper) {
    expect(helper.isComplexPassword('andr3wXx')).to.be.true;
    expect(helper.isComplexPassword(')(*&?%Tr')).to.be.true;
    expect(helper.isComplexPassword('RubberS0cks')).to.be.true;
    expect(helper.isComplexPassword('ANGULAr+')).to.be.true;
  }));

  it('isComplexPassword() should return false if password does not satisfy criteria', inject(function (helper) {
    expect(helper.isComplexPassword('Andr3w')).to.be.false;
    expect(helper.isComplexPassword('noDigitOrSpecialCharacter')).to.be.false;
    expect(helper.isComplexPassword('no_uppercase')).to.be.false;
    expect(helper.isComplexPassword('NOLOWERCASE+')).to.be.false;
  }));

  it('userNameToEmail() should normalize usernames to emails', inject(
    function (helper) {
      expect(helper.userNameToEmail('and_plus_rew_at_rangle_dot_io')).to.equal(
        'and+rew@rangle.io');
      expect(helper.userNameToEmail('and_dot_rew_at_rangle_dot_io')).to.equal(
        'and.rew@rangle.io');
      expect(helper.userNameToEmail(
        'and_dot_r_dot_ew_at_r_dot_an_dot_gle_dot_io')).to.equal(
        'and.r.ew@r.an.gle.io');
    }));

  it('emailToUserName() should normalize emails to usernames', inject(
    function (helper) {
      expect(helper.emailToUserName('andrew@rangle.i+o')).to.equal(
        'andrew_at_rangle_dot_i_plus_o');
      expect(helper.emailToUserName('and.rew@rangle.io')).to.equal(
        'and_dot_rew_at_rangle_dot_io');
      expect(helper.emailToUserName('and.r.ew@r.an.gle.io')).to.equal(
        'and_dot_r_dot_ew_at_r_dot_an_dot_gle_dot_io');
    }));

  it('checkRole() should return true when valid role', inject(function (
    helper) {
    var appUser = {
      name: 'appUser',
      roles: ['app-user']
    };
    var opperatorUser = {
      name: 'opperatorUser',
      roles: ['operator']
    };
    var collectorUser = {
      name: 'collectorUser',
      roles: ['collectors']
    };
    var bizUser = {
      name: 'bizUser',
      roles: ['business']
    };

    expect(helper.checkRole('app-user', appUser)).to.true;
    expect(helper.checkRole('operator', opperatorUser)).to.true;
    expect(helper.checkRole('collectors', collectorUser)).to.true;
    expect(helper.checkRole('business', bizUser)).to.true;
  }));

  it('checkRole() should return false when invalid role', inject(function (
    helper) {
    var appUser = {
      name: 'appUser',
      roles: ['operator', 'collectors', 'business']
    };
    var opperatorUser = {
      name: 'opperatorUser',
      roles: ['app-user', 'collectors', 'business']
    };
    var collectorUser = {
      name: 'collectorUser',
      roles: ['app-user', 'operator', 'business']
    };
    var bizUser = {
      name: 'bizUser',
      roles: ['app-user', 'operator', 'collectors']
    };

    expect(helper.checkRole('app-user', appUser)).to.false;
    expect(helper.checkRole('operator', opperatorUser)).to.false;
    expect(helper.checkRole('collectors', collectorUser)).to.false;
    expect(helper.checkRole('business', bizUser)).to.false;
  }));

  describe('helper.statesAndProvinceList()', function () {
    beforeEach(module('ka-profile'));

    it('should return USA state list', inject(function (helper) {
      var usStates = R.filter(R.propEq('country', 'UNITED STATES'),
        helper.statesAndProvinceList);
      expect(usStates.length).to.eq(59);
    }));
  });

  describe('helper.statesAndProvinceList()', function () {
    beforeEach(module('ka-profile'));

    it('should return CANADIAN province list', inject(function (
      helper) {
      var provinces = R.filter(R.propEq('country', 'CANADA'),
        helper.statesAndProvinceList);
      expect(provinces.length).to.eq(13);
    }));
  });

  describe('filter.offset()', function () {
    var $filter;

    beforeEach(function() {
      module('ka-helper');
      inject(function (_$filter_) {
        $filter = _$filter_;
      });
    });

    it('should get the offset of an array', inject(function () {
      var offsetArray = ['a','b','c','d','e','f','g','h'];
      var offset = 5;
      var result = $filter('offset')(offsetArray, offset);
      expect(result).to.deep.equal(['f','g','h']);
    }));
  });

  describe('filter.reverse()', function () {
    var $filter;

    beforeEach(function() {
      module('ka-helper');
      inject(function (_$filter_) {
        $filter = _$filter_;
      });
    });

    it('should reverse an array', inject(function () {
      var testArray = ['a','b','c'];
      var result = $filter('reverse')(testArray);
      expect(result).to.deep.equal(['c','b','a']);
    }));
  });

});