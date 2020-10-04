export interface IPermission {
  id: number;
  name: string;
  codename: string;
}

export interface IExtendedPermission {
  id?: string;
  category: {
    id: string;
    name: string;
    service?: {
      id: string;
      name: string;
      alias: string;
    }
  };
  permission: IPermission;
}
