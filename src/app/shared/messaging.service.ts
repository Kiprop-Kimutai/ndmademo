import {Injectable} from '@angular/core';
import {of, Observable} from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class MessagingService {
    confirm(message: string): Observable<any> {
        const confirmation = window.confirm(message || 'Are you sure?');
        return of(confirmation);
    }
    alert(message: string) {
        window.alert(message || 'Alert!');
    }

}
