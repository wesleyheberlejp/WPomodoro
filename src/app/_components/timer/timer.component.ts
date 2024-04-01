import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.scss'
})
export class TimerComponent implements OnInit {

  public timer:string = "60:00";
  public timerInterval:any;
  public minutos : number = 60;
  public segundos : number = 60;


  public formPomarola =  this.fb.group({
    focusTime : this.fb.control<number>(60, [Validators.required]),
    unFocusTime : this.fb.control<number>(30),
  });

  constructor(private fb : FormBuilder){}

  ngOnInit(): void {
    this.formPomarola.controls["focusTime"].setValue((localStorage.getItem("focusTime") ?? 0) as number);
    this.formPomarola.controls["unFocusTime"].setValue((localStorage.getItem("unFocusTime") ?? 0) as number);

    this.minutos = this.formPomarola.controls["focusTime"].value as number;
    this.segundos = 0;

    this.setTimer();
  }

  public iniciaTimer(isFocus:boolean = true){
    clearInterval(this.timerInterval);
    this.segundos = 59;

    localStorage.setItem("unFocusTime", (this.formPomarola.controls.unFocusTime.value as number).toString())
    localStorage.setItem("focusTime", (this.formPomarola.controls.focusTime.value as number).toString())

    if(isFocus){
      this.minutos = this.formPomarola.controls.focusTime.value as number - 1;
      document.documentElement.requestFullscreen();
      document.getElementById("Pomodoro-Main")?.classList.add("focus");
      document.getElementById("Pomodoro-Main")?.classList.remove("unfocus");
    }else{
      this.minutos = this.formPomarola.controls.unFocusTime.value as number - 1;
      document.exitFullscreen();
      document.getElementById("Pomodoro-Main")?.classList.add("unfocus");
      document.getElementById("Pomodoro-Main")?.classList.remove("focus");
    }

    this.setTimer();
    this.timerInterval = setInterval(() => {this.updateTimer()}, 1000);
  }

  private updateTimer(){
    this.segundos --;
    this.setTimer();

    console.log(this.minutos, this.segundos);

    if(this.minutos == 0 && this.segundos == 0 ){
      this.FinalizaTimer();
      return;
    }

    if(this.segundos <= 0){
      this.minutos --;
      this.segundos = 60;
    }
  }

  private setTimer(){
    let minutos= this.minutos.toString().length == 1 ? `0${this.minutos}` : this.minutos.toString();
    let segundos= this.segundos.toString().length == 1 ? `0${this.segundos}` : this.segundos.toString();

    this.timer = `${minutos}:${segundos}`;
  }

  private FinalizaTimer(){
    this.Reset();
    this.playAudio();
  }

  public Reset(){
    clearInterval(this.timerInterval);
    document.getElementById("Pomodoro-Main")?.classList.remove("unfocus");
    document.getElementById("Pomodoro-Main")?.classList.remove("focus");

    this.minutos = 0;
    this.segundos = 0;
    this.setTimer();
    document.exitFullscreen();
  }

  playAudio(){
    let audio = new Audio();
    audio.src = "../../../assets/Sounds/SeismicBomb.mp3";
    audio.load();
    audio.play();
  }
}
