import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Inicio',
    icon: 'home-outline',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'Misc',
    icon: 'grid-outline',
    children: [
      {
        title: '404',
        link: '/pages/miscellaneous/404',
      },
    ],
  },
  {
    title: 'Modals',
    icon: 'grid-outline',
    children: [
      {
        title: 'dialog',
        link: '/pages/modals/dialog',
      },
      {
        title: 'window',
        link: '/pages/modals/window',
      },
      {
        title: 'popover',
        link: '/pages/modals/popover',
      },
      {
        title: 'tooltip',
        link: '/pages/modals/tooltip',
      },
      {
        title: 'toastr',
        link: '/pages/modals/toastr',
      },
    ],
  },
  {
    title: 'Ui-features',
    icon: 'people',
    children: [
      {
        title: 'grid',
        link: '/pages/ui-features/grid',
      },
      {
        title: 'icons',
        link: '/pages/ui-features/icons',
      },
      {
        title: 'typography',
        link: '/pages/ui-features/typography',
      },
      {
        title: 'search-fields',
        link: '/pages/ui-features/search-fields',
      },
    ],
  },
  // {
  //   title: 'Auth',
  //   icon: 'nb-locked',
  //   children: [
  //     {
  //       title: 'Login',
  //       link: '/auth/login',
  //     },
  //     {
  //       title: 'Register',
  //       link: '/auth/register',
  //     },
  //     {
  //       title: 'Request Password',
  //       link: '/auth/request-password',
  //     },
  //     {
  //       title: 'Reset Password',
  //       link: '/auth/reset-password',
  //     },
  //   ],
  // },
];
