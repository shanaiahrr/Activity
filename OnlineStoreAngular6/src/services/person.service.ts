import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Person } from "../domain/person";
import { PaginationResult } from "src/domain/paginationresult";

@Injectable()
export class PersonService {

    constructor(private http: HttpClient) {  
    }

    getPersonWithPagination(page: number, itemsPerPage: number, filterVal: string) {
        return this.http.get("https://localhost:44381/api/Person/"+ page + "/" + itemsPerPage + "?filter=" + filterVal)
        .toPromise()
        .then(data => {return data as PaginationResult<Person> });   
    }

    getPerson() {
        return this.http.get("https://localhost:44381/api/Person")
            .toPromise()
            .then(data => {return data as Person[] });   
    }

    addPerson(objEntity: Person) {
        return this.http.post("https://localhost:44381/api/Person", objEntity)
        .toPromise()
        .then(data => {return data as Person });
    }

    editPerson(id, objEntity: Person) {
        return this.http.put("https://localhost:44381/api/Person/" + id, objEntity)
        .toPromise()
        .then(data => {return data as Person });
    }

    deletePerson(id) {
        return this.http.delete("https://localhost:44381/api/Person/" + id)
        .toPromise()
        .then(() => null);
    }
}