import { Component, Inject, OnInit } from '@angular/core';
import { Post } from 'src/app/screen/post/post.model';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { PostService } from 'src/app/screen/post/post.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.sass'],
})
export class ModalComponent {
  formModal: FormGroup = new FormGroup({});

  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: Post,
    private postService: PostService,
    private _snackBar: MatSnackBar
  ) {
    this.formModal = this.formBuilder.group({
      id: [data.id],
      userId: [data.userId],
      title: [data.title],
      body: [data.body],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
    this.formModal.reset();
  }

  onSubmit() {
    this.postService.update(this.formModal.value).subscribe((response) => {
      this.openSnackBar('Atualizado com sucesso!', 'Fechar');
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 2000, panelClass: ['success-snackbar'] });
  }
}
