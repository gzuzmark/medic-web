import * as firebase from "firebase";

export class ListenerFirebase {
    private ref = '';
    private cb: () => void | null;
    private first = true;
    private database: any;
    constructor(url: string) {
        this.ref = `/console/${url}`;
        this.database = firebase.database().ref(this.ref);
    }

    public setCallback(cb: () => void) {
        this.cb = cb;
    }

    public startListener() {
        this.database.on('value',  () => {
            if (!!this.cb && !this.first) {
                this.cb();
            }
            if (this.first) {this.first = false}
        });
    }

    public stopListener() {
        this.database.off();
        this.first = true;
    }

    public updateRef(url: string) {
        const ref = `/console/${url}`;
        if (ref !== this.ref) {
            this.stopListener();
            this.ref = ref;
            this.database = firebase.database().ref(this.ref);
            this.startListener();
        }
    }
}
