import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { HttpSpaceMeService } from './http-space-me.service';

@Injectable()
export class GeneralQueryService {

  constructor( protected service: HttpSpaceMeService ) { }

generalGet(url: string, queryItems?: string[], pageItems?: string[] ): Observable<any> {

  if (queryItems) {
  }

  if (pageItems) {

  }

  return this.service.httpGet(url);
  }

}
