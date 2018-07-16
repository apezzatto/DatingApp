import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { User } from '../_models/User';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PaginatedResult } from '../_models/Pagination';
import { Message } from '../_models/Message';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class UserService {
    baseUrl = environment.apiUrl;

    constructor(private authHttp: HttpClient) {}

    getUsers(pageNumber?, itemsPerPage?, userParams?: any, likesParam?: string) {
        const paginatedResult: PaginatedResult<User[]> = new PaginatedResult<User[]>();
        let params = new HttpParams();

        if (pageNumber != null && itemsPerPage != null) {
            params = params.append('pageNumber', pageNumber);
            params = params.append('pageSize', itemsPerPage);
        }

        if (likesParam === 'Likers') {
            params = params.append('Likers', 'true');
        }

        if (likesParam === 'Likees') {
            params = params.append('Likees', 'true');
        }

        if (userParams != null) {
            params = params.append('minAge', userParams.minAge);
            params = params.append('maxAge', userParams.maxAge);
            params = params.append('gender', userParams.gender);
            params = params.append('orderBy', userParams.orderBy);
        }

        return this.authHttp
            .get<User[]>(this.baseUrl + 'users', { observe: 'response', params })
            .pipe(
                map(response => {
                    paginatedResult.result = response.body;

                    if (response.headers.get('Pagination') != null) {
                        paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
                    }

                    return paginatedResult;
                })
            );
    }

    getUser(id): Observable<User> {
        return this.authHttp
            .get<User>(this.baseUrl + 'users/' + id);
    }

    updateUser(id: number, user: User) {
        return this.authHttp.put(this.baseUrl + 'users/' + id, user);
    }

    setMainPhoto(userId: number, id: number) {
        return this.authHttp.post(this.baseUrl + 'users/' + userId + '/photos/' + id + '/setMain', {});
    }

    deletePhoto(userId: number, id: number) {
        return this.authHttp.delete(this.baseUrl + 'users/' + userId + '/photos/' + id);
    }

    sendLike(id: number, recipientId: number) {
        return this.authHttp.post(this.baseUrl + 'users/' + id + '/like/' + recipientId, {});
    }

    getMessages(id: number, page?, itemsPerPage?, messageContainer?: string) {
        const paginatedResult: PaginatedResult<Message[]> = new PaginatedResult<Message[]>();
        let params = new HttpParams();

        params = params.append('MessageContainer', messageContainer);

        if (page != null && itemsPerPage != null) {
            params = params.append('pageNumber', page);
            params = params.append('pageSize', itemsPerPage);
        }

        return this.authHttp.get<Message[]>(this.baseUrl + 'users/' + id + '/messages', {observe: 'response', params})
            .pipe(
                map(response => {
                    paginatedResult.result = response.body;

                    if (response.headers.get('pagination') != null) {
                        paginatedResult.pagination = JSON.parse(response.headers.get('pagination'));
                    }

                    return paginatedResult;
                })
            );
    }

    getMessageThread(id: number, recipientId: number) {
        return this.authHttp.get<Message[]>(this.baseUrl + 'users/' + id + '/messages/thread/' + recipientId);
    }

    sendMessage(id: number, message: Message) {
        return this.authHttp.post<Message>(this.baseUrl + 'users/' + id + '/messages', message);
    }

    deleteMessage(id: number, userId: number) {
        return this.authHttp.post(this.baseUrl + 'users/' + userId + '/messages/' + id, {});
    }

    markAsRead(userId: number, messageId: number) {
        return this.authHttp.post(this.baseUrl + 'users/' + userId + '/messages/' + messageId + '/read', {}).subscribe();
    }
}
