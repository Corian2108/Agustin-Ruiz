import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { HeaderComponent } from "../../shared/header/header.component";
import { FooterComponent } from "../../shared/footer/footer.component";

@Component({
  selector: 'app-resume',
  imports: [HeaderComponent, FooterComponent, RouterLink],
  templateUrl: './resume.component.html',
  styleUrl: './resume.component.css'
})

export class ResumeComponent {

}
