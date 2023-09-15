import { makeAutoObservable } from "mobx";

class VisibleStore {
    constructor() {
        makeAutoObservable(this);
    }

    visible = {
        FooterToolbar: false,
        FilterToolbar: false,
        RelevenceModal: false,
        previewModal: false,
        uploadFile: false,
        chUploadFile: false,
    };

    toglevisible = (key: keyof typeof this.visible) => {
        this.visible[key] = !this.visible[key];
    };

    show = (key: keyof typeof this.visible) => {
        this.visible[key] = true;
    };

    hide = (key: keyof typeof this.visible) => {
        this.visible[key] = false;
    };
}

export default VisibleStore;
