import { ISegment } from './Segment';
import { IExtendedPermission } from './Permission';
import { IService } from './Service';

export interface IRoleTemplateType {
  id: number;
  name: string;
  users: number;
  area: {
    id: string;
    name: string;
  };
}

export interface IRole {
  id?: number;
  dateAdded: string;
  dateUpdated: string;
  segment: ISegment;
  template: IRoleTemplate;
}

export interface IRoleTemplate {
  id?: number;
  name: string;
  service: IService;
  segments: ISegment[];
  userCount?: number;
  area: IRoleTemplateArea;
  extendedPermissions?: IExtendedPermission[];
}

export interface IRoleTemplateArea {
  id: string;
  name: string;
}

export class Role implements IRoleTemplate {
  id = 0;
  name = '';
  service = {
    id: '1',
    name: 'CRM',
    alias: 'CRM'
  };
  userCount = 0;
  area = {
    id: '',
    name: ''
  };
  segments: ISegment[] = [];
  extendedPermissions: IExtendedPermission[] = [];

  public constructor(init?) {
    Object.assign(this, init);
  }
}


