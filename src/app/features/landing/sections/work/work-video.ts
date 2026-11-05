import { Component, ElementRef, input, signal, viewChild } from '@angular/core';
import { motionEffect } from '../../../../core/motion/motion-effect';
import { CaseVideo } from '../../../../models/content.models';

/**
 * Video del portafolio (vertical por defecto). Se reproduce mudo solo mientras se ve, y tiene su botón de pausa
 * (WCAG 2.2.2). Con "Reducir movimiento" o ahorro de datos queda quieto hasta que se pida.
 */
@Component({
  selector: 'gloz-work-video',
  template: `
    <video
      #player
      [src]="video().src"
      [poster]="video().poster"
      [attr.aria-label]="video().label"
      muted
      [loop]="video().loop ?? true"
      playsinline
      preload="none"
      [width]="video().width ?? 540"
      [height]="video().height ?? 960"
      (play)="playing.set(true)"
      (pause)="playing.set(false)"
    ></video>
    <button type="button" class="control" (click)="toggle()" [attr.aria-label]="playing() ? 'Pausar video' : 'Reproducir video'">
      <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
        @if (playing()) {
          <path d="M7 4.5v11M13 4.5v11" />
        } @else {
          <path class="lleno" d="M7 4.2v11.6L16 10z" />
        }
      </svg>
    </button>
  `,
  styles: `
    :host {
      display: block;
      position: relative;
      width: 100%;
      height: 100%;
    }
    video {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .control {
      position: absolute;
      top: 12px;
      right: 12px;
      z-index: 3;
      display: grid;
      place-items: center;
      width: 44px;
      height: 44px;
      padding: 0;
      border: 0;
      border-radius: 50%;
      background: rgb(255 255 255 / 92%);
      color: var(--ink);
      cursor: pointer;
      box-shadow: 0 8px 18px -8px rgb(0 0 0 / 60%);
      transition: scale 0.18s var(--ease);
    }
    .control:hover {
      scale: 1.06;
    }
    .control:active {
      scale: 0.94;
    }
    svg {
      width: 18px;
      height: 18px;
      fill: none;
      stroke: currentColor;
      stroke-width: 2.4;
      stroke-linecap: round;
      stroke-linejoin: round;
    }
    .lleno {
      fill: currentColor;
      stroke-width: 1.4;
    }
  `,
})
export class WorkVideoComponent {
  readonly video = input.required<CaseVideo>();
  protected readonly playing = signal(false);
  private readonly el = viewChild.required<ElementRef<HTMLVideoElement>>('player');
  /** Si la persona lo pausó, no se vuelve a reproducir solo. */
  private userPaused = false;

  constructor() {
    motionEffect((motion) => {
      const video = this.el().nativeElement;
      const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
      if (!motion.enabled || saveData) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry?.isIntersecting && !this.userPaused) void video.play().catch(() => undefined);
          else video.pause();
        },
        { threshold: 0.35 },
      );
      observer.observe(video);
      return () => observer.disconnect();
    });
  }

  protected toggle(): void {
    const video = this.el().nativeElement;
    if (video.paused) {
      this.userPaused = false;
      void video.play().catch(() => undefined);
    } else {
      this.userPaused = true;
      video.pause();
    }
  }
}
