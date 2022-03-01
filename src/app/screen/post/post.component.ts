import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ModalComponent } from 'src/app/component/modal/modal.component';
import { Post } from './post.model';
import { PostService } from './post.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.sass'],
})
export class PostComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator | any;

  displayedColumns = ['Id', 'Usuario', 'Titulo', 'Mensagem', 'Editar'];
  dataSource: any = [];
  filter = '';

  isLoading = true;

  constructor(
    private postServive: PostService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.find();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  find() {
    this.isLoading = true;

    this.postServive.findAll(this.filter).subscribe(
      (response) => {
        this.dataSource = new MatTableDataSource<Post>(response);
        this.dataSource.paginator = this.paginator;
        this.isLoading = false;
      },
      (err) => {
        this.isLoading = false;
        this._snackBar.open('Erro, tente novamente mais tarde', '', {
          duration: 2500,
          panelClass: ['red-snackbar'],
        });
      }
    );
  }

  clearFilter() {
    this.filter = '';
    this.find();
  }

  openModal(data: Post) {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '600px',
      height: '530px',
      data,
    });
  }
}
