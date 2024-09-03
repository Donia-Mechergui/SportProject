import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  teamUrl:string="http://localhost:3000/teams"
  constructor(private httpClient:HttpClient) { }
  addTeam(object:any){
    return this.httpClient.post<{isAdded:boolean}>(this.teamUrl,object);
  }
  deleteTeamById(id:any)
  {
    return this.httpClient.delete<{isDeleted:boolean}>(`${this.teamUrl}/${id}`);
  }
  getAllTeams(){
    return this.httpClient.get<{T:any}>(this.teamUrl);
  }
  editTeam(object:any){
    return this.httpClient.put<{isEdited:boolean}>(this.teamUrl,object);
  }
  getTeamById(id:any){
    return this.httpClient.get<{team:any}>(`${this.teamUrl}/${id}`);
  }
}
