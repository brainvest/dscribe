import { Component, inject, input, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../core/auth/auth';
import { InvalidCredentialsError } from '../../core/auth/auth-api';
import { Theme } from '../../core/theme';

/**
 * Sign-in at `/login`. Sends each role to its own area, or back to the page
 * a guard bounced them from (`returnUrl`) when that page is in their area.
 */
@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  readonly returnUrl = input<string>();

  private readonly auth = inject(Auth);
  private readonly router = inject(Router);

  protected readonly form = inject(FormBuilder).nonNullable.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });
  protected readonly busy = signal(false);
  protected readonly error = signal<string | null>(null);
  protected readonly showPassword = signal(false);

  constructor() {
    inject(Theme).useArea('user');
  }

  protected submit(): void {
    if (this.form.invalid || this.busy()) {
      this.form.markAllAsTouched();
      return;
    }
    const { username, password } = this.form.getRawValue();
    this.busy.set(true);
    this.error.set(null);

    this.auth.login(username.trim(), password).subscribe({
      next: (home) => this.router.navigateByUrl(this.destination(home)),
      error: (err: unknown) => {
        this.busy.set(false);
        this.error.set(
          err instanceof InvalidCredentialsError
            ? 'That username and password do not match.'
            : 'Could not sign in right now. Please try again.',
        );
        this.form.controls.password.reset();
      },
    });
  }

  /** Honour `returnUrl` only inside the user's own area (and never off-site). */
  private destination(home: string): string {
    const target = this.returnUrl();
    return target && (target === home || target.startsWith(`${home}/`)) ? target : home;
  }
}
