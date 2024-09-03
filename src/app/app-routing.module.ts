import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { AddMatchComponent } from './components/add-match/add-match.component';
import { AddPlayerComponent } from './components/add-player/add-player.component';
import { AddTeamComponent } from './components/add-team/add-team.component';
import { AdminComponent } from './components/admin/admin.component';
import { MatchesComponent } from './components/matches/matches.component';
import { StadiumTableComponent } from './components/stadium-table/stadium-table.component';
import { PlayersComponent } from './components/players/players.component';
import { SearchMatchesComponent } from './components/search-matches/search-matches.component';
import { MatchInfoComponent } from './components/match-info/match-info.component';
import { EditMatchComponent } from './components/edit-match/edit-match.component';
import { platformBrowser } from '@angular/platform-browser';
import { PlayerInfoComponent } from './components/player-info/player-info.component';
import { TeamInfoComponent } from './components/team-info/team-info.component';
import { EditPlayerComponent } from './components/edit-player/edit-player.component';
import { EditTeamComponent } from './components/edit-team/edit-team.component';
import { SearchPlayersComponent } from './components/search-players/search-players.component';


const routes: Routes = [
   // http://localhost:4200=>home component will be displayed
   {path:'',component:HomeComponent},
  // http://localhost:4200/signin =>login component will be displayed
  {path:'signin',component:LoginComponent},
    // http://localhost:4200/inscription =>signup component will be displayed
    // double quote tekel akther espace mn simple quote
  {path:'inscription',component:SignupComponent},
  {path:'signupadmin',component:SignupComponent},
  {path:'addMatch',component:AddMatchComponent},
  {path:'addplayer',component:AddPlayerComponent},
  {path:'addTeam',component:AddTeamComponent},
  {path:'admin',component:AdminComponent},
  {path:'matches',component:MatchesComponent},
  {path:'players',component:PlayersComponent},
  {path:'searchMatches',component:SearchMatchesComponent},
  {path:'searchPlayers',component:SearchPlayersComponent},
  // matchinfo/:id : path parametré (id);(en utilisant les :sinon il le considere commme une chaine)
  {path:'matchInfo/:id',component:MatchInfoComponent},
  {path:'playerInfo/:id',component:PlayerInfoComponent},
  {path:'teamInfo/:id',component:TeamInfoComponent},
  {path:'editmatch/:id',component:EditMatchComponent},
  {path:'editplayer/:id',component:EditPlayerComponent},
  {path:'editteam/:id',component:EditTeamComponent},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
