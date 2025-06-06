import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { HeaderComponent } from "../../shared/header/header.component";
import { FooterComponent } from "../../shared/footer/footer.component";

@Component({
  selector: 'app-projects',
  imports: [HeaderComponent, FooterComponent, RouterLink],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})

export class ProjectsComponent {

  openWeb(link: string) {
    window.open(link, '_blank')
  }

}
