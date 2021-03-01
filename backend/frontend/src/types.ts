import { ErrorAction } from './Store/Actions/errorActions'
import { GraphAction } from './Store/Actions/graphActions'
import { PortfolioAction } from './Store/Actions/portfolioActions'
import { SearchAction } from './Store/Actions/searchActions'
/*************Types for ReChart plugin  **********/
export type companies = {
  [companySymbol in string] : companyData
}

export type companyData = {
    name: string
    data: coordinateFormattedData
    isNotVisible?:boolean
    highlight?:boolean
    color?:string
}

export type intervalLabel = '10 days'|'1 month'| '6 month' |'1 year'| '5 years'| 'ytd'| 'max'

export type coordinateFormattedData = {
  x: number | 0,
  y: number | 0
}[]


/************************************************/

/********** Types for AlphaVantage Api ***************/
export  type timeData = {
  [date in string]: {
    '1. open': string
  }
}

export type resultData = {
  '1. symbol': string,
  '2. name':string
}

export type DATA_INTERVAL = '1min'| '5min' | '15min' | '30min' | '60min'
export type DATA_OUTPUTSIZE = 'compact' | 'full'

/******************************************************/


/************Types for global store*******************/
export type search = {
    loading ?:boolean,
    results ?: resultData[] | null
  }

export type graph = {
  currentInterval : intervalLabel,
  data ?: companies
}


export type portfolio = {
  [comapnySymbol in string]: companyDetail
}

export interface companyDetail  {
  symbol:string,
  price: string,
  changePercent: string,
  name: string ,
  visible: boolean
  color:colors | string
}

export type store = {
  graph :graph,
  portfolio :portfolio
  errors?:errors
  search?:search
}

export type errors= {
  [key in string] ?: string
}

export type  dispatchActions = GraphAction | PortfolioAction |ErrorAction | SearchAction

/*****************************************************/

export enum colors  {
  aqua= '#00ffff',
  black= '#000000',
  blue= '#0000ff',
  brown= '#a52a2a',
  darkblue= '#00008b',
  darkcyan= '#008b8b',
  darkgrey= '#a9a9a9',
  darkgreen= '#006400',
  darkkhaki= '#bdb76b',
  darkmagenta= '#8b008b',
  darkolivegreen= '#556b2f',
  darkorange= '#ff8c00',
  darkorchid= '#9932cc',
  darkred= '#8b0000',
  darksalmon= '#e9967a',
  darkviolet= '#9400d3',
  gold= '#ffd700',
  green= '#008000',
  indigo= '#4b0082',
  khaki= '#f0e68c',
  lightblue= '#add8e6',
  lightcyan= '#e0ffff',
  lightgreen= '#90ee90',
  lightgrey= '#d3d3d3',
  lightpink= '#ffb6c1',
  lime= '#00ff00',
  magenta= '#ff00ff',
  maroon= '#800000',
  navy= '#000080',
  olive= '#808000',
  orange= '#ffa500',
  pink= '#ffc0cb',
  purple= '#800080',
  red= '#ff0000',
  silver= '#c0c0c0',
  yellow= '#ffff00'
}