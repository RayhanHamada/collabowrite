import createStore from 'zustand';
import { combine, devtools, persist } from 'zustand/middleware';

export const useUserData = createStore(
  devtools(
    persist(
      combine({ username: 'RayhanHamada', email: '' }, (set, _get, api) => ({
        setUsername(username: string) {
          set(() => ({ username }));
        },

        setEmail(email: string) {
          set(() => ({ email }));
        },
      })),
      { name: 'userdata', getStorage: () => sessionStorage }
    )
  )
);
