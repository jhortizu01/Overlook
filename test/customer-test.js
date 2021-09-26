import chai from 'chai';
import Customer from '../src/classes/customer.js'
const expect = chai.expect;

describe('Customer', () => {

  it('should be a function', () => {
    expect(Customer).to.be.a('function');
  });

  it('should hold a customer id', () => {
    let customer = new Customer({"id": 21});
    expect(customer.id).to.equal(21)
  })

  it('should hold a customer name', () => {
    let customer = new Customer({"id": 21, "name": 'Janika'})
    expect(customer.name).to.equal('Janika')
  })


});
