import { Injectable } from '@angular/core';
import emailjs from '@emailjs/browser';

@Injectable({
  providedIn: 'root'
})
export class MailsenderService {

  constructor() { }

  private serviceId = 'service_c7hpkqs'
  private templateId = 'template_ec18ql8'
  private publicKey = '7RxkhoK11CV8ET-pS'

  sendEmail(params: any) {
    let data = params
    return emailjs.send(this.serviceId, this.templateId, data, this.publicKey)
  }
}
