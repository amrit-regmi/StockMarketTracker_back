import { formatDate, getStartingPointForInterval } from '../Utils/dateUtils'
import MockDate from 'mockdate'

describe ('Testing Date Helper Functions', () => {
  describe('formatDate', () => {
    test('returns currect format for both Javascriptdate and number', () => {
      const dateToTest = new Date(2020,11,12,2,9) //Saturday 12 Dec 2020 02:09

      expect(formatDate('dd mmm',dateToTest)).toBe('12 Dec')
      expect(formatDate('ddd, dd mmm',dateToTest)).toBe('Sat, 12 Dec')
      expect(formatDate('ddd, dd mmm hh:mm',dateToTest)).toBe('Sat, 12 Dec 02:09')
      expect(formatDate('hh:mm',dateToTest)).toBe('02:09')
      expect(formatDate('mmm yyyy',dateToTest)).toBe('Dec 2020')
      expect(formatDate('yyyy',dateToTest)).toBe('2020')

      expect(formatDate('dd mmm',dateToTest.getTime())).toBe('12 Dec')
      expect(formatDate('ddd, dd mmm',dateToTest.getTime())).toBe('Sat, 12 Dec')
      expect(formatDate('ddd, dd mmm hh:mm',dateToTest.getTime())).toBe('Sat, 12 Dec 02:09')
      expect(formatDate('hh:mm',dateToTest.getTime())).toBe('02:09')
      expect(formatDate('mmm yyyy',dateToTest.getTime())).toBe('Dec 2020')
      expect(formatDate('yyyy',dateToTest.getTime())).toBe('2020')
    })
  })

  describe('getStartingPointForInterval', () => {
    test('returns the correct strting point based on provided graph interval from todays date',() => {
      const mockToday = new Date(2020,11,12) //Saturday 12 Dec 2020 02:09
      MockDate.set(mockToday)
      const today = new Date()
      expect(getStartingPointForInterval('1 month')).toEqual(new Date(today.getFullYear(),today.getMonth()-1,today.getDate()))
      expect(getStartingPointForInterval('10 days')).toEqual(new Date(today.getFullYear(),today.getMonth(),today.getDate()-10))
      expect(getStartingPointForInterval('6 month')).toEqual(new Date(today.getFullYear(),today.getMonth()-6,today.getDate()))
      expect(getStartingPointForInterval('1 year')).toEqual(new Date(today.getFullYear()-1,today.getMonth(),today.getDate()))
      expect(getStartingPointForInterval('5 years')).toEqual(new Date(today.getFullYear()-5,today.getMonth(),today.getDate()))
      MockDate.reset()
    })
  })

})