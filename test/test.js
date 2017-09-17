'use strict'

const expect = require('chai').expect
const nock = require('nock')
const lib = require('../src')

describe('indicadoresdeldia', () => {
  describe('server error', () => {
    beforeEach(() => {
      nock.disableNetConnect()
      nock('http://indicadoresdeldia.cl')
        .get('/webservice/indicadores.json')
        .replyWithError('Server error')
    })

    it('should return server error', done => {
      lib().catch(err => {
        expect(err.message).to.eql('Server error')
        done()
      })
    })
  })

  describe('bad status code', () => {
    beforeEach(() => {
      nock.disableNetConnect()
      nock('http://indicadoresdeldia.cl')
        .get('/webservice/indicadores.json')
        .reply(301)
    })

    it('should return request error', done => {
      lib().catch(err => {
        expect(err.message).to.eql('Request Failed. Status Code: 301')
        done()
      })
    })
  })

  describe('good request', () => {
    beforeEach(() => {
      nock.disableNetConnect()
      nock('http://indicadoresdeldia.cl')
        .get('/webservice/indicadores.json')
        .reply(
          200,
          JSON.stringify({
            date: '2016-11-13 12:30:01',
            santoral: { ayer: 'Cristian', hoy: 'Diego', maniana: 'Humberto' },
            indicador: {
              uf: '$26.283,75',
              ipc: '0.2',
              utm: '$46.091,00',
              imacec: '1,4'
            },
            restriccion: {
              normal: ['no aplica'],
              normal_maniana: ['no aplica'],
              catalitico: ['no aplica']
            }
          })
        )
    })

    it('should return valid data', done => {
      lib().then(data => {
        expect(data.date).to.eql('2016-11-13T15:30:01.000Z')
        expect(data.holy.yesterday).to.eql('Cristian')
        expect(data.holy.today).to.eql('Diego')
        expect(data.holy.tomorrow).to.eql('Humberto')
        expect(data.indicator.uf).to.eql(26283.75)
        expect(data.indicator.ipc).to.eql(0.2)
        expect(data.indicator.utm).to.eql(46091)
        expect(data.indicator.imacec).to.eql(1.4)
        expect(data.restriction.normal.today).to.eql(['no aplica'])
        expect(data.restriction.normal.tomorrow).to.eql(['no aplica'])
        expect(data.restriction.catalitic).to.eql(['no aplica'])
        done()
      })
    })
  })
})
