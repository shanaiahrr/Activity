import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {OrderDetail } from '../domain/orderdetail';
import { PaginationResult } from "../domain/paginationresult";


@Injectable()
export class OrderDetailService{

constructor(private http: HttpClient) {}

getOrderDetail(){
    return this.http.get("https://localhost:44381/api/OrderDetail")
    .toPromise()
    .then(data=>{return data as OrderDetail[]})
}

getOrderDetailWithID(id){
    return this.http.get("https://localhost:44381/api/OrderDetail/" + id)
    .toPromise()
    .then(data=>{return data as OrderDetail})
}

addOrderDetail(objEntity: OrderDetail){
    return this.http.post("https://localhost:44381/api/OrderDetail", objEntity)
    .toPromise()
    .then(data=>{return data as OrderDetail})
}

editOrderDetail(id, objEntity: OrderDetail){
    return this.http.put("https://localhost:44381/api/OrderDetail/" + id, objEntity)
    .toPromise()
    .then(data=>{return data as OrderDetail})
}

deleteOrderDetail(id){
    return this.http.delete("https://localhost:44381/api/OrderDetail/" + id)
    .toPromise()
    .then(()=>null);
}

}