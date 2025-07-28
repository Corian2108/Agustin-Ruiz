import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { HeaderComponent } from "../../shared/header/header.component";
import { FooterComponent } from "../../shared/footer/footer.component";

@Component({
  selector: 'app-my-services',
  imports: [HeaderComponent, FooterComponent, RouterLink],
  templateUrl: './my-services.component.html',
  styleUrl: './my-services.component.css'
})
export class MyServicesComponent {


  openWeb(link: string) {
    window.open(link, '_blank')
  }

}
