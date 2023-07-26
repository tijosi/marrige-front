export class Notify {

  static white(msg: string, time?: number) {
    const type = '';
    time = time ? time : 4000;

    const div = document.createElement("div");
    div.className = 'notify ' + type;
    div.innerHTML = msg;

    document.documentElement.append(div);
    setTimeout(() => {
      document.documentElement.removeChild(div)
    }, time);
  }

  static error(msg: any, time?: number) {
    const type = 'notify-error';
    time = time ? time : 5000;

    const div = document.createElement("div");
    div.className = 'notify ' + type;
    div.innerHTML = msg;

    document.documentElement.append(div);
    setTimeout(() => {
      document.documentElement.removeChild(div)
    }, time);
  }

}
