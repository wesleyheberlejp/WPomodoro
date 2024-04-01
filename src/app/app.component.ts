import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TimerComponent} from "./_components/timer/timer.component";
import { TarefasDiariasComponent } from "./_components/tarefas-diarias/tarefas-diarias.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, TimerComponent, TarefasDiariasComponent]
})

export class AppComponent {
  title = 'WPomodoro';
}
