import { Injectable, Component } from "@angular/core";
import { MatSnackBar } from "@angular/material";


@Injectable()
export class SnackBarService {
    constructor(public snackBar: MatSnackBar) { }
    public open(message: string, action: string = 'close') {
        this.snackBar.open(message, action, {
            duration: 3000
        });
    }
}
