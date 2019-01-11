import { Observable, of } from 'rxjs';


const mockPost = {
    author: {
        type: 'user',
        id: 'id',
        avatar: 'avatar',
        name: 'name'
    },
    body: 'boby',
    id: 'id',
    title: 'title',
    image: 'img'
};

export class MockPostsService {

    createNewPost(): Observable<any> {
        return of(mockPost);
    }
    editPost(id: string, body): Observable<any> {
        return of(mockPost);
    }
    getPostById(id: string, body): Observable<any> {
        return of(mockPost);
    }
    addImg() {
        return of({});
    }

}

