import { Observable, Subject, first } from 'rxjs';
import { Component } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
})
export class DialogComponent {

  static id: number = Math.round(Math.random()*10000000);

  private static dialogResult: Subject<boolean> = new Subject<boolean>();

  constructor(){}

  private static criarElementoPadrao(message: any, title: any)  {
    const bloqueadorElement = document.createElement('section');
    bloqueadorElement.id = 'dialog' + String(this.id);
    bloqueadorElement.className = 'bloqueador';
    bloqueadorElement.addEventListener('click', ($event) => {
      if ($event.target != bloqueadorElement) return;
      this.dialogResult.next(false);
      this.closeDialog();
    });

    const dialogElement = document.createElement('section');
    dialogElement.className = 'dialog-container';

    const titleElement = document.createElement('div');
    titleElement.className = 'dialog-title';
    titleElement.textContent = title;

    const bodyElement = document.createElement('div');
    bodyElement.className = 'dialog-body';
    bodyElement.innerHTML = message;

    const buttonsElement = document.createElement('buttons');
    buttonsElement.className = 'dialog-buttons';

    const btnNao = this.createButton('Não', 'none', () => this.dialogResult.next(false));
    const btnSim = this.createButton('Sim', 'none', () => this.dialogResult.next(true));

    buttonsElement.appendChild(btnNao);
    buttonsElement.appendChild(btnSim);

    dialogElement.appendChild(titleElement);
    dialogElement.appendChild(bodyElement);
    dialogElement.appendChild(buttonsElement);

    bloqueadorElement.appendChild(dialogElement);

    return bloqueadorElement;
  }

  private static createButton(text: string, type: string, onClick: () => any) {
    const button = document.createElement('button');
    button.className = 'btn-' + type;
    button.textContent = text;
    button.addEventListener('click', () => {
      onClick();
      this.closeDialog()
    });
    return button;
  }

  public static confirm(message: string, title: string, opts?: any): Observable<any> {


    const dialog = this.criarElementoPadrao(message, title);
    document.body.appendChild(dialog);
    return DialogComponent.dialogResult.asObservable().pipe(first());

  }

  private static closeDialog() {

    const dialogElement = document.querySelector('#dialog' + String(this.id));
    if (dialogElement) {
      document.body.removeChild(dialogElement);
    }

  }

}
