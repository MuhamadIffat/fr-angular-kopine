import { LocalStorageService } from "../services/local-storage.service";

export class ContactData {
    constructor(
        private localStorageService:LocalStorageService,
        data:any,
        arrayName:any
    ){}

    getLocalData(data,arrayName):any{
        let dataArray = this.localStorageService.getLocalstorage(data,arrayName);
        return dataArray;
    }
}
