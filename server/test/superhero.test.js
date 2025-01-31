
import request from 'supertest'; 
import {app} from '../index';

describe('GET /superheroes', () => {
  it('should return a list of superheroes with status 200', async () => {
    const response = await request(app).get('/superheroes');
    
    // Check that the response status is 200 (OK)
    expect(response.status).toBe(200);
    
    // Check that the response body is an array
    expect(Array.isArray(response.body)).toBe(true);
    
    // Check that the first superhero has the expected properties
    expect(response.body[0]).toHaveProperty('id');
    expect(response.body[0]).toHaveProperty('name');
    expect(response.body[0]).toHaveProperty('superpower');
    expect(response.body[0]).toHaveProperty('humilityScore');

  });
});