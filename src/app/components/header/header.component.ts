import { Component, OnInit } from '@angular/core';
import { CurrentUserStoreService } from 'src/app/services/store/current-user-store.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  avatar: string | null;
  activedropdown!: string

  constructor(private currentUserStore: CurrentUserStoreService) {
    this.avatar = this.currentUserStore.currentUser?.avatar || null
  }

  ngOnInit(): void {
  }

}
