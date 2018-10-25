import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Doctor } from "../domain/doctor";
import { PaginationResult } from "src/domain/paginationresult";

@Injectable()
export class DoctorService {

    constructor(private http: HttpClient) {  
    }

    getDoctorWithPagination(page: number, itemsPerPage: number, filterVal: string) {
        return this.http.get("https://localhost:44381/api/Doctor/"+ page + "/" + itemsPerPage + "?filter=" + filterVal)
        .toPromise()
        .then(data => {return data as PaginationResult<Doctor> });   
    }

    getDoctor() {
        return this.http.get("https://localhost:44381/api/Doctor")
            .toPromise()
            .then(data => {return data as Doctor[] });   
    }

    addDoctor(objEntity: Doctor) {
        return this.http.post("https://localhost:44381/api/Doctor", objEntity)
        .toPromise()
        .then(data => {return data as Doctor });
    }

    editDoctor(id, objEntity: Doctor) {
        return this.http.put("https://localhost:44381/api/Doctor/" + id, objEntity)
        .toPromise()
        .then(data => {return data as Doctor });
    }

    deleteDoctor(id) {
        return this.http.delete("https://localhost:44381/api/Doctor/" + id)
        .toPromise()
        .then(() => null);
    }
}