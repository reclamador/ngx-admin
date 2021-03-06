import { VERSION } from './../../../../version';
import { Worker } from './../../../@core/data/user.service';
import { Component, Input, OnInit } from '@angular/core';

import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { UserService } from '../../../@core/data/user.service';
import { AnalyticsService } from '../../../@core/utils/analytics.service';
import { LayoutService } from '../../../@core/utils/layout.service';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  @Input() position = 'normal';

  worker: Worker;
  appName: string = '';
  VERSION = VERSION.version;

  userMenu = [{ title: 'Profile', link: 'pages/profile' }, { title: 'Log out', link: '/auth/logout' }];

  constructor(
    private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private userService: UserService,
    private analyticsService: AnalyticsService,
    private layoutService: LayoutService
  ) {}

  ngOnInit() {
    this.userService.getUser$().subscribe((worker: Worker) => (this.worker = worker));
    this.appName = this.layoutService.appName;
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  toggleSettings(): boolean {
    this.sidebarService.toggle(false, 'settings-sidebar');

    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }

  startSearch() {
    this.analyticsService.trackEvent('startSearch');
  }
}
