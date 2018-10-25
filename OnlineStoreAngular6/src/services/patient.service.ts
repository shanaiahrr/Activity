import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {Patient } from '../domain/patient';
import { PaginationResult } from "../domain/paginationresult";


@Injectable()
export class PatientService{

constructor(private http: HttpClient) {}

getPatientWithPagination(page: number, itemsPerPage: number, filter: string){
    return this.http.get("https://localhost:44381/api/Patient/" + page + "/" + itemsPerPage + "?filter=" + filter)
    .toPromise()
    .then(data=>{return data as PaginationResult<Patient>})

}
getPatient(){
    return this.http.get("https://localhost:44381/api/Patient")
    .toPromise()
    .then(data=>{return data as Patient[]})
}

addPatient(objEntity: Patient){
    return this.http.post("https://localhost:44381/api/Patient", objEntity)
    .toPromise()
    .then(data=>{return data as Patient})
}

editPatient(id, objEntity: Patient){
    return this.http.put("https://localhost:44381/api/Patient/" + id, objEntity)
    .toPromise()
    .then(data=>{return data as Patient})
}

deletePatient(id){
    return this.http.delete("https://localhost:44381/api/Patient/" + id)
    .toPromise()
    .then(()=>null);
}

}