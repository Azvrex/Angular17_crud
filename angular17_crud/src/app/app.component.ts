import { Component, ElementRef, ViewChild, OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  ngOnInit(): void {
    const localData = localStorage.getItem("angular17crud");
    if(localData != null){
      this.memberList = JSON.parse(localData);
    }
  }

  
  @ViewChild('myModal') modal : ElementRef | undefined;
  memberObj: Member = new Member();
  memberList: Member[] = [];
  

  openModal(){
    if(this.modal != null){
      this.modal.nativeElement.style.display = 'block';
    }
  }

  closeModal() {
    this.memberObj = new Member();
    if(this.modal != null){
      this.modal.nativeElement.style.display = 'none';
    }
   
  }

  //Save data to local storage
  saveStudent(){
    debugger;
    const isLocalPresent = localStorage.getItem("angular17crud");
    if(isLocalPresent != null){
      const oldArray = JSON.parse(isLocalPresent); //convert the string data
      this.memberObj.id = oldArray.length + 1;
      oldArray.push(this.memberObj);
      this.memberList = oldArray;
      localStorage.setItem('angular17crud',JSON.stringify(oldArray)); //convert arr into string
    }else{
      const newArr = [];
      newArr.push(this.memberObj);
      this.memberObj.id =1;
      this.memberList = newArr;
      localStorage.setItem('angular17crud',JSON.stringify(newArr));
    }
    this.closeModal();
  }
  onEdit(item: Member){
    this.memberObj = item;
    this.openModal();
  }
}



export class Member{
  id: number;
  name: string;
  mobileNo: number;
  gender: string;
  email: string;
  city: string;
  province: string;
  status: string;

  constructor(){
    this.id = 0;
    this.name = '';
    this.mobileNo = 0;
    this.gender = '';
    this.email = '';
    this.city = '';
    this.province = '';
    this.status = '';

    
  }
}