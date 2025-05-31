import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2'

import { HeaderComponent } from "../../shared/header/header.component";
import { FooterComponent } from "../../shared/footer/footer.component";
import { MailsenderService } from '../../services/mailsender/mailsender.service';

@Component({
  selector: 'app-contact',
  imports: [HeaderComponent, FooterComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private mailService: MailsenderService) { }

  message: string = ''
  trySend: boolean = false

  minTimeBeforeSubmit: number = 5000;
  formReadyAt = Date.now() + this.minTimeBeforeSubmit;
  lastSubmit: Object = {}

  private formBuilder = inject(FormBuilder);

  contactForm = this.formBuilder.group({
    title: ['Correo desde tú portafolio'],
    name: ['', Validators.required],
    email: ['', [Validators.email, Validators.required]],
    phone: ['', Validators.required],
    message: ['', Validators.required],
    botField: ['']
  })

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.message = params['message'] || '';
      this.contactForm
        .patchValue({ message: this.message })
    })
  }

  openTab(link: string) {
    window.open(link, '_blank')
  }

  onlyNumbers(event: KeyboardEvent): void {
    const charCode = event.key;
    if (!/^[0-9]$/.test(charCode)) {
      event.preventDefault();
    }
  }

  validateForm(): boolean {
    this.lastSubmit = localStorage.getItem('lastSubmit') || ''
    if (this.contactForm.invalid ||
      (this.contactForm.controls.botField.value != '' &&
        this.contactForm.controls.botField.value != null) ||
      Date.now() < this.formReadyAt) {
      return false
    } else {
      if (this.lastSubmit != '') {
        if (this.lastSubmit < (Date.now() + 60000).toString()) {
          return false
        }
        else {
          return true
        }
      }
      return true
    }
  }

  onSubmit() {
    if (
      this.validateForm()
    ) {

      // let data = JSON.stringify(this.contactForm.value)
      this.mailService.sendEmail(this.contactForm.value).then((res: any) => {
        if (res.status == 200) {
          Swal.fire({
            icon: 'success',
            title: 'Mensaje enviado',
            text: '¡Se envió el mensaje correctamente!'
          })
          setTimeout(() => {
            if (localStorage.getItem('lastSubmit')) {
              localStorage.removeItem('lastSubmit')
            }
          }, 61000);
          this.contactForm.reset()
        }
      }).catch((err: any) => {
        Swal.fire({
          icon: 'error',
          title: 'Error de envío',
          text: err + ' Contacte con el proveedor'
        })
      })

    } else {
      this.trySend = true
      Swal.fire({
        icon: 'error',
        title: 'Error de envío',
        text: '¡Algo salió mal! Revisa el formulario e intentalo de nuevo!'
      })
    }
  }

}
