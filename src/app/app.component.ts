import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
})
export class AppComponent {
  public throwTestError(): void {
    throw new Error("Sentry Test Error");
  }
}
