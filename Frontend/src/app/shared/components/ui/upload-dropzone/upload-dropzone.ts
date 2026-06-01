import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  signal,
} from '@angular/core';
import { LucideCloudUpload } from '@lucide/angular';

@Component({
  selector: 'ui-upload-dropzone',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LucideCloudUpload],
  template: `
    <div
      class="flex flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed border-[--border-default] bg-[--bg-surface] p-8 text-center transition-colors"
      [class.border-[--accent-primary]]="isDragging()"
      [class.bg-[--bg-surface-raised]]="isDragging()"
      (dragover)="onDragOver($event)"
      (dragleave)="isDragging.set(false)"
      (drop)="onDrop($event)"
    >
      <svg lucideCloudUpload class="h-8 w-8 text-[--text-muted]"></svg>
      <div>
        <p class="text-sm text-[--text-primary]">
          Drop files here or
          <label class="cursor-pointer text-[--accent-primary] hover:underline">
            browse
            <input
              type="file"
              class="hidden"
              [attr.accept]="accept()"
              [multiple]="multiple()"
              (change)="onFileInput($event)"
            />
          </label>
        </p>
        <p class="mt-1 text-xs text-[--text-muted]">{{ hint() }}</p>
      </div>
    </div>
  `,
})
export class UploadDropzoneComponent {
  accept = input('.asc,.blf,.log,.txt');
  multiple = input(false);
  hint = input('Supported: .asc, .blf, .log, .txt — max 200 MB');
  filesSelected = output<File[]>();

  protected isDragging = signal(false);

  protected onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDragging.set(true);
  }

  protected onDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragging.set(false);
    const files = Array.from(event.dataTransfer?.files ?? []);
    if (files.length) this.filesSelected.emit(files);
  }

  protected onFileInput(event: Event): void {
    const files = Array.from((event.target as HTMLInputElement).files ?? []);
    if (files.length) this.filesSelected.emit(files);
  }
}
