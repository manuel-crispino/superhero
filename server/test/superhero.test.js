
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

describe('POST /superheroes', () => {
  it('should return 400 if hero data is incomplete', async () => {
    const incompleteHero = {
      name: 'Batman', // missing superpower and humilityScore
    };

    const response = await request(app).post('/superheroes').send(incompleteHero);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      'Hero data is missing or incomplete. Please provide name, superpower, and humilityScore.'
    );
  });

  it('should return 201 and the new hero if the data is complete', async () => {
    const newHero = {
      name: 'Superman',
      superpower: 'Flying',
      humilityScore: 10,
    };

    const response = await request(app).post('/superheroes').send(newHero);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe(newHero.name);
    expect(response.body.superpower).toBe(newHero.superpower);
    expect(response.body.humilityScore).toBe(newHero.humilityScore);
  });
});