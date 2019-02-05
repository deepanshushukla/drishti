import { Component, OnInit } from '@angular/core';
 import { HttpErrorResponse, HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'drishtiassgnment';
  host = 'localhost:3000';
  tasks: any;
  tasksData: any;
  currentstart: any;
  currentend : any;
  resultArr =[];
  constructor (private http: HttpClient ){ }
    ngOnInit() {
      this.getTasks();
    }
  getTasks () {
    //
    // this.tasks = [
    //   'task1',
    //   'task2'
    // ];
    fetch('http://localhost:3000/api/v1/tasks').then(res => res.json()).then( (result) => {
      this.tasks = result ;
    });
   }

  getTasksDetail (task) {
    console.log(task);
    fetch(`http://localhost:3000/api/v1/task?id=${task}`).then(res => res.json()).then( (result) => {
      this.tasksData = result.map ((img)=>{
        return {hovered: false, img};
      }) ;
    });
  }
  getImage (data) {
    return `http://localhost:3000${data.img}`;
  }
  mouseHover (event, item, index) {
    console.log('thisasdfasd', this.currentstart + ' ---- ' + this.currentend)
    if (this.currentstart !== undefined && index > this.currentstart) {
       this.currentend = index ;
    }

    console.log(event, item, index)
  }

  onselect (item, index) {
    if (item.hovered) {
      return;
    }
    if (this.currentstart !== undefined && index > this.currentstart) {
      this.currentend = index;
      for (let i = this.currentstart ; i <= this.currentend; i++ ) {
        this.tasksData[i].hovered = true;
      }
      this.resultArr.push([this.currentstart, this.currentend])
      this.currentend = undefined;
      this.currentstart = undefined;
    } else if (this.currentstart === undefined) {
      this.currentstart = index;
      item.hovered = true;
    }
    console.log(this.resultArr);
  }
  save () {
    if (this.tasksData.length) {  return fetch('http://localhost:3000/api/v1/task', {
      method: 'POST',
      body: JSON.stringify(this.resultArr), // body data type must match "Content-Type" header
    }).then(response => response.json());

    } else {
      alert('Please select somethig  to save');
    }
  }
}



