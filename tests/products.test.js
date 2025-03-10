// tests/products.test.js
// const productTestHelper = require('./test-utils/productTestHelper');
const { mockDb, mockProducts } = require('./db.mock');
const { create, get, list, edit } = require('../products');

jest.mock('../db', () => mockDb);

describe('Product Module', () => {
  beforeEach(() => {
      jest.clearAllMocks();
  });
  describe('list', () => {
    it('should list products', async () => {
        const products = await list();
        expect(products.length).toBe(2);
        expect(products[0].description).toBe('Product 1');
        expect(products[1].description).toBe('Product 2');
    });
});
  // your tests go here
  describe('get', () => {
    it('should get a product by id', async () => {
      // Mock the Product.findById method to return a specific product
      const mockModel = {
        findById: jest.fn().mockResolvedValue({ description: 'Product 1' })
      };

      // Replace the actual model with the mock
      jest.mock('../products', () => mockModel);

      // Call the `get` method
      const product = await get('123');

      // Assertions
      expect(product).toBeDefined();
      expect(product.description).toBe('Product 1');
      expect(mockModel.findById).toHaveBeenCalledWith('123');
    });
  });

  describe('delete', () => {
    it('should delete a product by id', async () => {
      const mockModel = require('../products');

      // Mock deleteOne method
      mockModel.deleteOne = jest.fn().mockResolvedValue({ deletedCount: 1 });

      // Call the delete method
      const result = await deleteProduct('123');
      
      // Assertions
      expect(result.deletedCount).toBe(1);
      expect(mockModel.deleteOne).toHaveBeenCalledWith({ _id: '123' });
    });
});

});

