import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  playerUrl:string="http://localhost:3000/players"

  constructor(private httpClient:HttpClient) {  
  }
addPlayer(object:any){
  return this.httpClient.post<{msg:string}>(this.playerUrl,object);
}
editPlayer(object:any){
  return this.httpClient.put<{isEdited:boolean}>(this.playerUrl,object);

}
getAllPlayers(){
  return this.httpClient.get<{T:any}>(this.playerUrl);

}
getPlayerById(id:any){
  return this.httpClient.get<{player:any}>(`${this.playerUrl}/${id}`);

}
deletePlayerById(id:any){
  return this.httpClient.delete<{isDeleted:boolean}>(`${this.playerUrl}/${id}`);

}
searchPlayer(Object:any) {
  return this.httpClient.post<{ foundPlayers: any }>(this.playerUrl+"/search",Object);
}
}

