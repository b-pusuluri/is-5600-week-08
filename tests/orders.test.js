// tests/orders.test.js
const { create, get, list, edit } = require('../orders');
const orderData = require('../data/order1.json');
const productTestHelper = require('./test-utils/productTestHelper');

describe('Orders Module', () => {
 
  let createdProduct;
  let createdOrder;

  // Populate the database with dummy data
  beforeAll(async () => {
    await productTestHelper.setupTestData();
    await productTestHelper.createTestOrders(5);
  });

  afterAll(async () => {
    await productTestHelper.cleanupTestData();
  });

  describe('create', () => {
    it('should create an order', async () => {
      createdOrder = await create(orderData);
      expect(createdOrder).toBeDefined();
      expect(createdOrder.buyerEmail).toBe(orderData.buyerEmail);
    });
  });

  describe('list', () => {
    it('should list orders', async () => {
      const orders = await list();
      expect(orders.length).toBeGreaterThan(4);
    });
  });

  describe('get', () => {
    it('should retrieve an order by ID', async () => {
      const order = await get(createdOrder._id);
      expect(order).toBeDefined();
      expect(order._id).toEqual(createdOrder._id);
    });
  });

  describe('edit', () => {
    it('should edit an order', async () => {
      const change = { buyerEmail: 'newemail@example.com' };

      const editedOrder = await edit(createdOrder._id, change);

      expect(editedOrder).toBeDefined();
      expect(editedOrder.buyerEmail).toBe(change.buyerEmail);
    });
  });
});