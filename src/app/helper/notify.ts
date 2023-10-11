export class Notify {

  static white(msg: string, time?: number) {
    const type = '';
    time = time ? time : 4000;

    const div = document.createElement("div");
    div.className = 'notify ' + type;
    div.innerHTML = msg;

    document.documentElement.append(div);

    div.style.animation = 'opacityStart linear 0.2s';

    setTimeout(() => {
      div.style.animation = 'opacityEnd linear 0.2s';
      setTimeout( () => document.documentElement.removeChild(div), 200);

    }, time);
  }

  static error(msg: any, time?: number) {
    const type = 'notify-error';
    time = time ? time : 5000;

    const div = document.createElement("div");
    div.className = 'notify ' + type;
    div.innerHTML = msg;

    document.documentElement.append(div);

    div.style.animation = 'opacityStart linear 0.2s';

    setTimeout(() => {
      div.style.animation = 'opacityEnd linear 0.2s';
      setTimeout( () => document.documentElement.removeChild(div), 200);

    }, time);
  }

  static success(msg: any, time?: number) {
    const type = 'notify-success';
    time = time ? time : 5000;

    const div = document.createElement("div");
    div.className = 'notify ' + type;
    div.innerHTML = msg;

    document.documentElement.append(div);

    div.style.animation = 'opacityStart linear 0.2s';

    setTimeout(() => {
      div.style.animation = 'opacityEnd linear 0.2s';
      setTimeout( () => document.documentElement.removeChild(div), 200);

    }, time);
  }

}
