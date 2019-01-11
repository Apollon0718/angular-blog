class MockComponent {}

export const MOCK_ROUTES = [
    {
        path: 'posts',
        children: [
            {
                path: 'all',
                component: MockComponent
            },
            {
                path: 'my-post',
                component: MockComponent
              },
              {
                  path: 'all',
                  component: MockComponent
              },
              {
                  path: 'detail',
                  component: MockComponent
              }
        ]
    },
    {
        path: 'auth',
        children: [
            {
                path: 'login',
                component: MockComponent
            },
            {
                path: 'registration',
                component: MockComponent
            }
        ]
      },
      {
        path: 'profile',
        children: [
            {
                path: 'profile',
                component: MockComponent
            }
        ]
      },
];
