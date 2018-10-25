import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Paper } from "../domain/paper";
import { PaginationResult } from "src/domain/paginationresult";

@Injectable()
export class PaperService {

    constructor(private http: HttpClient) {  
    }

    getPaperWithPagination(page: number, itemsPerPage: number, filterVal: string) {
        return this.http.get("https://localhost:44381/api/Paper/"+ page + "/" + itemsPerPage + "?filter=" + filterVal)
        .toPromise()
        .then(data => {return data as PaginationResult<Paper> });   
    }

    getPaper() {
        return this.http.get("https://localhost:44381/api/Paper")
            .toPromise()
            .then(data => {return data as Paper[] });   
    }

    addPaper(objEntity: Paper) {
        return this.http.post("https://localhost:44381/api/Paper", objEntity)
        .toPromise()
        .then(data => {return data as Paper });
    }

    editPaper(id, objEntity: Paper) {
        return this.http.put("https://localhost:44381/api/Paper/" + id, objEntity)
        .toPromise()
        .then(data => {return data as Paper });
    }

    deletePaper(id) {
        return this.http.delete("https://localhost:44381/api/Paper/" + id)
        .toPromise()
        .then(() => null);
    }
}