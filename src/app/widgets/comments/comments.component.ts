import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

  @Input() parentWidgetId;
  users;
  result;
  commentsArray;
  usersArray;
  defaultCommentsWidgetId:number =0;
  widgetStyleId:number = 0;

  constructor( private apiService: ApiService) { }

  ngOnInit(): void {
    this.defaultCommentsWidgetId = this.parentWidgetId;
    this.getUsers();
  }

  getUsers():any{
    this.apiService.getUsers("https://randomuser.me/api/?results=4").subscribe(
      data => { 
        this.users = data; 
        this.users = this.users.results; 
        this.setUsers(this.users);
        return this.users
      },
      err => console.error(err),
      () => console.log('done loading users')
    );

  }
  setUsers(users):object{
    this.users = users;
    this.commentsArray = [];
    const fkaeComment:string = "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    for (let i in this.users){
      this.usersArray = {
        "index" : this.users[i],
        "name" : this.users[i].name,
        "img" : this.users[i].picture,
        "comment" : fkaeComment
      }
      this.commentsArray.push(this.usersArray);
    }
    return this.result = this.commentsArray;
  }
  setWidgetColor(defaultCommentsWidgetId):any{
    this.defaultCommentsWidgetId = defaultCommentsWidgetId;
    switch (this.defaultCommentsWidgetId) {
      case 0:
        return '#FFF';//Default
      case 1:
        return '#FFF';//Footer
      case 2:
        return '#333';//Sidebar
        default:
          console.log(' erreur ' + this.defaultCommentsWidgetId + ' n"est pas une valeur.');
        break;
    }
  }
  setWidgetTitleColor(defaultCommentsWidgetId):any{
    this.defaultCommentsWidgetId = defaultCommentsWidgetId;
    switch (this.defaultCommentsWidgetId) {
      case 0:
        return '#FFF';//Default
      case 1:
        return '#e40046';//Footer
      case 2:
        return '#333';//Sidebar
        default:
          console.log(' erreur ' + this.defaultCommentsWidgetId + ' n"est pas une valeur.');
        break;
    }
  }


}

