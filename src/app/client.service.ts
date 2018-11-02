import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Client } from "./client";
import { MessageType } from "./message";
import { MessageService } from "./message.service";

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private clientsURL = 'api/clients';

  constructor(private http: HttpClient,
    private messageService: MessageService) { }

  getAll(): Observable<Client[]>{
    return this.http.get<Client[]>(this.clientsURL)
    .pipe(
      tap(clients => console.log('fetched clients')),
      catchError(this.handleError('getAll', [])));

  }

  /** GET hero by id. Will 404 if id not found */
  get(id: number): Observable<Client>{
    //const url = '${this.clientsURL}/${id}';
    //console.log(url);
    return this.http.get<Client>(this.clientsURL + '/' + id).pipe(
      tap(_ => console.log('fetched client id=${id}')),
      catchError(this.handleError<Client>('get id=${id}'))
    );
  }

  /** PUT: update the hero on the server */
  update (client: Client): Observable<any> {
    return this.http.put(this.clientsURL, client, httpOptions).pipe(
      tap(_ => this.log('updated client id=${client.id}')),
      catchError(this.handleError<any>('update'))
    );
  }

  /** POST: add a new hero to the server */
  add (client: Client): Observable<Client> {
    return this.http.post<Client>(this.clientsURL, client, httpOptions).pipe(
      tap((client: Client) => this.log('added client w/ id=${client.id}')),
      catchError(this.handleError<Client>('add'))
    );
  }

  /** DELETE: delete the hero from the server */
  delete (client: Client | number): Observable<Client> {
    const id = typeof client === 'number' ? client : client.id;
    const url = '${this.clientsURL}/${id}';

    return this.http.delete<Client>(url, httpOptions).pipe(
      tap(_ => this.log('deleted client id=${id}')),
      catchError(this.handleError<Client>('delete'))
    );
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string ) {
    this.messageService.add('${message}', MessageType.INFO);
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.messageService.add('${operation} failed: ${error.message}', MessageType.ERROR);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}

}
