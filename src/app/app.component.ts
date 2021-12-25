import { Component } from '@angular/core';
import { CurrentUserApiService } from './services/api/current-user-api.service';
import { CurrentUserStoreService } from './services/store/current-user-store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ang_jira';
  constructor(private currentUserStore: CurrentUserStoreService) {
    currentUserStore.getAuthFromLocalStorage()
  }
}
