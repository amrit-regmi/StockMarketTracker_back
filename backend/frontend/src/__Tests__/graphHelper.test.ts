import { formatToCoordinate, getXAxisLabels } from '../Utils/graphHelper'
import dummyIntradaydata from '../__Tests__/MockData/dummyIntradaydata.json'
import MockDate from 'mockdate'

describe('Testing the formatToCordinate function', () => {
  test('data should be formatted as x:dateint and y:double values and should be of same length',() => {

    const newTypedData= {}
    const typedData = Object.assign(dummyIntradaydata,newTypedData)
    const expectedData = formatToCoordinate(typedData['Time Series (60min)'])
    expect(expectedData.length).toBe(100)
    expect(expectedData[expectedData.length-1].x).toEqual(Date.parse( '2021-02-12 17:00:00'))
    expect(expectedData[expectedData.length-1].y).toEqual(parseFloat('816.1200'))

  })

})

describe ('test fuction getXAxisLabel', () => {
  test('should return axisLables based on selected duration',() => {
    MockDate.set('2021-03-01')
    const today = new Date()
    expect(getXAxisLabels('10 days').length).toEqual(11)
    expect(getXAxisLabels('10 days')[0]).toEqual(new Date(2021,2,today.getDate()-10).getTime())
    expect(getXAxisLabels('10 days')[10]).toEqual(new Date(2021,2,today.getDate()).getTime())

    expect(getXAxisLabels('1 month').length).toEqual(29)
    expect(getXAxisLabels('1 month')[0]).toEqual(new Date(2021,2,today.getDate()-28).getTime())
    expect(getXAxisLabels('1 month')[28]).toEqual(new Date(2021,2,today.getDate()).getTime())

    expect(getXAxisLabels('ytd').length).toEqual(3)
    expect(getXAxisLabels('ytd')[0]).toEqual(new Date(2021,0,today.getDate()).getTime())
    expect(getXAxisLabels('ytd')[2]).toEqual(new Date(2021,2,today.getDate()).getTime())

    expect(getXAxisLabels('5 years').length).toEqual(6)
    expect(getXAxisLabels('5 years')[0]).toEqual(new Date(2016,2,today.getDate()).getTime())
    expect(getXAxisLabels('5 years')[5]).toEqual(new Date(2021,2,today.getDate()).getTime())




  })
})