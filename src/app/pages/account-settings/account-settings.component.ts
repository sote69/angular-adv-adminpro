import { Component, OnInit, inject } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [
  ]
})
export class AccountSettingsComponent implements OnInit {


  private links = document.querySelectorAll('.selector');
  private settinsService = inject(SettingsService);

  ngOnInit(): void {
    this.links = document.querySelectorAll('.selector');
    this.settinsService.checkCurrentTheme(this.links);
  }

  // Cambia el fichero css a aplicar
  changeTheme(theme :string) {
    this.settinsService.changeTheme(theme, this.links);
  }
}
