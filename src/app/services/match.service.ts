import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MatchService {
  // adresse de destination, serveur backend
  // f nafs projet nalkach une requete andha meme action http "&&&&&" meme adresse de destination
  matchUrl: string = "http://localhost:3000/matches";
  constructor(private httpClient: HttpClient) { }
  // request to get all matches
  // response:array of objects
  getAllMatches() {
    // type de retour:json par : get<{T:any}> en indiquant le type de retour
    return this.httpClient.get<{ T: any }>(this.matchUrl);
  }
  // request to get  matche by Id
  // response:one object
  getMatchById(id: any) {
    return this.httpClient.get<{ match: any }>(`${this.matchUrl}/${id}`);
  }
  // request to delete matche by Id
  // response:string,boolean
  deleteMatchById(id: any) {
    return this.httpClient.delete<{ isDeleted: boolean }>(`${this.matchUrl}/${id}`);
  }
  // request to post: add match: deux parametres:destination et valeur
  // response:string,boolean
  addMatch(object: any) {
    return this.httpClient.post<{ isAdded: boolean }>(this.matchUrl, object);
  }
  // request to edit match
  // response:string,boolean
  //  id est deja recuperee lors de l'affichage dynamique dans interface de edit(form)
  editMatch(newObject: any) {
    return this.httpClient.put<{ isEdited: string }>(this.matchUrl, newObject);
  }
  searchMatch(Object:any) {
    // let foundObject: any = [];
    // let matches: any = this.getAllMatches();
    // foundObject = matches.filter((elt: any) => elt.scoreOne == this.searchMatch.value.scoreOne && elt.scoreTwo ==this.searchMatch.value.scoreTwo)
    // return foundObject;
    return this.httpClient.post<{ foundMatches: any }>(this.matchUrl+"/search",Object);

  }
}
