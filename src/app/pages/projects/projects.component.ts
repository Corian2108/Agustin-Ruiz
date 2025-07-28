import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgbCarouselConfig, NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

import { HeaderComponent } from "../../shared/header/header.component";
import { FooterComponent } from "../../shared/footer/footer.component";

@Component({
  selector: 'app-projects',
  imports: [HeaderComponent, FooterComponent, RouterLink, NgbCarouselModule, NgbTooltipModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})

export class ProjectsComponent {

  openWeb(link: string) {
    window.open(link, '_blank')
  }

	constructor(config: NgbCarouselConfig) {
		config.interval = 5000;
		config.keyboard = false;
		config.pauseOnHover = false;
	}

}
