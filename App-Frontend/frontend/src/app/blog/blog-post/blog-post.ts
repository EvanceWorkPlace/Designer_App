import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-blog-post',
  standalone: true,
  imports: [NgIf],
  templateUrl: './blog-post.html',
  styleUrl: './blog-post.css',
})
export class BlogPost implements OnInit{
  //postId = this.route.snapshot.paramMap.get('id');
  //Fix the code
  postId: any;
  constructor(private route: ActivatedRoute) {}
   ngOnInit() {
    this.postId = this.route.snapshot.paramMap.get('id');
  }


}
