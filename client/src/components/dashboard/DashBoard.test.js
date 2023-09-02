import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import DashBoard from './Dashboard';

// Mock the axiosClient module
jest.mock('../../utils/axiosClient', () => ({
  axiosClient: {
    get: jest.fn((url) => {
      if (url === 'https://jsonplaceholder.typicode.com/posts') {
        return Promise.resolve({
          data: [
            {
                "userId": 1,
                "id": 1,
                "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
                "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
              },
              {
                "userId": 1,
                "id": 2,
                "title": "qui est esse",
                "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
              }
              
            // Add more mock post data as needed
          ],
        });
      } else if (url.startsWith('https://jsonplaceholder.typicode.com/comments')) {
        return Promise.resolve({
          data: [
            {
                "postId": 1,
                "id": 1,
                "name": "id labore ex et quam laborum",
                "email": "Eliseo@gardner.biz",
                "body": "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium"
              },
              {
                "postId": 1,
                "id": 2,
                "name": "quo vero reiciendis velit similique earum",
                "email": "Jayne_Kuhic@sydney.com",
                "body": "est natus enim nihil est dolore omnis voluptatem numquam\net omnis occaecati quod ullam at\nvoluptatem error expedita pariatur\nnihil sint nostrum voluptatem reiciendis et"
              }
            // Add more mock comment data as needed
          ],
        });
      }
    }),
  },
}));

describe('DashBoard component', () => {
  const mockStore = configureStore([]);
  const initialState = {
    appConfigReducer: {
      posts: [{
        "userId": 1,
        "id": 1,
        "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
        "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
      },
      {
        "userId": 1,
        "id": 2,
        "title": "qui est esse",
        "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
      }

      ],
      comments: [
        {
          "postId": 1,
          "id": 1,
          "name": "id labore ex et quam laborum",
          "email": "Eliseo@gardner.biz",
          "body": "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium"
        },
        {
          "postId": 1,
          "id": 2,
          "name": "quo vero reiciendis velit similique earum",
          "email": "Jayne_Kuhic@sydney.com",
          "body": "est natus enim nihil est dolore omnis voluptatem numquam\net omnis occaecati quod ullam at\nvoluptatem error expedita pariatur\nnihil sint nostrum voluptatem reiciendis et"
        }
      ],
    },
  };
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  it('renders posts and comments', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <DashBoard />
        </BrowserRouter>
      </Provider>
    );
    

    // Wait for the asynchronous operations to complete
    await screen.findByText(/sunt aut facere repellat provident occaecati excepturi optio reprehenderit/i);
    await screen.findByText(/qui est esse/i);
    await screen.findByText(/id labore ex et quam laborum/i);
    await screen.findByText(/quo vero reiciendis velit similique earum/i);

    // Assert that the posts and comments are rendered
    expect(screen.getByText(/sunt aut facere repellat provident occaecati excepturi optio reprehenderit/i)).toBeInTheDocument();
    expect(screen.getByText(/qui est esse/i)).toBeInTheDocument();
    expect(screen.getByText(/id labore ex et quam laborum/i)).toBeInTheDocument();
    expect(screen.getByText(/quo vero reiciendis velit similique earum/i)).toBeInTheDocument();
  });

  // Add more test cases as needed
});

