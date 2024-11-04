export class Notify {

    static createElement(type: string, msg: any, time: number) {
        const div = document.createElement("div");
        div.className = 'notify ' + type;
        div.innerHTML = msg;

        div.addEventListener('click', ($event) => {
            div.style.animation = 'opacityEnd 0.2s';
            setTimeout(() => document.documentElement.removeChild(div), 190);
        });

        document.documentElement.append(div);
        setTimeout(() => {
            div.style.animation = 'opacityEnd 0.2s';
            setTimeout(() => document.documentElement.removeChild(div), 190);
        }, time);
    }

    static white(msg: string, time?: number) {
        const type = '';
        time = time ? time : 4000;

        Notify.createElement(type, msg, time);
    }

    static error(msg: any, time?: number) {
        const type = 'notify-error';
        time = time ? time : 8000;

        Notify.createElement(type, msg, time);
    }


    static success(msg: any, time?: number) {
        const type = 'notify-success';
        time = time ? time : 5000;

        Notify.createElement(type, msg, time);
    }

    static warning(msg: any, time?: number) {
        const type = 'notify-warning';
        time = time ? time : 5000;

        Notify.createElement(type, msg, time);
    }

}
